import { Component, OnInit } from '@angular/core';
import {Company} from "../model/company";
import {ApiService} from "../service/api.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddCompanyComponent} from "./add-company/add-company.component";

;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(private  apiservice: ApiService, private  matDialog: MatDialog) { }
  companys: Company[] = [];
  matDialogRef: MatDialogRef<AddCompanyComponent> | undefined;


  ngOnInit(): void {
    this.getCompanyList();

  }

  getCompanyList(): void {
    this.apiservice.companyList().subscribe((data) => {this.companys = data,
      console.log(data);
    });

  }


  OpenModel(): void {
    this.matDialogRef = this.matDialog.open(AddCompanyComponent);
    this.matDialogRef?.afterClosed().subscribe(() => {
      this.getCompanyList();
    })
  }




}
