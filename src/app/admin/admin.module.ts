import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SettingComponent } from './setting/setting.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './setting/category/category.component';
import { SubCategoryComponent } from './setting/sub-category/sub-category.component';
import { CategoryActionComponent } from './setting/category/category-action/category-action.component';
import { SubCategoryActionComponent } from './setting/sub-category/sub-category-action/sub-category-action.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleDetailActionComponent } from './vehicle-detail/vehicle-detail-action/vehicle-detail-action.component';
@NgModule({
  declarations: [
    SettingComponent,
    CategoryComponent,
    SubCategoryComponent,
    CategoryActionComponent,
    SubCategoryActionComponent,
    VehicleDetailComponent,
    VehicleDetailActionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
