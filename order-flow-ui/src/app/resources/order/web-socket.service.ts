import {Injectable} from '@angular/core';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
  public connect(host: string) {
    const socket = new SockJS(host);
    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => environment.env === "DEV" ? console.log(str) : '',
      reconnectDelay: 5000,
    });
    return this.stompClient;
  }
}
