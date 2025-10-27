import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { IMessage } from '@stomp/stompjs';
import {Store} from "@ngrx/store";
import {IOrder, OrderState, UpdateOrder} from "@Store/reducers/order-reducer";
import {WebSocketService} from "@Resource/order/web-socket.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiOrderUrl = 'api/orders';
  private apiOrderTopic = '/topic/orders';
  private ordersSubject = new BehaviorSubject<IOrder[]>([]);

  constructor(private readonly http: HttpClient,
              private readonly store: Store<OrderState>,
              private readonly webSocketService: WebSocketService) {}

  // Send to Producer
  sendOrder(order: any) {
    return this.http.post(this.apiOrderUrl, order);
  }
  // Connect to Consumer through WebSocket to get Orders
  connectWebSocket() {
    let stompClient = this.webSocketService.connect("http://localhost:9001/ws-orders");
    stompClient.onConnect = () => {
      stompClient.subscribe(this.apiOrderTopic, (message: IMessage) => {
        const current = this.ordersSubject.value;
        const newOrder: IOrder = JSON.parse(message.body);
        this.ordersSubject.next([...current, newOrder]);
        this.store.dispatch(new UpdateOrder([...current, newOrder]))
      });
    };
    stompClient.activate();
  }
}
