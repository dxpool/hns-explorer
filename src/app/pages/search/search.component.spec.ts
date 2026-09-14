import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { configureComponentTest } from '../../component-test-setup.spec';
import { ApiService } from '../../services/api.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let api: ApiService;
  let router: Router;

  beforeEach(async(() => {
    configureComponentTest(SearchComponent)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    api = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate directly for a single search result', async () => {
    spyOn(api, 'search').and.returnValue(Promise.resolve([{
      type: 'Name',
      url: '/name/example'
    }]));
    const navigate = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

    await component.checkQuery('example');

    expect(navigate).toHaveBeenCalledWith('/name/example');
    expect(component.url).toEqual([]);
  });
});
