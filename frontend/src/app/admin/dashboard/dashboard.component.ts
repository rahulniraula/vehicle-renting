import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tokenSubject } from 'src/app/localState';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    tokenSubject.subscribe(d=>{
      if(!d){
        this.router.navigate(['','login'])
      }
    });
  }

}
