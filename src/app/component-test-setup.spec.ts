import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CoinPipe } from './pipes/coin.pipe';
import { NameFormatPipe } from './pipes/name-format.pipe';

export function configureComponentTest(component: Type<unknown>) {
  return TestBed.configureTestingModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      TranslateModule.forRoot()
    ],
    declarations: [component, CoinPipe, NameFormatPipe],
    schemas: [NO_ERRORS_SCHEMA]
  });
}
