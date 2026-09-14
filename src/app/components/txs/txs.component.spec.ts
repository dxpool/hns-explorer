import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { configureComponentTest } from '../../component-test-setup';
import { TxsComponent } from './txs.component';

describe('TxsComponent', () => {
  let component: TxsComponent;
  let fixture: ComponentFixture<TxsComponent>;

  beforeEach(async(() => {
    configureComponentTest(TxsComponent)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxsComponent);
    component = fixture.componentInstance;
    component.list = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
