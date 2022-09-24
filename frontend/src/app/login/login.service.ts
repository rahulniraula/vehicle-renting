import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(data:ILoginRequest){
    return this.http.post<{ status: number, data: { token: string } }>("http://localhost:3000/api/login", data)
  }
}
export interface ILoginRequest{
  email:string,
  password:string
}
