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
  vehicles: IVehicleRecord[] = [];
  constructor(private http: HttpService) { }
  defaultView='grid';
  selectedVehicle:IVehicleRecord|null=null;
  ngOnInit(): void {
    this.fetchVehicles()
  }
  fetchVehicles() {
    this.http.get<IVehicleResponse>({ path: 'vehicles' }).subscribe(data => {
      this.vehicles = data.data
    });
  }
  deleteVehicle(id: string) {
    this.http.delete<IVehicleResponse>({ path: `vehicles/${id}` }).subscribe(data => {
      if (data.status == 1) {
        this.fetchVehicles();
      }

    });
  }
  vehicleBooked(vehicle:IVehicleRecord){
    this.selectedVehicle=vehicle;
  }

}

