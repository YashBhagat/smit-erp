import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {insertDepartment} from "../../model/department";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private apiservice: ApiService) { }

  form:any = {};
  department!: insertDepartment;
  isLoadingResults = false;
  isAdded = false;

  ngOnInit(): void {
  }

  addDepartment(): void {
    this.isLoadingResults = true;
    this.department= new insertDepartment( this.form.departement_name);
    this.apiservice.insertDepartment(this.department).subscribe(
      data =>{
        console.log(data);
        this.isLoadingResults= false;
        this.isAdded = true;
      }
    )
    console.log(this.department);
  }

}
