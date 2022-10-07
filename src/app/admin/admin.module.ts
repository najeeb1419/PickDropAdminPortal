import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SettingComponent } from './setting/setting.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './setting/category/category.component';
import { SubCategoryComponent } from './setting/sub-category/sub-category.component';
import { CategoryActionComponent } from './setting/category/category-action/category-action.component';
@NgModule({
  declarations: [
    SettingComponent,
    CategoryComponent,
    SubCategoryComponent,
    CategoryActionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
