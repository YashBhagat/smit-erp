import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Company} from "../../model/company";
import {Department, listDepartment} from "../../model/department";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {addCashHours, EmployeeData} from "../../model/employee";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Update} from "../../employee/employee.component";
// @ts-ignore
import { default as _rollupMoment} from 'moment';
import * as _moment from "moment";

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddRecordComponent implements OnInit {

  constructor( private  apiservice: ApiService,@Inject(MAT_DIALOG_DATA) public data: Update) { }
  form: any={};
  company: Company[]= [];
  department: listDepartment[] = [];
  departments!: listDepartment[];
  day: any;
  departmentRate!: string;
  record!: addCashHours;
  isLoadingResults = false;
  isAdded = false;

  // @ts-ignore
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }
    return '';
  }

  selectedCompany!: string;
  selectedDepartment!: string;

  ngOnInit(): void {
    this.getCompanyList();
    this.dateClass;
    console.log(this.data.employee_id)

  }
  getDepartmentList(event: any): void{
    this.apiservice.companyDepartmentById(Number(event)).subscribe((data) => this.department = data,);
    console.log(this.department)
  }
  getCompanyList():void{
    this.apiservice.companyList().subscribe((data) => this.company= data );
  }

  setDepartmentRate(event: any): void {
    this.departmentRate =event;
    this.departments = this.department.filter(data=>data.id===event);
    for (let dep of this.departments){
      this.departmentRate = dep.price;
    }
  }

  addEmployee(): void {
    // @ts-ignore
    this.record = new addCashHours(moment(this.form.date).format('YYYY-MM-DD'), this.form.hour,this.selectedCompany, this.selectedDepartment, this.data.employee_id, this.departmentRate, this.form.rate)
    console.log(this.record)
    this.apiservice.addCashEmployeeRecord(this.record).subscribe((data) => {
      console.log(this.record)
      this.isLoadingResults = false;
      this.isAdded = true;
      })
  }



}
