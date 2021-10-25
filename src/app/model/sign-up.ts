export class SingnUp{
  f_name: string;
  l_name: string;
  password: string;
  role: string;

  constructor(f_name: string, l_name: string, password: string, role: string){
    this.f_name = f_name;
    this.l_name = l_name;
    this.password = password;
    this.role = role;
  }
}
