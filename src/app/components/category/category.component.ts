import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../service/API.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
declare let alertify: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: APIService, public dialog: MatDialog) {
    this.apiService.getCategories().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  ngOnInit(): void {

  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data.id, result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data.id);
      }

      location.reload()

    });
  }

  addRowData(row_obj) {
    this.apiService.createCategory(row_obj).subscribe(data => {

      alertify.success(data.name + " has added..")
    }
    )
  }
  updateRowData(id, row_obj) {
    this.apiService.updateCategory(id, row_obj).subscribe(data => {

      alertify.success(data.name + " has updated..")
    }
    )
  }
  deleteRowData(id) {
    this.apiService.deleteCategory(id).subscribe(data => {

      alertify.success("Data has deleted..")
    }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
