import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IConfigResponse } from './admin/dashboard/search.component';
import { vehicleTypesSubject } from './localState';
//@ts-ignore
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  baseUrl="http://localhost:3000/api";
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    
  }
  get<T>({path,params}:{path:string,params?:{}}){
    return this.http.get<T>(this.baseUrl+`/${path}`,{params:params});
  }
  post<T>({path,data}:{path:string,data:any}){
    return this.http.post<T>(this.baseUrl+`/${path}`,data);
  }
  delete<T>({path}:{path:string}){
    return this.http.delete<T>(this.baseUrl+`/${path}`);
  }
  patch<T>({path,data}:{path:string,data:any}){
    return this.http.patch<T>(this.baseUrl+`/${path}`,data);
  }
  getConfig(){
    this.get<IConfigResponse>({path:'config'}).subscribe(data=>{
      if(data.status==1){
        vehicleTypesSubject.next(data);
      }
    });;
  }
  
  getLocation(){
    return new Promise<{latitude:number,longitude:number}>((resolve,reject)=>{
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition((pos: { coords: { latitude: number, longitude: number, accuracy: number } }) => {
        const crd = pos.coords;
        resolve(crd);
      }, (err: { message: string, code: number }) => {
        reject(err);
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }, options);
    });
  }
  decodeJWT():{role:string}{
    return jwt_decode(localStorage.getItem("app_token")||"")
  }

}
