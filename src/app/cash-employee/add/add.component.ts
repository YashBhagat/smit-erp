import { Component, OnInit } from '@angular/core';
import {AddEmployee, AddEmployeeNon} from "../../model/employee";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-cash-employee-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class  CashEmployeeAddComponent implements OnInit {


  form: any={};
  employee!: AddEmployeeNon;
  isLoadingResults = false;
  isAdded = false;



  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
  }

  addEmployee(): void {
    this.isLoadingResults = true;
    const employeeType = "non-regular";
    const rate = "";
    const selectedCompany= "";
    const selectedDepartment= "";
    const bank_name= "";
    const bank_ifsc_code= "";
    const bank_account_number= "";
    const bank_holder_name= "";

    this.employee = new AddEmployeeNon( this.form.name, this.form.phone_number)
    console.log(this.employee)
    this.apiservice.employeeCreateNon(this.employee).subscribe(
      data=> {
        this.isLoadingResults = false;
        this.isAdded = true;
        console.log(data);
      }
    )
  }


}
