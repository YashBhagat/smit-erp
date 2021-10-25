import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AddDepartment, listDepartment} from "../../model/department";
import {ApiService} from "../../service/api.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CompanyId} from "../../model/company";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

  constructor(private  apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: CompanyId) { }

  ngOnInit(): void {
    this.getDepartmentList();
  }

  departmentList: listDepartment[] = [];

  dataSource = new MatTableDataSource(this.departmentList);
  displayedColumns: string[] =['id', 'department_name', 'price']


  getDepartmentList(): void {
    this.apiService.companyDepartmentById(this.data.companyId).subscribe((data)=> {
      this.departmentList = data
      console.log(this.departmentList)
    })
  }
}
