export interface Department {
  id: number;
  departement_name: string;
  departmentDetails: AddDepartment[]
}
export class insertDepartment {
  department_name!: string | undefined;

  constructor(departement_name: string) {

    this.department_name= departement_name;
  }

}

export class AddDepartment {
  departmentId!: string | undefined;
  price!: string;
  companyId!:string;

  constructor(departmentId: string | undefined, price: string, companyId: string){
    this.departmentId= departmentId;
    this.price= price;
    this.companyId=companyId;
  }

}

export interface listDepartment{
  id: number;
  price: string;
  departement: {
    departement_name: string
    id: number
  }
}
