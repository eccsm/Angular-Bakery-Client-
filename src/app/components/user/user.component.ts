import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../service/API.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxUserComponent } from '../dialog-box-user/dialog-box-user.component';
declare let alertify: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'fullname', 'email', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: APIService, public dialog: MatDialog) {
    this.apiService.getUsers().subscribe(
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
    const dialogRef = this.dialog.open(DialogBoxUserComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event!="Cancel") {
        this.updateRowData(result.data, result.extra);
        location.reload()
      }
    });
  }

  updateRowData(row_obj, notChanged) {
    this.apiService.updateUser(notChanged.id, { username: notChanged.username, email: notChanged.email, fullname: notChanged.fullname, password: notChanged.password, isBlocked: row_obj.isBlocked, roleId: row_obj.roleId }).subscribe(data => {

      alertify.success(notChanged.fullname + " has updated..")
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

