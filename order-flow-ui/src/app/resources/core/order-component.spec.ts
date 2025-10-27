import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import OrderComponent from "@Resource/core/order-component";
import {OrderService} from "@Resource/order/order.service";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderServiceMock: jest.Mocked<Partial<OrderService>> ={
    connectWebSocket: jest.fn()
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        {provide: FormBuilder},
        {provide: OrderService, useValue: orderServiceMock}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
