import { Component, OnInit } from '@angular/core';
import {Authlogin} from "../model/login";
import {ApiService} from "../service/api.service";
import {LocalService} from "../service/local.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  hide = true;
  form: any ={};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any;
  isLoadingResults = false;
  private loginInfo!: Authlogin;
  loading = false;
  constructor(private apiService: ApiService,
              private localStorage: LocalService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.isLoadingResults = true;
    console.log(this.form);

    this.loginInfo = new Authlogin(
      this.form.user_name,
      this.form.password
    );
      this.apiService.userLogin(this.loginInfo)
        .subscribe(data => {
            console.log(data);
            this.localStorage.saveRole(data.role);
            this.localStorage.saveToken(data.accessToken);
            this.isLoggedIn= true;
            this.isLoginFailed= false;
            this.roles = this.localStorage.getRole();
            this.loading = true;
            this.router.navigate(['']);
            // this.reloadPage();
            this.isLoadingResults = false;
          },
          error => {
            this.isLoginFailed= true;
            this.isLoadingResults = false;
            console.log(error.error.error);
            this.errorMessage = error.error.error;

            this.loading = false;

          }
        );
  }

  reloadPage(){
    window.location.reload();
  }


}
