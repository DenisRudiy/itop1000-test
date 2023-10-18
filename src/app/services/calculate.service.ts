import { Injectable } from '@angular/core';
import { CurConverter } from '../interfaces/cur-converter';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  constructor() {}

  getDataToCalculate(
    pos: String,
    currentConverter: CurConverter,
    inputValueTop: any,
    inputValueLow: any
  ) {
    let valT = inputValueTop;
    let valL = inputValueLow;
    if (pos === 'T') {
      valT = this.calcTop(currentConverter, inputValueTop, inputValueLow);
    } else {
      valL = this.calcLow(currentConverter, inputValueTop, inputValueLow);
    }
    return { valT, valL };
  }

  calcTop(
    currentConverter: CurConverter,
    inputValueTop: any,
    inputValueLow: any
  ) {
    const digT = inputValueLow.toString().indexOf('.');
    const digC = currentConverter.t.toString().indexOf('.');
    let dig = inputValueLow / 10 ** (digT - digC);
    dig = Math.round(dig * Math.pow(10, 10)) / Math.pow(10, 10);

    if (inputValueLow == currentConverter.t) {
      inputValueTop = 1;
    } else if (dig == currentConverter.l) {
      inputValueTop = 10 ** (digT - digC);
    } else {
      inputValueTop = this.calcVal(
        inputValueTop,
        inputValueLow,
        currentConverter.l
      );
    }
    return inputValueTop;
  }

  calcLow(
    currentConverter: CurConverter,
    inputValueTop: any,
    inputValueLow: any
  ) {
    const digL = inputValueTop.toString().indexOf('.');
    const digC = currentConverter.l.toString().indexOf('.');
    let dig = inputValueTop / 10 ** (digL - digC);
    dig = Math.round(dig * Math.pow(10, 10)) / Math.pow(10, 10);

    if (inputValueTop == currentConverter.l) {
      inputValueLow = 1;
    } else if (dig == currentConverter.l) {
      inputValueLow = 10 ** (digL - digC);
    } else {
      inputValueLow = this.calcVal(
        inputValueLow,
        inputValueTop,
        currentConverter.t
      );
    }
    return inputValueLow;
  }

  inputChange(
    event: any,
    pos: String,
    currentConverter: CurConverter,
    inputValueTop: any,
    inputValueLow: any
  ) {
    if (pos === 'T') {
      inputValueTop = event ? event : null;
      inputValueLow = this.calcVal(
        inputValueLow,
        inputValueTop,
        currentConverter.t
      );
    } else {
      inputValueLow = event ? event : null;
      inputValueTop = this.calcVal(
        inputValueTop,
        inputValueLow,
        currentConverter.l
      );
    }

    return { inputValueTop, inputValueLow };
  }

  swapCurrencies(
    currentConverter: CurConverter,
    inputValueTop: number,
    inputValueLow: number
  ) {
    inputValueLow = this.calcVal(
      inputValueLow,
      inputValueTop,
      currentConverter.t
    );
    return inputValueLow;
  }

  calcVal(inputChange: any, inputHelp: number, currentConverter: any) {
    inputChange = inputHelp ? (inputHelp * currentConverter).toFixed(10) : null;
    if (inputChange) {
      inputChange =
        Math.round(inputChange * Math.pow(10, 10)) / Math.pow(10, 10);
    }

    return inputChange;
  }
}
