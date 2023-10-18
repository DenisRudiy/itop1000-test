import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  data: any = [];
  private apiUrlUSD =
    'https://api.currencyapi.com/v3/latest?apikey=cur_live_C4gWcQ9Nrei23cNb3pByQTf6ThK970lGRVmn6Las&currencies=EUR%2CUAH';
  private apiUrlEUR =
    'https://api.currencyapi.com/v3/latest?apikey=cur_live_C4gWcQ9Nrei23cNb3pByQTf6ThK970lGRVmn6Las&currencies=UAH%2CUSD&base_currency=EUR';
  private apiUrlUAH =
    'https://api.currencyapi.com/v3/latest?apikey=cur_live_C4gWcQ9Nrei23cNb3pByQTf6ThK970lGRVmn6Las&currencies=EUR%2CUSD&base_currency=UAH';
  constructor(private http: HttpClient) {}
  getDataToUSD(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUSD}`);
  }
  getDataToEUR(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlEUR}`);
  }
  getDataToUAH(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUAH}`);
  }
  deliverData(data: any) {
    this.data = data;
  }
  deliverToHeader() {
    return this.data;
  }
}
