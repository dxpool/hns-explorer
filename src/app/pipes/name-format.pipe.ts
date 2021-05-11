import { Pipe, PipeTransform } from '@angular/core';
import { toUnicode } from 'punycode';

@Pipe({
  name: 'nameFormat'
})
export class NameFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.indexOf('xn--') === 0 ? toUnicode(value) : value;
  }

}
