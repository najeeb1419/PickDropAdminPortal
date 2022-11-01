import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { VehicleDetailDto, VehicleDetailServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VehicleActionComponent } from './vehicle-action/vehicle-action.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  animations: [appModuleAnimation()]
})
export class VehicleComponent implements OnInit {
vehicleDetailList:VehicleDetailDto[]=[];
  constructor(private _modalService: BsModalService,
    private _vehicleDetail:VehicleDetailServiceProxy) { }

  ngOnInit(): void {
    this. getVeicleDetailList();
  }


  addEditVehicle(id?: number): void {
    this.showCreateOrEditVehicleDialog(id);
  }
  

  private showCreateOrEditVehicleDialog(id?: number): void {
    let createOrEditVehicyDialog: BsModalRef;
    if (!id) {
      createOrEditVehicyDialog = this._modalService.show(
        VehicleActionComponent,
        {
          class: 'modal-xl',
          backdrop: 'static',
          keyboard: false
        }
      );
    } else {
      createOrEditVehicyDialog = this._modalService.show(
        VehicleActionComponent,
        {
          class: 'modal-xl',
          backdrop: 'static',
          keyboard: false,
          initialState: {
            id: id,
          },
        }
      );
    }
  }


  getVeicleDetailList() {
    this._vehicleDetail.getHistory(
      undefined,
      undefined,
      undefined,
      0,
      200
    ).subscribe(result => {
      this.vehicleDetailList = result.items;
    });
  }




  addEditVehicleDetail(id?: number): void {
    this.showCreateOrEditVehicleDetailDialog(id);
  }
  

  private showCreateOrEditVehicleDetailDialog(id?: number): void {
    let createOrEditVehicleDialog: BsModalRef;
    if (!id) {
      createOrEditVehicleDialog = this._modalService.show(
        VehicleActionComponent,
        {
          class: 'modal-xl',
          backdrop: 'static',
          keyboard: false
        }
      );
    } else {
      createOrEditVehicleDialog = this._modalService.show(
        VehicleActionComponent,
        {
          class: 'modal-xl',
          backdrop: 'static',
          keyboard: false,
          initialState: {
            id: id,
          },
        }
      );
    }
  }

}
