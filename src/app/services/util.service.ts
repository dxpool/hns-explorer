import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  colors = ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'];
  span = [0, 0, 0, 0, 0];
  constructor() { }

  private colorRgb(sColor: string) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i++) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2), 16));
      }
      return sColorChange;
    } else {
      return sColor;
    }
  }

  private gradientColor(startColor: string, endColor: string, step: number) {
    const startRGB = this.colorRgb(startColor); // 转换为rgb数组模式
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];

    const endRGB = this.colorRgb(endColor);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];

    const sR = (endR - startR) / step; // 总差值
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;

    const colorArr = [];
    for (let i = 0; i < step; i++) {
      colorArr.push(`rgb(${(sR * i + startR).toFixed(0)},${(sG * i + startG).toFixed(0)},${(sB * i + startB).toFixed(0)})`);
    }
    return colorArr;
  }

  getColor(num: number) {
    this.span = [0, 0, 0, 0, 0];
    if (num <= this.colors.length) {
      return this.colors.slice(0, num);
    }
    let result = [];
    const more = num - this.colors.length;
    let j = this.span.length - 1;
    for (let i = 0; i < more; i++) {
      this.span[j] = this.span[j] + 1;
      j = j < this.span.length - 1 ? (j - 1) : (this.span.length - 1);
    }
    for (let i = 0; i < this.span.length; i++) {
      const color = this.gradientColor(this.colors[i], this.colors[i + 1], this.span[i] + 1);
      result = result.concat(color);
    }
    result.push(this.colors[this.colors.length - 1]);
    return result;
  }
}