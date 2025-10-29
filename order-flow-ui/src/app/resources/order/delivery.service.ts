import { Injectable } from '@angular/core';
import { IMessage } from '@stomp/stompjs';
import {Store} from "@ngrx/store";
import {Delivery, IDeliveryLocation, UpdateDeliveryLocation} from "@Store/reducers/delivery-reducer";
import {WebSocketService} from "@Resource/order/web-socket.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiDeliveryTopic = '/topic/delivery';
  constructor(private readonly store: Store<Delivery>,
              private readonly webSocketService: WebSocketService) {
  }

  // Connect to Consumer through WebSocket to get Delivery locations
  connectWebSocket() {
    let stompClient = this.webSocketService.connect(environment.source.delivery_host);
    stompClient.onConnect = () => {
      stompClient.subscribe(this.apiDeliveryTopic, (message: IMessage) => {
        const newLocation: IDeliveryLocation = JSON.parse(message.body);
        this.store.dispatch(new UpdateDeliveryLocation(newLocation));
      });
    };
    stompClient.activate();
  }
}
