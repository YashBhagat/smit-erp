import { Injectable } from '@angular/core';


const TOKEN_KEY = "AuthToken";
const ROLE = "Role"

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(){
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRole(role: string){
    window.sessionStorage.removeItem(ROLE);
    window.sessionStorage.setItem(ROLE, role);
  }

  public getRole(){
    return sessionStorage.getItem(ROLE);
  }
}
