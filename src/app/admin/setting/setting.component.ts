import { Component, OnInit } from '@angular/core';
import { CategoryDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  saving: boolean;
  categoryDto: CategoryDto = new CategoryDto();
  constructor() { }

  ngOnInit(): void {

  }

}
