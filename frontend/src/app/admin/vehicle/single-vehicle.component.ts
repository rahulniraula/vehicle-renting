import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVehicleRecord } from 'src/app/typeDefinition/IVehicleRecord';
import { ModalComponent } from '../modal/modal.component';
// @ts-ignore
import {Modal} from 'mdb-ui-kit';
@Component({
  selector: 'app-single-vehicle',
  templateUrl: './single-vehicle.component.html',
  styleUrls: ['./single-vehicle.component.scss']
})
export class SingleVehicleComponent implements OnInit,AfterViewInit {

  @Input() vehicle!:IVehicleRecord;
  @Output() vehicleBooked=new EventEmitter<IVehicleRecord>();
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    new Modal(document.getElementById('modal'+this.vehicle._id))   

  }
  truncate(text:string){
    return text.length>200?text.substring(1,200)+'...':text;
  }
  bookNow(vehicle:IVehicleRecord){
       
  }

}
