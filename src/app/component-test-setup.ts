import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CoinPipe } from './pipes/coin.pipe';
import { NameFormatPipe } from './pipes/name-format.pipe';

export function configureComponentTest(
  component: Type<unknown>,
  imports: Array<Type<unknown>> = []
) {
  return TestBed.configureTestingModule({
    imports: [
      CommonModule,
      HttpClientTestingModule,
      RouterTestingModule,
      TranslateModule.forRoot(),
      ...imports
    ],
    declarations: [component, CoinPipe, NameFormatPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });
}
