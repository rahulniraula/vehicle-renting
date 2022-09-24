import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private loginService: LoginService,
    private router:Router
  ) { }
  ngOnInit(): void {
    console.log("Reading token from memory");
    tokenSubject.subscribe(t=>console.log(t));
  }

  onSubmit(): void {
    this.loginService.login(this.loginForm.value as unknown as ILoginRequest).subscribe(resp => {
      if (resp.status == 1) {
        tokenSubject.subscribe(t=>{
          localStorage.setItem("app_token",t)
          this.router.navigate(["admin"]);
        });
        tokenSubject.next(resp.data.token);
      }
    });
  }
}
