import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SubCategoryActionComponent } from './sub-category-action/sub-category-action.component';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
  animations: [appModuleAnimation()]
})
export class SubCategoryComponent extends AppComponentBase implements OnInit {
  subCategoryList:CategoryDto[]=[];
  constructor(injector: Injector, private _modalService: BsModalService,
    private _categoryService: CategoryServiceProxy,) {
      super(injector)
     }

  ngOnInit(): void {
    this.getSubetCategories();
  }


  getSubetCategories() {
    this._categoryService.getHistory(
      undefined,
      undefined,
      undefined,
      0,
      200
    ).subscribe(result => {
      this.subCategoryList = result.items;
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
            this.getSubetCategories()
          });
        }
      }
    );
  }


  addEditcategory(id?: number): void {
    this.showCreateOrEditSubCategoryDialog(id);
  }

  private showCreateOrEditSubCategoryDialog(id?: number): void {
    let createOrEditSubCategoryDialog: BsModalRef;
    if (!id) {
      createOrEditSubCategoryDialog = this._modalService.show(
        SubCategoryActionComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditSubCategoryDialog = this._modalService.show(
        SubCategoryActionComponent,
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
