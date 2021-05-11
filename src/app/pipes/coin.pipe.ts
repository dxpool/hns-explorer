import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coin'
})

export class CoinPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value / Math.pow(10, 6);
  }

}
