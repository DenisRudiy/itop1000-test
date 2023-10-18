import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor() {}
  showT = false;
  showL = false;

  showTop() {
    this.showT = !this.showT;
    const btn = document.getElementById('btnTop');
    if (btn) {
      btn.style.borderRadius = this.showT ? '15px 15px 15px 0px' : '15px';
    }
    return this.showT;
  }

  showLow() {
    this.showL = !this.showL;
    const btn = document.getElementById('btnLow');
    if (btn) {
      btn.style.borderRadius = this.showL ? '15px 15px 15px 0px' : '15px';
    }
    return this.showL;
  }

  closeAllDropdowns() {
    if (this.showT) {
      this.showT = false;

      const btn = document.getElementById('btnTop');
      if (btn) {
        btn.style.borderRadius = '15px';
      }
    }
    if (this.showL) {
      this.showL = false;

      const btn = document.getElementById('btnLow');
      if (btn) {
        btn.style.borderRadius = '15px';
      }
    }
  }
}
