import { Component, Input, OnInit } from '@angular/core';
import { IVehicleRecord } from 'src/app/typeDefinition/IVehicleRecord';

@Component({
  selector: 'app-vehicle-table',
  template: `
    <table class="table align-middle mb-0 bg-white">
  <thead class="bg-light">
    <tr>
      <th>Name</th>
      <th>Availability</th>
      <th>Location (Lat/long)</th>
      <th>Price/Day($)</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let veh of vehicles">
      <td>
        <div class="d-flex align-items-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style="width: 45px; height: 45px"
              class="rounded-circle"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">{{veh.vehicleType}} ({{veh.vehicleBrand}})</p>
            <p class="text-muted mb-0">{{veh.vehicleTransmission}} </p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">{{veh.availability}}</p>
        <p class="text-muted mb-0">IT department</p>
      </td>
      <td>
        {{veh.latitude}} {{veh.longitude}}
      </td>
      <td [innerHTML]="formatPrices(veh.prices!)">
        
        </td>
      <td>
        <a [routerLink]="['','admin','vehicle',veh._id,'edit']"><span class="fa fa-edit btn btn-sm"></span></a>
        <span (click)="deleteVehicle(veh._id)" class="fa fa-trash btn btn-sm btn-danger"></span>
      </td>
    </tr>
  </tbody>
</table>
  `,
  styles: [
  ]
})
export class VehicleTableComponent implements OnInit {
  @Input() vehicles!: IVehicleRecord[];
  @Input() deleteVehicle!:Function;
  constructor() { }

  ngOnInit(): void {
  }
  formatPrices(prices:[{date:string,price:number}]){
    return prices.map(p=>{
      return `${p.date} = ${p.price}<br>`
    }).join(" ")
  }

}
