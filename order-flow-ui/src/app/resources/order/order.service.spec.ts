import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { OrderService } from './order.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({})],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
