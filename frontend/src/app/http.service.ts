import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  baseUrl="http://localhost:3000/api";
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    
  }
  get<T>({path}:{path:string}){
    return this.http.get<T>(this.baseUrl+`/${path}`);
  }

}
