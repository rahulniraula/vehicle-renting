import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { IVehicleRecord } from 'src/app/typeDefinition/IVehicleRecord';
import { IVehicleResponse } from 'src/app/typeDefinition/IVehicleResponse';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.scss']
})
export class ListVehicleComponent implements OnInit {
  vehicles:IVehicleRecord[]=[];
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.fetchService()
  }
  fetchService(){
    this.http.get<IVehicleResponse>({path:'vehicles'}).subscribe(data=>{
      this.vehicles=data.data
    });
  }

}

