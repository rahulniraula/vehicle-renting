import { Component, OnInit } from '@angular/core';
import { tokenSubject } from './localState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'frontend';

  ngOnInit(): void {
    let token=localStorage.getItem("app_token");
    if(token){
      console.log("setting token form local");
      tokenSubject.next(token);
    }
  }
  
}
