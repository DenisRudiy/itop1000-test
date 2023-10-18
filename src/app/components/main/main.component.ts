import { Component, HostListener, OnInit } from '@angular/core';
import { CalculateService } from 'src/app/services/calculate.service';
import { ConverterService } from 'src/app/services/converter.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  currencies = [
    {
      name: 'USD',
      f_name: 'USD - Dollars',
      img: 'https://i.postimg.cc/GpQQS92r/icons8-dollar-100.png',
      toUAH: 0,
      toEUR: 0,
    },
    {
      name: 'EUR',
      f_name: 'EUR - Euros',
      img: 'https://i.postimg.cc/tTvzpfWM/icons8-euro-60.png',
      toUAH: 0,
      toUSD: 0,
    },
    {
      name: 'UAH',
      f_name: 'UAH - Hryvnia',
      img: 'https://i.postimg.cc/Ssxr0q29/icons8-hryvnia-64.png',
      toUSD: 0,
      toEUR: 0,
    },
  ];

  curTop = this.currencies[0];
  curLow = this.currencies[2];
  currentConverter = { t: 0, l: 0 };
  showT = false;
  showL = false;
  inputValueTop!: any;
  inputValueLow!: any;

  constructor(
    private service: GetDataService,
    private dropdownService: DropdownService,
    private converterService: ConverterService,
    private calculateService: CalculateService
  ) {}

  ngOnInit(): void {
    this.service.getDataToUSD().subscribe((data) => {
      this.currencies[1].toUSD = data.data.EUR.value;
      this.currencies[2].toUSD = data.data.UAH.value;
      this.currentConverter.t = data.data.UAH.value;
    });
    this.service.getDataToEUR().subscribe((data) => {
      this.currencies[0].toEUR = data.data.USD.value;
      this.currencies[2].toEUR = data.data.UAH.value;
    });
    this.service.getDataToUAH().subscribe((data) => {
      this.currencies[0].toUAH = data.data.USD.value;
      this.currencies[1].toUAH = data.data.EUR.value;
      this.currentConverter.l = data.data.USD.value;
    });
    this.converterService.getCurrencies(this.currencies);
    console.log(this.currencies);
    window.setTimeout(
      () =>
        this.service.deliverData([
          this.currencies[2].toUSD,
          this.currencies[2].toEUR,
        ]),
      100
    );
  }

  showTop() {
    this.showT = this.dropdownService.showTop();
  }

  showLow() {
    this.showL = this.dropdownService.showLow();
  }

  changeCurrency(id: number, pos: String) {
    const selectedCurrency = this.currencies[id];
    if (this.curTop !== selectedCurrency && this.curLow !== selectedCurrency) {
      if (pos === 'T') {
        this.curTop = selectedCurrency;
      } else {
        this.curLow = selectedCurrency;
      }
      this.currentConverter = this.converterService.updateConverter(
        this.curTop,
        this.curLow
      );
    }

    const { valT, valL } = this.calculateService.getDataToCalculate(
      pos,
      this.currentConverter,
      this.inputValueTop,
      this.inputValueLow
    );
    this.inputValueTop = valT;
    this.inputValueLow = valL;
  }

  switchCurrencies() {
    let f = this.curTop;
    this.curTop = this.curLow;
    this.curLow = f;

    let valueSwitch = this.currentConverter.t;
    this.currentConverter.t = this.currentConverter.l;
    this.currentConverter.l = valueSwitch;

    this.inputValueLow = this.calculateService.swapCurrencies(
      this.currentConverter,
      this.inputValueTop,
      this.inputValueLow
    );
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const btnT = document!.getElementById('btnTop');
    const btnL = document!.getElementById('btnLow');
    if (event.target !== btnT && event.target !== btnL) {
      this.dropdownService.closeAllDropdowns();
      this.showT = false;
      this.showL = false;
    }
  }

  onInputChange(event: any, pos: String) {
    const { inputValueTop, inputValueLow } = this.calculateService.inputChange(
      event,
      pos,
      this.currentConverter,
      this.inputValueTop,
      this.inputValueLow
    );

    this.inputValueTop = inputValueTop;
    this.inputValueLow = inputValueLow;
  }
}
