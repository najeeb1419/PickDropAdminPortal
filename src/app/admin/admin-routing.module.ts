import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickVehicleComponent } from './pick-vehicle/pick-vehicle.component';
import { SettingComponent } from './setting/setting.component';
import { VehicleComponent } from './vehicle/vehicle.component';

const routes: Routes = [
  {
    path: 'setting',
    component: SettingComponent,
  },
  {
    path: 'vehicle',
    component: VehicleComponent,
  },
  {
    path: 'pickVehicle',
    component: PickVehicleComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
