import {Component, Inject, OnInit} from '@angular/core';
import {AddDepartment, Department} from "../../model/department";
import {ApiService} from "../../service/api.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CompanyId} from "../../model/company";

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {

  constructor(private apiservice: ApiService,@Inject(MAT_DIALOG_DATA) public data: CompanyId) { }

  isLoadingResults = false;
  form: any={};
  department: Department[] = [];
  addDepartment!: AddDepartment;
  isAdded = false;


  selectedDepartment:  string | undefined;

  ngOnInit(): void {
    this.getDepartmentList()
    console.log(this.data.companyId);
  }

  addDepartmentDetails(): void {
    this.isLoadingResults = true;
     this.addDepartment = new AddDepartment(this.selectedDepartment, this.form.price,this.data.companyId.toString() )
     console.log(this.addDepartment)
      this.apiservice.companyDepartmentPrice(this.addDepartment).subscribe(
        data => {
          console.log(data);
          this.isLoadingResults = false;
          this.isAdded= true;
        }
      )
  }

  getDepartmentList(): void{
    this.apiservice.companyDepartmentAddList(this.data.companyId).subscribe((data) => {this.department = data,
    console.log(data)});
    console.log(this.department)
  }
}
