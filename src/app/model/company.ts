import { Department } from "./department";

export interface Company {
  id: number;
  company_name: string;
  address: string;
  street: string;
  city: string;
  state: string;
  phone_number: string;
  pin_code: string;
  gst_number: string;
  departements: Department[];

}

export class AddCompany{
  id!: number;
  company_name!: string;
  address!: string;
  street!: string;
  city!: string;
  phone_number!: string;
  state!: string;
  pin_code!: string;
  gst_number!: string;

  constructor(company_name: string, phone_number: string, address: string, street: string, city: string, state: string, pincode: string, gst_number: string){
    this.company_name = company_name;
    this.phone_number = phone_number;
    this.address = address;
    this.street = street;
    this.city = city;
    this.state = state;
    this.pin_code = pincode;
    this.gst_number = gst_number;
  }
}

export interface CompanyId {
  companyId: number;
}
