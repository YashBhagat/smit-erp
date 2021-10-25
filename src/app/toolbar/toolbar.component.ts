import { Component, OnInit } from '@angular/core';
import {LocalService} from "../service/local.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  events: string[] = [];
  opened: boolean | undefined;
  showFiller = true;
  constructor(private localservice: LocalService,  private _location: Location,private router:Router) { }

  ngOnInit(): void {
    this.opened = true;
  }

  logout(): void {
    this.localservice.signOut();
    if (sessionStorage.getItem("AuthToken") === null) {
      this.router.navigate(['/auth']);
    }


  }

  backClicked() {
    if(this._location.path()!='')
    this._location.back();
  }

}
