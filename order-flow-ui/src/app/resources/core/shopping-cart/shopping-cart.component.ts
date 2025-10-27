import {Component, DestroyRef, ElementRef, HostListener, inject, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatTooltipModule} from "@angular/material/tooltip";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatBadgeModule} from "@angular/material/badge";
import {Store} from "@ngrx/store";
import {IOrder, OrderState} from "@Store/reducers/order-reducer";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatListModule} from "@angular/material/list";
import {Router, RouterModule} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  imports: [CommonModule, MatButtonModule, ScrollingModule, MatIconModule, MatTooltipModule, OverlayModule, MatListModule, MatBadgeModule, MatListModule, MatDividerModule, RouterModule],
  styleUrls: ['./shopping-cart.component.scss']
})
export default class ShoppingCartComponent implements OnInit {

  isOpen_: boolean = false;
  orders: IOrder[] = [];
  private destroyRef = inject(DestroyRef);
  constructor(private readonly store: Store<OrderState>,
              private readonly element_: ElementRef,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.store.select("orders").pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(value => this.orders = value);
  }

  open_(): void {
    this.isOpen_ = true;
  }

  close_(): void {
    this.isOpen_ = false;
  }

  isOpen(): boolean {
    return this.isOpen_;
  }

  toggle(): void {
    this.isOpen() ? this.close_() : this.open_();
  }

  @HostListener('document:click', ['$event'])
  private onOutsideClick_(event: Event): void {
    if (!this.element_.nativeElement.contains(event.target) && this.isOpen()) {
      this.close_();
    }
  }

  details(order: IOrder) {
    this.router.navigate(['/order', order.orderId]);
  }
}
