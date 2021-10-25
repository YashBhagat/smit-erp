import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Employee, EmployeeData} from "../../model/employee";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private apiservice: ApiService,@Inject(MAT_DIALOG_DATA) public data: EmployeeData) { }

  employeesProfile!: Employee;

  ngOnInit(): void {
    this.EmployeeDetails(this.data.employee_id);

  }

  EmployeeDetails(eployeeId: number): void {
    this.apiservice.employeeProfile(eployeeId).subscribe((data) => {
      this.employeesProfile =data;
      console.log(this.employeesProfile);

    })
  }
}
