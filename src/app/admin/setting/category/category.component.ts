import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { EventService } from '@shared/DataServices/event.service';
import { CategoryDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryActionComponent } from './category-action/category-action.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [appModuleAnimation()]
})
export class CategoryComponent extends AppComponentBase implements OnInit {

  categoryList: CategoryDto[] = [];
  attachmentUrl = AppConsts.attachmentUrl;
  constructor(injector: Injector,
    private _categoryService: CategoryServiceProxy,
    private _modalService: BsModalService,
    private _eventService: EventService,
  ) {
    super(injector)
    this._eventService.childEventListner().subscribe(res => {
      if (res) {
        this.GetCategories();
        this._eventService.emitChildEvent(false);
      }
    })
  }

  ngOnInit(): void {
    this.GetCategories();
  }

  

  GetCategories() {
    this._categoryService.getHistory(
      undefined,
      undefined,
      undefined,
      'Category',
      0,
      200
    ).subscribe(result => {
      this.categoryList = result.items;
    });
  }

 

  protected delete(rowData: CategoryDto): void {
    abp.message.confirm(
      this.l('DeleteWarningMessage', rowData.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._categoryService.deleteCategory(rowData).subscribe(() => {
            abp.notify.success(this.l('Successfully Deleted'));
            this.GetCategories()
          });
        }
      }
    );
  }


  addEditcategory(id?: number): void {
    this.showCreateOrEditCategoryDialog(id);
  }
  

  private showCreateOrEditCategoryDialog(id?: number): void {
    let createOrEditCategoryDialog: BsModalRef;
    if (!id) {
      createOrEditCategoryDialog = this._modalService.show(
        CategoryActionComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditCategoryDialog = this._modalService.show(
        CategoryActionComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }
  }



}
