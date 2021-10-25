import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DepartmentListComponent} from "../department-list/department-list.component";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {Company} from "../../model/company";
import {DepartmentAddComponent} from "../department-add/department-add.component";
import {DownloadDataComponent} from "../download-data/download-data.component";
import {Employee, employeeDetailList, EmployeeRecord} from "../../model/employee";
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker'
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {AddEmployeeRecordComponent} from "../add-employee-record/add-employee-record.component";
import {ViewEmployeeRecordComponent} from "../view-employee-record/view-employee-record.component";
import {EmployeeDetailsComponent} from "../../employee/employee-details/employee-details.component";
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface SelectDate {
  year: '',
  month:'',
  company_id:'',
  employee_id:'',
  department_rate:''
  per_hour_rate:''
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DetailsComponent implements OnInit {
  date = new FormControl(moment());
  companyId: any;
  form: any={};
  employeeList:  Employee[] = [] =[];
  companyDetail: Company | undefined;
  totalHoursAdv: employeeDetailList[] = [];
  temp: any;
  employeeId: number | undefined;
  department_rate: string = '';
  records: EmployeeRecord | undefined;
  Search: any;

  constructor(private  matDialog: MatDialog,
              private route: ActivatedRoute,
              private apiservice: ApiService) { }

  addDepartmentDialog: MatDialogRef<DepartmentAddComponent> | undefined;
  listDepartmentDialog: MatDialogRef<DepartmentListComponent> | undefined;
  downloadDialog: MatDialogRef<DownloadDataComponent> | undefined;
  addEmployeeRecord: MatDialogRef<AddEmployeeRecordComponent> | undefined;
  viewEmployeeRecord: MatDialogRef<ViewEmployeeRecordComponent> | undefined;
  detailsDialogRef: MatDialogRef<EmployeeDetailsComponent> | undefined;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let id = params['id'];
      this.companyId = id;
      this.companyDetails(this.companyId);
      this.getEmployeeList(this.companyId);
    } )
  }


  openDepartment(): void {
    this.addDepartmentDialog = this.matDialog.open(DepartmentAddComponent, {
      data: {companyId: this.companyId}
    });
  }

  openDepartmentList(): void{
    this.listDepartmentDialog = this.matDialog.open(DepartmentListComponent,
      {
        data: {companyId: this.companyId}
      });
  }

  openDownload(): void{
    this.downloadDialog = this.matDialog.open(DownloadDataComponent);
  }

  companyDetails(companyId: any): void {
    this.apiservice.companyDetails(companyId).subscribe((data) => {
      this.companyDetail= data;
      console.log(data)

    })
  }

  getEmployeeList(companyId:number): void {
    const startDate =  moment(this.date.value).format('YYYY-MM') + "-01";
    const endDate = moment(this.date.value).format('YYYY-MM') + "-31";
    // @ts-ignore
    this.records = new EmployeeRecord(toString(companyId), startDate, endDate);
    console.log(this.records);
    this.apiservice.employeeListByCompanyId(companyId).subscribe((data) => {
       this.employeeList = data;
       console.log(this.employeeList)
      this.filterOmDate();
    })
  }

  filterOmDate():void {
    this.totalHoursAdv = [];
    const startDate =  moment(this.date.value).format('YYYY-MM') + "-01";
    const endDate = moment(this.date.value).format('YYYY-MM') + "-31";
    const  month = moment(this.date.value.format('MM'));
    console.log(startDate,"-",endDate);
    for (let item of this.employeeList){
      var totalHours: number=0, totalAdvance:number =0, totalAmount:number=0,balanceAmount:number=0;
      for(let daily of item.dailyStatuss){
        if (daily.date>=startDate && daily.date<=endDate){
          totalHours = totalHours+ +daily.hours;
          totalAdvance = totalAdvance + +daily.advance_salary;
        }
      }
      totalAmount = +item.per_hour_rate * +totalHours;
      balanceAmount = totalAmount- totalAdvance;
      let ptax:number=200;
      if (month._i=== "02" ){
        ptax=300;
      }
     for(let department of item.departement.departmentDetails){
       this.department_rate=department.price;
     }
      this.temp= {
        "id": item.id,
        "totalHours": totalHours,
        "totalAdvance": totalAdvance,
        "employee_name": item.employee_name,
        "department_name": item.departement.departement_name,
        "per_hours_rate": item.per_hour_rate,
        "totalAmount": totalAmount,
        "balanceAmount": balanceAmount,
        "department_id": item.departement.id,
        "ptax": ptax,
        "department_rate": this.department_rate,
      };

      // @ts-ignore
      this.totalHoursAdv.push(this.temp);

    }
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.getEmployeeList(this.companyId);
  }

  AddRecord(employee_id: any, department_rate: string, per_hour_rate: string): void{
    this.addEmployeeRecord = this.matDialog.open(AddEmployeeRecordComponent, {
      data: {year: moment(this.date.value).format('YYYY'),
             month: moment(this.date.value).format('MM'),
             company_id: this.companyId,
             employee_id: employee_id,
             department_rate: department_rate,
             per_hour_rate: per_hour_rate,
           }
    });
    this.addEmployeeRecord?.afterClosed().subscribe(()=>{
      this.getEmployeeList(this.companyId);
    })
  }

  ViewRecord(employeeId: any): void {
    this.viewEmployeeRecord = this.matDialog.open(ViewEmployeeRecordComponent,{
      data: {
        year: moment(this.date.value).format('YYYY'),
        month: moment(this.date.value).format('MM'),
        employee_id: employeeId
      }
    });
  }

  OpenEmployeeDetails(employeID: number): void {
    this.employeeId = employeID;
    this.detailsDialogRef = this.matDialog.open(EmployeeDetailsComponent, {
      data: {employee_id : this.employeeId}
    });
  }
}
