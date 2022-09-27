import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVehicleRecord } from 'src/app/typeDefinition/IVehicleRecord';
import { ModalComponent } from '../modal/modal.component';

// @ts-ignore
import {Modal} from 'mdb-ui-kit';
import { HttpService } from 'src/app/http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-single-vehicle',
  templateUrl: './single-vehicle.component.html',
  styleUrls: ['./single-vehicle.component.scss']
})
export class SingleVehicleComponent implements OnInit {

  @Input() vehicle!:IVehicleRecord;
  @Output() vehicleBooked=new EventEmitter<IVehicleRecord>();
  mod:Modal;
  constructor(private http:HttpService,private toaster:ToastrService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.mod=new Modal(document.getElementById('modal'+this.vehicle._id)) 
  }

  truncate(text:string){
    return text.length>200?text.substring(1,200)+'...':text;
  }
  bookNow(vehicle:IVehicleRecord){
       
  }
  confirmBooking(vehicle:IVehicleRecord){
    
    this.http.post<{status:number,message:string}>({path:'vehicles/book',data:vehicle}).subscribe(data=>{
      console.log(data);
      if(data.status==1){
        this.mod.hide()
        this.toaster.success("Vehicle Successfully Booked");

      }else{
        this.toaster.success("An Error Occurred");
      }
    },(e:HttpErrorResponse)=>{
      this.toaster.error(e.error.message)
    })
    
    // 
  }

}
