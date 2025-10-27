import {Component, DestroyRef, ElementRef, inject, OnInit} from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";
import {Store} from "@ngrx/store";
import {AppTheme} from "@Store/reducers/theme-reducer";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {OrderService} from "@Resource/order/order.service";
import {DeliveryService} from "@Resource/order/delivery.service";

@Component({
  selector: 'template-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor(
    private readonly _overlayContainer: OverlayContainer,
    private readonly otRootRef: ElementRef,
    private readonly store: Store<AppTheme>,
    private readonly orderService: OrderService,
    private readonly deliveryService: DeliveryService
  ) {
  }

  ngOnInit(): void {
      this.store.select("theme").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(newThemeValue => {
          newThemeValue.isDark ? this.applyOverlayContainerTheme('order-flow-light-theme', newThemeValue.name) :
              this.applyOverlayContainerTheme('order-flow-dark-theme', newThemeValue.name);
      });
    this.orderService.connectWebSocket();
    this.deliveryService.connectWebSocket();
  }

  private applyOverlayContainerTheme(oldTheme: string, newTheme: string): void {
    if (!!oldTheme && oldTheme !== newTheme) {
      this._overlayContainer.getContainerElement().classList.remove(oldTheme);
      this.otRootRef.nativeElement.classList.remove(oldTheme);
    }
    this._overlayContainer.getContainerElement().classList.add(newTheme);
    this.otRootRef.nativeElement.classList.add(newTheme);
  }


}
