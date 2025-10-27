import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { projectReducer } from '@Store/reducers/app-reducer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { themeReducer } from "@Store/reducers/theme-reducer";
import Component from "@Resource/layout/component";
import {NgOptimizedImage} from "@angular/common";
import {orderReducer} from "@Store/reducers/order-reducer";
import {deliveryLocationReducer} from "@Store/reducers/delivery-reducer";

export const routes: Routes = [
  { path: '', component: Component, children: [
      { path: 'order',
        loadComponent: () => import('@Resource/core/order-component'),
      },
      { path: 'order/:id',
          loadComponent: () => import('@Resource/core/order-details/order-details.component'),
      },
      { path: 'about',
        loadComponent: () => import('@Global/foundation/component'),
      },
      { path: 'settings',
          loadComponent: () => import('@Settings/local/component'),
      },
      {path: '', redirectTo: 'main', pathMatch: 'full'},
    ]
  },
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: '**', redirectTo: 'main'},
];

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, { useHash: true }),
        StoreModule.forRoot({ projects: projectReducer, theme: themeReducer,
            orders: orderReducer, location: deliveryLocationReducer }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        NgOptimizedImage], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
