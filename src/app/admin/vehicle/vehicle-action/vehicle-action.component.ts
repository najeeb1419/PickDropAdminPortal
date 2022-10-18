import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy, SelectItemDto, VehicleDetailDto, VehicleDetailServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vehicle-action',
  templateUrl: './vehicle-action.component.html',
  styleUrls: ['./vehicle-action.component.css']
})
export class VehicleActionComponent extends AppComponentBase  implements OnInit {
 
 categoryList:SelectItemDto[]=[];
 subCategoryList:SelectItemDto[]=[];
 vehivleDetailDto:VehicleDetailDto= new VehicleDetailDto();
  constructor(injector: Injector , private _categoryervice:CategoryServiceProxy ,
    private _vehicleDetailService:VehicleDetailServiceProxy,
    public bsModalRef: BsModalRef) { 
      super(injector)
    }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory()
  {
    this._categoryervice.getCategoryList().subscribe(res=>{
      this.categoryList=res;
    })
  }

  onSelectCategory(categoryId:number)
  {
    this._categoryervice.getSubCategoryList(categoryId).subscribe(res=>{
      this.subCategoryList=res;
    })
  }


  save()
  {
    this._vehicleDetailService.addVehicleDetail(this.vehivleDetailDto).subscribe(res=>{
      this.notify.success("Successfully saved.")
    })
  }

}
