import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { configureComponentTest } from '../../component-test-setup';
import { NamesComponent } from './names.component';

describe('NamesComponent', () => {
  let component: NamesComponent;
  let fixture: ComponentFixture<NamesComponent>;

  beforeEach(async(() => {
    configureComponentTest(NamesComponent)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
