import { Component, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VehicleActionComponent } from './vehicle-action/vehicle-action.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  animations: [appModuleAnimation()]
})
export class VehicleComponent implements OnInit {
  
  constructor(private _modalService: BsModalService,) { }

  ngOnInit(): void {
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

}
