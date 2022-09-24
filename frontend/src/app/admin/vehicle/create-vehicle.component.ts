import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { vehicleTypesSubject } from 'src/app/localState';
import { IConfigResponse } from '../dashboard/search.component';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {
  configData: IConfigResponse = {
    status: 1, data: {
      vehicleTypes: [""],
      transmissionTypes: [""],
      vehicleBrands: [""]
    }
  };
  days:string[]=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getConfig();
    vehicleTypesSubject.subscribe(data => {
      this.configData = data;
    });
    this.getLocation()
  }
  getLocation(){
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos:{coords:{latitude:number,longitude:number,accuracy:number}}) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err:{message:string,code:number}) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

}
