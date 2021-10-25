import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Company} from "../../model/company";
import {Department, listDepartment} from "../../model/department";
import {AddEmployee, Employee, UpdateEmployee} from "../../model/employee";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SelectDate} from "../../company/details/details.component";
import {Update} from "../employee.component";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  company: Company[]= [];
  department: listDepartment[] = [];
  employee!: AddEmployee;
  selectedCompany: string | undefined ;
  selectedDepartment : string | undefined;
  form: any={};
  isLoadingResults = false;
  isAdded = false;
  update = false;
  employees!: any;


  constructor(private  apiservice: ApiService, @Inject(MAT_DIALOG_DATA) public data:Update) { }

  ngOnInit(): void {
    this.getCompanyList();

    // @ts-ignore
    if (this.data.employee_id === 0){
      this.update = false;
    }else {

      this.apiservice.employeeProfile(Number(this.data.employee_id)).subscribe((data) => {
        this.employees = data;
        console.log(this.employees)
        this.form.name = this.employees.employee_name;
        this.form.phone_number = this.employees.phone_number;
        this.selectedCompany = this.employees.companyId ;
        this.getDepartmentList(this.employees.companyId);
        this.selectedDepartment = this.employees.departementId
        this.form.rate = this.employees.per_hour_rate;

        for ( let items of this.employees.bankDetails){
          this.form.bank_name = items.bank_name;
          this.form.bank_account_number = items.account_number;
          this.form.bank_holder_name = items.account_holder_name;
          this.form.bank_ifsc_code = items.ifsc_code;

        }

        this.update = true;
      })
    }
  }

  getDepartmentList(event: any): void{
    this.apiservice.companyDepartmentById(Number(event)).subscribe((data) => this.department = data,);
  }
  getCompanyList():void{
    this.apiservice.companyList().subscribe((data) => this.company= data );
  }

  addEmployee(): void {
    this.isLoadingResults = true;
    const employeeType = "regular";
    this.employee = new AddEmployee( this.form.name, this.form.phone_number, this.form.rate,
      employeeType ,Number(this.selectedCompany)  , Number(this.selectedDepartment) , this.form.bank_name,
      this.form.bank_ifsc_code,this.form.bank_account_number,this.form.bank_holder_name )
    console.log(this.employee);
    this.apiservice.employeeCreate(this.employee).subscribe(
      data => {
        this.isLoadingResults = false;
        this.isAdded= true;
      }
    );
  }



  updateEmployee(): void {
    this.isLoadingResults = true;
    const employeeType = "regular";
    this.employee = new UpdateEmployee( this.data.employee_id, this.form.name, this.form.phone_number, this.form.rate,
      employeeType ,Number(this.selectedCompany)  , Number(this.selectedDepartment) , this.form.bank_name,
      this.form.bank_ifsc_code,this.form.bank_account_number,this.form.bank_holder_name )
    console.log(this.employee);
    this.apiservice.employeeUpdate(this.employee).subscribe(
      data => {
        this.isLoadingResults = false;
        this.isAdded= true;
      }
    );
  }
}
