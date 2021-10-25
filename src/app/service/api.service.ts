import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Authlogin} from "../model/login";
import {Observable} from "rxjs";
import {
  addCashHours,
  AddEmployee,
  AddEmployeeNon,
  AddHours,
  cashHours,
  Employee,
  EmployeeRecord,
  Hours
} from "../model/employee";
import {AddCompany, Company} from "../model/company";
import {AddDepartment, Department, insertDepartment, listDepartment} from "../model/department";



const httpOptions = {
  headers:  new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.siddhiplacementservices.in/'

  constructor(private http: HttpClient) { }

  userLogin(credentials: Authlogin): Observable<any>{
    return this.http.post(this.apiUrl + "login", credentials, httpOptions);
  }

  employeeList(): Observable<Employee[]>{
    return  this.http.get<Employee[]>(this.apiUrl + "employee/list", httpOptions);
  }

  employeeProfile(employeeId: number): Observable<Employee>{
    return  this.http.get<Employee>(this.apiUrl + "/employee/profile/" + employeeId, httpOptions );
  }

  employeeCreate(employee : AddEmployee): Observable<AddEmployee>{
    return this.http.post<AddEmployee>(this.apiUrl + 'employee/create' , employee , httpOptions);
  }


  employeeCreateNon(employee : AddEmployeeNon): Observable<AddEmployeeNon>{
    return this.http.post<AddEmployeeNon>(this.apiUrl + 'employee/create' , employee , httpOptions);
  }

  employeeUpdate(employee : AddEmployee): Observable<AddEmployee>{
    return this.http.patch<AddEmployee>(this.apiUrl + 'employee/update' , employee , httpOptions);
  }

  companyList(): Observable<Company[]>{
    return this.http.get<Company[]>(this.apiUrl + 'company/list', httpOptions);
  }

  departmentList(): Observable<Department[]>{
    return this.http.get<Department[]>(this.apiUrl + 'departement/list', httpOptions);
  }

  insertDepartment(addDepartment: insertDepartment):Observable<insertDepartment[]>{
    return this.http.post<insertDepartment[]>(this.apiUrl+ 'depertement/create', addDepartment, httpOptions);
  }

  employeeNonregular(empType:string):Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+'/employee/nonregular/'+empType,httpOptions);
  }

  employeeRegular(empType:string):Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+'/employee/nonregular/'+empType,httpOptions);
  }

  employeeListByCompanyId(companyId:number):Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'employee/company/' + companyId, httpOptions);
  }

  addCashEmployeeRecord(cashRecord: addCashHours): Observable<addCashHours>{
    return  this.http.post<addCashHours>(this.apiUrl + 'nonregular/employee/create', cashRecord, httpOptions );
  }

  employeeRecordnyCompanyId(record:EmployeeRecord):Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl+ '/employee/daily-status/company'+ record, httpOptions );
  }

  employeeDailyRecord(hours: Hours): Observable<Hours>{
    return this.http.post<Hours>(this.apiUrl+'dailystatus/insert', hours, httpOptions)
  }

  employeeDailyRecordList(date:string, employeeId:string): Observable<Hours[]>{
    return this.http.get<Hours[]>(this.apiUrl+ 'calendar/getAddedDays/' + employeeId +'/'+ date, httpOptions);
  }

  companyCreate(company : AddCompany): Observable<AddCompany>{
    return this.http.post<AddCompany>(this.apiUrl + 'company/create' , company , httpOptions);
  }

  companyDetails(companyId: number): Observable<Company>{
    return   this.http.get<Company>( this.apiUrl+ 'company/detail/' + companyId, httpOptions);
  }

  companyDepartmentPrice(department: AddDepartment):Observable<AddDepartment>{
    return this.http.post<AddDepartment>( this.apiUrl+ 'departmentDetail/create', department, httpOptions);
  }

  companyDepartmentById(companyId: number): Observable<listDepartment[]>{
    return this.http.get<listDepartment[]>(this.apiUrl+ 'departmentDetail/getDepartmentByCompId/' + companyId, httpOptions);
  }

  companyDepartmentAddList(companyId: number ): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl+ 'department/getNonAddedDepartmentByCompId/' + companyId, httpOptions);
  }

  cashRecord(employeeId: string, date: string): Observable<cashHours[]>{
    return this.http.get<cashHours[]>(this.apiUrl + 'nonregular/get/' + employeeId + "/" + date, httpOptions );
  }

}
