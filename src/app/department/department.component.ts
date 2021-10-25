import { Component, OnInit } from '@angular/core';
import {ApiService} from "../service/api.service";
import {Department} from "../model/department";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DetailsComponent} from "./details/details.component";
import {AddDepartmentComponent} from "./add-department/add-department.component";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  constructor(private apiservice: ApiService, private matDialog: MatDialog) { }
  department: Department[]= [];

  ngOnInit(): void {
    this.getDepartmentList();
  }

  addDepartmentDialog: MatDialogRef<AddDepartmentComponent> | undefined;
  detailsDialog: MatDialogRef<DetailsComponent> | undefined;

  getDepartmentList(): void {
    this.apiservice.departmentList().subscribe((data)=> {
      this.department= data;
      console.log(data);
    });
  }

  openAddDepartment(): void {
    this.addDepartmentDialog = this.matDialog.open(AddDepartmentComponent);
    this.addDepartmentDialog?.afterClosed().subscribe(()=>{
      this.getDepartmentList();
    })
  }

  openDetailDepartment(): void {
    this.detailsDialog = this.matDialog.open(DetailsComponent);
  }

}
