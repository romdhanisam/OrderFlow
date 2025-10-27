import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import LocalSettingsComponent from "./component";
import {StoreModule} from "@ngrx/store";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('LocalSettingsComponent', () => {
  let component: LocalSettingsComponent;
  let fixture: ComponentFixture<LocalSettingsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, StoreModule.forRoot({})]
    }).compileComponents();
    fixture = TestBed.createComponent(LocalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
