import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { DeliveryService } from './delivery.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {StoreModule} from "@ngrx/store";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({})],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(DeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
