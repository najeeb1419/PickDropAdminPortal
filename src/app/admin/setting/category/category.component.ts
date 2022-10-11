import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDto } from '@shared/service-proxies/service-proxies';
import { SubCategoryActionComponent } from '../sub-category/sub-category-action/sub-category-action.component';
import { CategoryActionComponent } from './category-action/category-action.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categoryData: CategoryDto[] = [];
  constructor(public dialog: MatDialog,

  ) {

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryActionComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
