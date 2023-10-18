import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  data = [];
  constructor(private service: GetDataService) {}

  ngOnInit(): void {
    window.setTimeout(() => this.getData(), 200);
  }

  getData() {
    this.data = this.service.deliverToHeader();
  }
}
