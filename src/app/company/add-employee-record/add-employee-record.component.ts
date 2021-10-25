import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import {Subject} from "rxjs";
import {MatCalendar, MatCalendarCellClassFunction, MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats, MAT_DATE_LOCALE, ThemePalette} from "@angular/material/core";
import {takeUntil} from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { MomentDateAdapter} from "@angular/material-moment-adapter";
import * as _moment from 'moment';
// @ts-ignore
import { default as _rollupMoment} from 'moment';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SelectDate} from "../details/details.component";
import {ApiService} from "../../service/api.service";
import {AddHours} from "../../model/employee";

const moment = _rollupMoment || _moment;

export const MY_FORMATS ={
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-employee-record',
  templateUrl: './add-employee-record.component.html',
  styleUrls: ['./add-employee-record.component.scss'],
  providers : [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AddEmployeeRecordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:SelectDate, private apiservice: ApiService) { }

  selectedYear: any = null;
  selectedMonth: any = null;
  selectDate: any = null;
  formControl: FormControl | undefined;
  date: any;
  color: ThemePalette = 'accent';
  checked = false;
  addHours= AddHours;
  form: any={};
  events: string[] = [];
  isLoadingResults = false;
  isAdded = false;
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }
    return '';
  }

  ngOnInit(): void {
    this.selectedMonth= Number(this.data.month) - 1;
    this.selectedYear= this.data.year ;
    this.date = new FormControl(moment([this.selectedYear,this.selectedMonth]));
    this.form.date = this.date
    console.log(this.data.year + this.data.month)
    console.log("company_id="+this.data.company_id)
    console.log("employee_id=" + this.data.employee_id);
    console.log("department_rate" + this.data.department_rate);
    this.dateClass

  }
  exampleHeader = ExampleHeader;


  addDailyHours(): void{
    this.isLoadingResults = true;
    if (this.checked== true){
      const hours = "0";
      const advance = "0";
      const status = 'a';
      // @ts-ignore
      this.addHours = new AddHours(moment(this.date.value).format('YYYY-MM-DD'),status, hours, advance,
        this.data.company_id, this.data.employee_id, this.data.department_rate, this.data.per_hour_rate);
      // @ts-ignore
      this.apiservice.employeeDailyRecord(this.addHours).subscribe(()=> {
        this.isLoadingResults = false;
        this.isAdded= true;
      }, error => {
        this.isLoadingResults = false;
      } )
    }else {
      const  status ='p';
      // @ts-ignore
      this.addHours = new AddHours( moment(this.date.value).format('YYYY-MM-DD'), status, this.form.hours,
        this.form.amount,  this.data.company_id, this.data.employee_id, this.data.department_rate, this.data.per_hour_rate)
      // @ts-ignore
     this.apiservice.employeeDailyRecord(this.addHours).subscribe(()=> {
       this.isLoadingResults = false;
       this.isAdded= true;
     },error => {
        this.isLoadingResults = false;
      })

    }


  }
}


@Component({
  selector: 'example-header',
  styles: [`
    .example-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
      visibility: hidden;
    }

    .example-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
      visibility: hidden;
    }

    .example-double-arrow .mat-icon {
      margin: -22%;
      visibility: hidden;
    }
  `],
  template: `
    <div class="example-header">
      <button mat-icon-button class="example-double-arrow" (click)="previousClicked('year')">
        <mat-icon>keyboard_arrow_left</mat-icon>
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{periodLabel}}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button mat-icon-button class="example-double-arrow" (click)="nextClicked('year')">
        <mat-icon>keyboard_arrow_right</mat-icon>
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ExampleHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>, private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats, cdr: ChangeDetectorRef) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
      this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1) :
      this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate = mode === 'month' ?
      this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1) :
      this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
