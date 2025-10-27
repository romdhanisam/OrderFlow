import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {Store} from "@ngrx/store";
import {Delivery, IDeliveryLocation} from "@Store/reducers/delivery-reducer";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DatePipe, JsonPipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";

import {
  LEAFLET_MARKER_ICON_RETINA_URL,
  LEAFLET_MARKER_ICON_URL,
  LEAFLET_MARKER_SHADOW_URL
} from '../leaflet-icons';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterModule, MatCardModule, JsonPipe,
    MatIconModule, MatListModule, MatInputModule, DatePipe],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [DatePipe]
})
export default class OrderDetailsComponent implements OnInit {

  orderId: string;
  deliveryLocation: IDeliveryLocation;
  private mapContainerEl?: HTMLDivElement;
  private leaflet: typeof import('leaflet') | null = null;
  private mapInstance: import('leaflet').Map | null = null;
  private markerLayer: import('leaflet').LayerGroup | null = null;
  private defaultIcon: import('leaflet').Icon | null = null;
  private readonly datePipe = inject(DatePipe);
  private readonly defaultCenter: [number, number] = [46.603354, 1.888334];
  private readonly defaultZoom = 1;
  protected readonly mapMarkers = signal<IDeliveryLocation>(null);
  private destroyRef = inject(DestroyRef);

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store<Delivery>) {
  }

   ngOnInit() {
     this.route.params.subscribe(params => {
       this.orderId = params['id'];
     });
    this.store.select("location").pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(value => {
          this.deliveryLocation = value;
          this.updateMapMarkers(value);
        });
  }


  private updateMapMarkers(marker: IDeliveryLocation): void {
    if (!this.mapInstance || !this.markerLayer || !this.leaflet) {
      return;
    }

    const L = this.leaflet;
    const layerGroup = this.markerLayer;
    const icon = this.defaultIcon ?? undefined;
    layerGroup.clearLayers();

    if (!marker) {
      this.mapInstance.setView(this.defaultCenter, this.defaultZoom);
      this.mapInstance.invalidateSize();
      return;
    }
    const bounds = L.latLngBounds([]);
    const latLng = L.latLng(Number(marker.latitude), Number(marker.longitude));
    const popupContent = this.buildPopup(marker);
    L.marker(latLng, { icon }).bindPopup(popupContent).addTo(layerGroup);
    bounds.extend(latLng);

    this.mapInstance.fitBounds(bounds, { padding: [24, 24], maxZoom: 16 });
    this.mapInstance.invalidateSize();
  }

  private buildPopup(marker: IDeliveryLocation): string {
    const updatedAt = this.datePipe.transform(Date.now(), 'medium') ?? 'N/A';
    const plannedAt =  this.datePipe.transform(Date.now() + (30 * 60 * 1000), 'medium') ;
    const plannedLine = plannedAt ? `<br>Planned : ${plannedAt}` : '';
    return `<strong>${marker.status}</strong><br>Last update : ${updatedAt}${plannedLine}`;
  }

  @ViewChild('mapContainer', {static: false})
  set mapContainer(ref: ElementRef<HTMLDivElement> | undefined) {
    if (ref) {
      this.mapContainerEl = ref.nativeElement;
      this.ensureMapInitialized();
    }
  }

  private async ensureMapInitialized(): Promise<void> {
    const L = await this.loadLeaflet();
    const iconRetinaUrl = LEAFLET_MARKER_ICON_RETINA_URL;
    const iconUrl = LEAFLET_MARKER_ICON_URL;
    const shadowUrl = LEAFLET_MARKER_SHADOW_URL;
    this.defaultIcon = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    this.mapInstance = L.map(this.mapContainerEl, {
      center: this.defaultCenter,
      zoom: this.defaultZoom,
      zoomControl: true,
      attributionControl: false
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 40,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapInstance);
    this.markerLayer = L.layerGroup().addTo(this.mapInstance);
    this.updateMapMarkers(this.mapMarkers());
    setTimeout(() => this.mapInstance?.invalidateSize(), 0);
  }

  private async loadLeaflet(): Promise<typeof import('leaflet')> {
    if (this.leaflet) {
      return this.leaflet;
    }
    const module = await import('leaflet');
    this.leaflet = module.default ?? module;
    return this.leaflet;
  }

}
