import { expect, describe, it, beforeEach } from '@jest/globals';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import ShoppingCartComponent from "@Resource/core/shopping-cart/shopping-cart.component";
import {RouterTestingModule} from "@angular/router/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot({})
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
