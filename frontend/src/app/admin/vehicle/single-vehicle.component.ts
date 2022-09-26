import { Component, Input, OnInit } from '@angular/core';
import { IVehicleRecord } from 'src/app/typeDefinition/IVehicleRecord';

@Component({
  selector: 'app-single-vehicle',
  templateUrl: './single-vehicle.component.html',
  styleUrls: ['./single-vehicle.component.scss']
})
export class SingleVehicleComponent implements OnInit {

  @Input() vehicle!:IVehicleRecord;
  constructor() { }

  ngOnInit(): void {
  }
  truncate(text:string){
    return text.length>200?text.substring(1,200)+'...':text;
  }

}
