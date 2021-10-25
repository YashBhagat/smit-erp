import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {AuthGuard} from "./guard/auth.guard";
import {EmployeeComponent} from "./employee/employee.component";
import {CashEmployeeComponent} from "./cash-employee/cash-employee.component";
import {UserComponent} from "./user/user.component";
import {DepartmentComponent} from "./department/department.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {CompanyComponent} from "./company/company.component";
import {DetailsComponent} from "./company/details/details.component";


const routes: Routes = [
  {
    path:'',
    component:ToolbarComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'',
        component:EmployeeComponent
      },
      {
        path:'cash/employee',
        component:CashEmployeeComponent
      },
      {
        path:'company',
        component: CompanyComponent
      },
      {
        path:'department',
        component:DepartmentComponent
      },
      {
        path:'transaction',
        component:TransactionComponent
      },
      {
        path:'user',
        component:UserComponent
      },
      {
        path:'company/details/:id',
        component:DetailsComponent
      }
    ]
  },
  {
    path:'auth',
    component:AuthComponent
  },
  {
    path:'***',
    redirectTo:'auth'
  },
  {
    path:'404',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
