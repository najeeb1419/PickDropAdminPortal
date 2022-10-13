import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailActionComponent } from './vehicle-detail-action.component';

describe('VehicleDetailActionComponent', () => {
  let component: VehicleDetailActionComponent;
  let fixture: ComponentFixture<VehicleDetailActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleDetailActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
