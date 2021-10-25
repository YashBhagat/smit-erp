import { Company } from "./company";
import { Department } from "./department";

export interface Employee {
  id: number;
  employee_name: string;
  email: string;
  phone_number: string;
  per_hour_rate: string;
  join_date: string;
  employee_type: string;
  companyId: string;
  company: Company;
  departement: Department;
  bankDetails: Bank_Details[];
  dailyStatuss: Daily_Statuss[];
}


export  interface  EmployeeData{
  employee_id: number;
}

export class EmployeeRecord{
  companyId: string | undefined;
  startDate: string | undefined;
  enddate: string | undefined;
  constructor(companyId: string, startDate: string, endDate: string){
    this.companyId = companyId;
    this.startDate = startDate;
    this.enddate = endDate;
};
}


export interface Bank_Details {
  bank_name: string;
  ifsc_code: string;
  branch: string;
  account_holder_name: string;
  account_number: string;
}

export interface Daily_Statuss{
  date: string;
  status: string;
  hours: string;
  advance_salary: string;
}

export interface employeeDetailList {
  department_rate: string;
  id: number;
  totalHours: string;
  totalAdvance: string;
  employee_name: string;
  department_name: string;
  per_hours_rate: string;
  totalAmount: string;
  balanceAmount: string;
  department_id: string
  ptax: string
}

export class AddEmployee{
  employee_name!: string;
  phone_number!: string;
  per_hour_rate!: string;
  employee_type!: string;
  companyId!: number;
  departementId!: number;
  bank_name!: string;
  bank_ifsc_code!: string;
  bank_account_number!: string;
  bank_account_holder_name!: string;

  constructor( employee_name: string, phone_number: string, per_hour_rate: string,employee_type: string,company_id: number,department_id: number,
               bank_name: string,bank_ifsc_code: string,bank_account_number: string,bank_account_holder_name: string,){
    this.employee_name = employee_name;
    this.phone_number = phone_number;
    this.per_hour_rate = per_hour_rate;
    this.employee_type = employee_type;
    this.companyId = company_id;
    this.departementId = department_id;
    this.bank_name= bank_name;
    this.bank_ifsc_code= bank_ifsc_code;
    this.bank_account_number= bank_account_number;
    this.bank_account_holder_name= bank_account_holder_name;
  }
}


export class AddEmployeeNon{
  employee_name!: string;
  phone_number!: string;
  per_hour_rate!: string;
  employee_type!: "non-regular";
  companyId!: null;
  departementId!: null;
  bank_name!: string;
  bank_ifsc_code!: string;
  bank_account_number!: string;
  bank_account_holder_name!: string;

  constructor( employee_name: string, phone_number: string, ){
    this.employee_name = employee_name;
    this.phone_number = phone_number;
    this.per_hour_rate = "";
    this.employee_type = "non-regular";
    this.companyId = null;
    this.departementId = null;
    this.bank_name= "";
    this.bank_ifsc_code= "";
    this.bank_account_number= "";
    this.bank_account_holder_name= "";
  }
}



export interface cashHours {
  date: string;
  hours: string;
  company_name: string;
  department_name: string;
  department_rate: string;
  amount: string;
}

export class addCashHours {
  date: string;
  hours: string;
  company_id: string;
  department_id: string;
  employee_id: string;
  per_hour_rate!: string;
  department_rate!: string;

  constructor( date:string, hours: string, company_id: string, department_id: string, employee_id: string, rate: string, department_rate: string){
    this.date = date;
    this.hours = hours;
    this.company_id = company_id;
    this.department_id = department_id;
    this.employee_id = employee_id;
    this.per_hour_rate = rate;
    this.department_rate = department_rate;
  }

}

export class UpdateEmployee{
  id!: string;
  employee_name!: string;
  phone_number!: string;
  per_hour_rate!: string;
  employee_type!: string;
  companyId!: number;
  departementId!: number;
  bank_name!: string;
  bank_ifsc_code!: string;
  bank_account_number!: string;
  bank_account_holder_name!: string;

  constructor( id: string,employee_name: string, phone_number: string, per_hour_rate: string,employee_type: string,company_id: number,department_id: number,
               bank_name: string,bank_ifsc_code: string,bank_account_number: string,bank_account_holder_name: string,){
    this.id= id;
    this.employee_name = employee_name;
    this.phone_number = phone_number;
    this.per_hour_rate = per_hour_rate;
    this.employee_type = employee_type;
    this.companyId = company_id;
    this.departementId = department_id;
    this.bank_name= bank_name;
    this.bank_ifsc_code= bank_ifsc_code;
    this.bank_account_number= bank_account_number;
    this.bank_account_holder_name= bank_account_holder_name;
  }
}
export interface  Hours {
  date:string;
  status: string;
  hours: string;
  advance_salary: string;
  company_id:string;
  employee_id: string;
}

export class AddHours{

  date:string;
  status: string;
  hours: string;
  advance_salary: string;
  company_id:string;
  employee_id: string;
  department_rate: string;
  per_hour_rate: string;

  constructor(date: string, status: string, hours: string, advance_salary: string, company_id: string, employee_id: string, department_rate: string, per_hour_rate: string){
    this.date= date;
    this.status= status;
    this.hours= hours;
    this.advance_salary= advance_salary;
    this.company_id= company_id;
    this.employee_id= employee_id;
    this.department_rate= department_rate;
    this.per_hour_rate = per_hour_rate
  }
}

