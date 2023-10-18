import { Injectable } from '@angular/core';
import { Currency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  currencies = [];
  curTop!: Currency;
  curLow!: Currency;
  currentConverter = { t: 36.6928439724, l: 0.0272532704 };

  constructor() {}

  getCurrencies(curr: any) {
    this.currencies = curr;
    this.curTop = this.currencies[0];
    this.curLow = this.currencies[2];
  }

  updateConverter(curTop: any, curLow: any) {
    this.curTop = curTop;
    this.curLow = curLow;
    if (this.curTop.name === 'USD') {
      this.updateConverterForUSD();
      return this.currentConverter;
    } else if (this.curTop.name === 'EUR') {
      this.updateConverterForEUR();
      return this.currentConverter;
    } else {
      this.updateConverterForUAH();
      return this.currentConverter;
    }
  }

  updateConverterForUSD() {
    if (this.curLow.name === 'UAH') {
      this.currentConverter.t = this.curLow.toUSD!;
      this.currentConverter.l = this.curTop.toUAH!;
    } else {
      this.currentConverter.t = this.curLow.toUSD!;
      this.currentConverter.l = this.curTop.toEUR!;
    }
  }

  updateConverterForEUR() {
    if (this.curLow.name === 'USD') {
      this.currentConverter.t = this.curLow.toEUR!;
      this.currentConverter.l = this.curTop.toUSD!;
    } else {
      this.currentConverter.t = this.curLow.toEUR!;
      this.currentConverter.l = this.curTop.toUAH!;
    }
  }

  updateConverterForUAH() {
    if (this.curLow.name === 'EUR') {
      this.currentConverter.t = this.curLow.toUAH!;
      this.currentConverter.l = this.curTop.toEUR!;
    } else {
      this.currentConverter.t = this.curLow.toUAH!;
      this.currentConverter.l = this.curTop.toUSD!;
    }
  }
}
