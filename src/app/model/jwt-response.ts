export class JwtResponse {
  accessToken: string;
  role: string;

  constructor( accessToken: string, role: string) {
    this.accessToken = accessToken;
    this.role = role;
  }
}
