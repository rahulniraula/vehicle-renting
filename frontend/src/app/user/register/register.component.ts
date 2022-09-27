import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private http:HttpService,private toaster:ToastrService,private router:Router) { }
  registrationForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    role:['Customer',Validators.required],
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
  });

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.registrationForm.value.password!=this.registrationForm.value.confirmPassword){
      this.toaster.error("Password dont match");
      return;
    }
    this.http.post<{status:number}>({path:'users',data:this.registrationForm.value}).subscribe(data=>{
      if(data.status==1){
        this.toaster.success("User Registration Successful");
        this.router.navigate(['','login']);
      }else{
        this.toaster.error("Couldnt register user");
      }
    },e=>{
      this.toaster.error(e.error.message);
    });
  }

}
