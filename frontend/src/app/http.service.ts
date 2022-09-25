import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IConfigResponse } from './admin/dashboard/search.component';
import { vehicleTypesSubject } from './localState';

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
  post<T>({path,data}:{path:string,data:any}){
    return this.http.post<T>(this.baseUrl+`/${path}`,data);
  }
  getConfig(){
    this.get<IConfigResponse>({path:'config'}).subscribe(data=>{
      if(data.status==1){
        vehicleTypesSubject.next(data);
      }
    });;
  }

}
