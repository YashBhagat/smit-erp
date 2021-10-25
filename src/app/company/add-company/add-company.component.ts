import { Component, OnInit } from '@angular/core';
import {AddCompany, Company} from "../../model/company";
import {ApiService} from "../../service/api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {


  constructor(private apiservice: ApiService,  private  matDialog: MatDialog) { }


  form:any = {};
  comapny!: AddCompany;
  isLoadingResults = false;
  isAdded = false;


  ngOnInit(): void {
  }

  addCompany(): void {
    this.isLoadingResults = true;
    this.comapny= new AddCompany(this.form.company_name,this.form.phone_number,this.form.address,
      this.form.street,this.form.city,this.form.state, this.form.pin_code,this.form.gst_number)
    this.apiservice.companyCreate(this.comapny).subscribe(
      data => {
        console.log(data);
        this.isLoadingResults = false;
        this.isAdded = true;
        // this.matDialog.closeAll();
        // this.form.company_name= null;
        // this.form.phone_number.reset;
        // this.form.address.reset;
        // this.form.street.reset;
        // this.form.city.reset;
        // this.form.state.reset;
        // this.form.pincode.reset;
        // this.form.gst_number.reset;
      }
    )

  }


}
