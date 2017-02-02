/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FbfeedComponent } from './fbfeed.component';

describe('FbfeedComponent', () => {
  let component: FbfeedComponent;
  let fixture: ComponentFixture<FbfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
