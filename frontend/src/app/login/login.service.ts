import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpService,private toaster:ToastrService) { }

  login(data:ILoginRequest){
    this.http.post<{ status: number, data: { token: string } }>({path:'login',data})
  }
}
export interface ILoginRequest{
  email:string,
  password:string
}
