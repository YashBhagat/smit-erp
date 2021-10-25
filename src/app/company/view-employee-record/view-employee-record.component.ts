import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {ApiService} from "../../service/api.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SelectDate} from "../details/details.component";
import {Hours} from "../../model/employee";

@Component({
  selector: 'app-view-employee-record',
  templateUrl: './view-employee-record.component.html',
  styleUrls: ['./view-employee-record.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewEmployeeRecordComponent implements OnInit {

  constructor(private apiservice: ApiService, @Inject(MAT_DIALOG_DATA) public data:SelectDate) { }

  hoursData: Hours[] = [];


  ngOnInit(): void {
    const date = this.data.year + "-" + this.data.month + "-01" ;
    console.log(this.data.employee_id)
    this.getRecord(this.data.employee_id, date);
  }


  getRecord(employeeId: string,date: string ): void {

    this.apiservice.employeeDailyRecordList(date, employeeId).subscribe((data) => {
      this.hoursData = data;
      console.log(data)
    })
  }
}
