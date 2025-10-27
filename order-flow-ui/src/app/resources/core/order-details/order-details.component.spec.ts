import { expect, describe, it, beforeEach } from '@jest/globals';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import OrderDetailsComponent from "@Resource/core/order-details/order-details.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";

xdescribe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({})
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
