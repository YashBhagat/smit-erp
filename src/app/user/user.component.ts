import { Component, OnInit } from '@angular/core';
import {UserList} from "../model/user";
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'user_name', 'role'];
  dataSource: UserList[] =[];
  form: any={};
  constructor() { };
  hide = true;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  ngOnInit(): void {

    const ELEMENT_DATA: UserList[] = [
      {id:"1", name:"Yash Bhagat", user_name:"yb9", role:"admin" },
      {id:"2", name:"Siddhesh Modal", user_name:"sid", role:"admin" },
      {id:"3", name:"Bhanu Pratap Singh", user_name:"bp", role:"admin" },
    ];
    this.dataSource = ELEMENT_DATA;
  }



}
