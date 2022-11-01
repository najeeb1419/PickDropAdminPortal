import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SettingComponent } from './setting/setting.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './setting/category/category.component';
import { SubCategoryComponent } from './setting/sub-category/sub-category.component';
import { CategoryActionComponent } from './setting/category/category-action/category-action.component';
import { SubCategoryActionComponent } from './setting/sub-category/sub-category-action/sub-category-action.component';
import { VehicleActionComponent } from './vehicle/vehicle-action/vehicle-action.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { PickVehicleComponent } from './pick-vehicle/pick-vehicle.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'

@NgModule({
  declarations: [
    SettingComponent,
    CategoryComponent,
    SubCategoryComponent,
    CategoryActionComponent,
    SubCategoryActionComponent,
    VehicleActionComponent,
    VehicleComponent,
    PickVehicleComponent,
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAwwjfOHy8ABJRzZROcYGVK7k2nKTO2d-E'
  }),
  AgmDirectionModule
  ]
})
export class AdminModule { }
