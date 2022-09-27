import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IVehicleRecord } from 'src/app/typeDefinition/IVehicleRecord';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() vehicle!:IVehicleRecord;

  constructor() { }

  ngOnInit(): void {
    
  }
  

}
