import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { configureComponentTest } from '../../component-test-setup';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    configureComponentTest(ListComponent)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.type = 'blocks';
    component.list = [];
    component.loading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the empty state inside the table', () => {
    const emptyCell = fixture.nativeElement.querySelector('tbody td');

    expect(emptyCell).toBeTruthy();
    expect(emptyCell.getAttribute('colspan')).toBe('5');
  });
});
