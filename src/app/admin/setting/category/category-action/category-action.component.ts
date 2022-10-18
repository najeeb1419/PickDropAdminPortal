import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { EventService } from '@shared/DataServices/event.service';
import { CategoryDto, CategoryServiceProxy, FileParameter, SelectItemDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-category-action',
  templateUrl: './category-action.component.html',
  styleUrls: ['./category-action.component.css'],
  animations: [appModuleAnimation()]
})
export class CategoryActionComponent extends AppComponentBase implements OnInit {
  categoryDto: CategoryDto = new CategoryDto();
  categoryList: SelectItemDto[] = [];
  id: number;
  file: File;
  imgURL: string
  type: string = 'Category';
  saving: boolean = true;



  constructor(injector: Injector,
    private _categoryService: CategoryServiceProxy,
    public bsModalRef: BsModalRef,
    private _eventService: EventService,
  ) {
    super(injector);
    this.imgURL = "assets/img/drag-drop-file-upload.png";
  }


  ngOnInit(): void {
    if (this.id > 0) {
      this.getCatergory();
    }
    this.getCategorySelectList();
  }

 

  async save() {
    this.saving = true;

    // save file
    await this.SaveFile();

    if (this.id) {
      this._categoryService.updateProuductSubCategory(this.categoryDto).subscribe(
        () => {
          this.notify.info(this.l('Updated Successfully'));
          this.bsModalRef.hide();
          this._eventService.emitChildEvent(true)
        },
        () => {
          this.saving = false;
        });
    } else {
      this._categoryService.addCategory(this.categoryDto).subscribe(
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

  async SaveFile() {
    if (this.file != null) {
      let fileParameter: FileParameter = { data: this.file, fileName: this.file.name };

      let fullPath = (await this.uploadFile(fileParameter));

      if (fullPath != null) {
        this.categoryDto.isImageCahnged = true
        this.categoryDto.oldImagePath = this.categoryDto.imagePath
      }
      this.categoryDto.imagePath = fullPath;
    }
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


  getCatergory() {
    this._categoryService.getCategory(this.id).subscribe(res => {
      this.categoryDto = res;
    })
  }




}
