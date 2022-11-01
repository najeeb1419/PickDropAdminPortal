import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { EventService } from '@shared/DataServices/event.service';
import { CategoryDto, CategoryServiceProxy, SelectItemDto, VehicleDetailDto, VehicleDetailServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vehicle-action',
  templateUrl: './vehicle-action.component.html',
  styleUrls: ['./vehicle-action.component.css']
})
export class VehicleActionComponent extends AppComponentBase implements OnInit {

  categoryList: SelectItemDto[] = [];
  subCategoryList: SelectItemDto[] = [];
  vehivleDetailDto: VehicleDetailDto = new VehicleDetailDto();
  saving: boolean;
  id: number;
  constructor(injector: Injector, private _categoryervice: CategoryServiceProxy,
    private _vehicleDetailService: VehicleDetailServiceProxy,
    private _eventService: EventService,

    public bsModalRef: BsModalRef) {
    super(injector)
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.getVehicleDetail();
    }
    this.getCategory();
  }

  getCategory() {
    this._categoryervice.getCategoryList().subscribe(res => {
      this.categoryList = res;
    })
  }

  onSelectCategory(categoryId: number) {
    this._categoryervice.getSubCategoryList(categoryId).subscribe(res => {
      this.subCategoryList = res;
    })
  }




  save() {
    this.saving = true;

    // save file

    if (this.id) {
      this._vehicleDetailService.addVehicleDetail(this.vehivleDetailDto).subscribe(
        () => {
          this.notify.info(this.l('Updated Successfully'));
          this.bsModalRef.hide();
          this._eventService.emitChildEvent(true)
        },
        () => {
          this.saving = false;
        });
    } else {
      this._vehicleDetailService.addVehicleDetail(this.vehivleDetailDto).subscribe(
        () => {
          this.notify.info(this.l('Saved Successfully'));
          this._eventService.emitChildEvent(true)
          this.bsModalRef.hide();
        },
        () => {
          this.saving = false;
        });
    }
  }
  

  getVehicleDetail()
  {

  }


}
