import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {OrderService} from "@Resource/order/order.service";
import {IOrder} from "@Store/reducers/order-reducer";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './order-template.html'
})
export default class OrderComponent {

  private readonly fb = inject(FormBuilder);
  constructor(private readonly orderService: OrderService) {}

  protected readonly orderAssignmentForm = this.fb.group({
    orderId: ['', [Validators.required]],
    orderName: ['', [ Validators.required]],
    orderQuantity: [1, [ Validators.required]],
    orderStatus: ['NEW', [ Validators.required]]
  });

  sendOrder() {
    let order: IOrder = { orderId: this.orderAssignmentForm.get('orderId').value,
      product: this.orderAssignmentForm.get('orderName').value,
      quantity: this.orderAssignmentForm.get('orderQuantity').value,
      status: this.orderAssignmentForm.get('orderStatus').value };
    this.orderService.sendOrder(order).subscribe();
  }

}
