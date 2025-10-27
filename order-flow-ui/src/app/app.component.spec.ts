import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import {AppComponent} from "./app.component";
import {StoreModule} from "@ngrx/store";
import {OrderService} from "@Resource/order/order.service";
import {DeliveryService} from "@Resource/order/delivery.service";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    let orderServiceMock: jest.Mocked<Partial<OrderService>> ={
        connectWebSocket: jest.fn()
    };
    let deliveryServiceMock: jest.Mocked<Partial<DeliveryService>> ={
        connectWebSocket: jest.fn()
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot()],
            declarations: [AppComponent],
            providers: [
                {provide: OrderService, useValue: orderServiceMock},
                {provide: DeliveryService, useValue: deliveryServiceMock}
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
