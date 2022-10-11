import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponentBase } from '@shared/app-component-base';
import { Category, CategoryDto, CategoryServiceProxy, FileParameter, SelectItemDto } from '@shared/service-proxies/service-proxies';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-category-action',
  templateUrl: './category-action.component.html',
  styleUrls: ['./category-action.component.css']
})
export class CategoryActionComponent extends AppComponentBase implements OnInit {
  categoryDto: CategoryDto = new CategoryDto();
  categoryList: SelectItemDto[] = [];

  file: File;
  imgURL: string
  type: string='Category';


  constructor(injector: Injector,
    public dialogRef: MatDialogRef<CategoryActionComponent>,
    private _categoryService: CategoryServiceProxy
  ) {
    super(injector)
  }


  ngOnInit(): void {
    this.getCategorySelectList();
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this._categoryService.addCategory(this.categoryDto).subscribe(res => {
      this.notify.success("Successfully saved.")
    })
  }



  addFile(event: any) {

    if (event.target.files && event.target.files[0]) {
      this.setImage(event.target.files[0])
    }
  }

  setImage(_file: File) {


    this.file = _file;


    var reader = new FileReader();
    reader.onload = (event: any) => {

      this.imgURL = event.target.result;


    }
    reader.readAsDataURL(_file);
  }

  async uploadFile(file: FileParameter) {

    if (!file) {
      return;
    }
    let fileToUpload = file;
    const formData = new FormData();
    formData.append('file', fileToUpload.data, fileToUpload.fileName);

    return await this._categoryService.addFile(file).toPromise()
  }


  getCategorySelectList() {
    this._categoryService.getCategoryList().subscribe(res => {
      this.categoryList = res;
    })
  }


  categoryOrSubCategory(value: string) {
    this.type = value;
  }




}
