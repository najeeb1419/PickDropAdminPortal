import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryDto } from '@shared/service-proxies/service-proxies';
import {MatAccordion} from '@angular/material/expansion';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  categoryDto: CategoryDto = new CategoryDto();
  constructor() { }

  ngOnInit(): void {

  }

}
