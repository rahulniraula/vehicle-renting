import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';
import { tokenSubject } from '../localState';
import { ILoginRequest, LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router:Router,
    private http:HttpService
  ) { }
  ngOnInit(): void {
    console.log("Reading token from memory");
    tokenSubject.subscribe(t=>console.log(t));
  }

  onSubmit(): void {
    this.http.post<{ status: number, data: { token: string } }>({path:'login',data:this.loginForm.value}).subscribe(resp=>{
        if (resp.status == 1) {
        tokenSubject.subscribe(t=>{
          localStorage.setItem("app_token",t)
          this.router.navigate(["admin"]);
        });
        tokenSubject.next(resp.data.token);
      }else{
        this.toaster.error("An error Occured. Please try again later");
      }
    },e=>{      
      this.toaster.error(e.error.message);
    });

  }
}
