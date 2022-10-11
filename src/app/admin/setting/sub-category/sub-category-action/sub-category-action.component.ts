import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryDto, CategoryServiceProxy, FileParameter, SelectItemDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-sub-category-action',
  templateUrl: './sub-category-action.component.html',
  styleUrls: ['./sub-category-action.component.css']
})
export class SubCategoryActionComponent extends AppComponentBase implements OnInit {
  categoryDto: CategoryDto = new CategoryDto();
  // subCategoryDto:
  categoryList: SelectItemDto[] = [];

  file: File;
  imgURL: string

  constructor(injector: Injector,
    public dialogRef: MatDialogRef<SubCategoryActionComponent>,

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


}
