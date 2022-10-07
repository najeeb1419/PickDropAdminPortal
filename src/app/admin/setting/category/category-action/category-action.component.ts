import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-category-action',
  templateUrl: './category-action.component.html',
  styleUrls: ['./category-action.component.css']
})
export class CategoryActionComponent implements OnInit {
  categoryForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CategoryActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.categoryReactiveForm();
  }

  categoryReactiveForm() {
    this.categoryForm = this.fb.group({
      name: [''],
      description: [''],
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    console.log(this.categoryForm.value);
  }
  

}
