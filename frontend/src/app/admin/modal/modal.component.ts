import { Component, Input, OnInit } from '@angular/core';
// @ts-ignore
import {Modal} from 'mdb-ui-kit';
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
    // const modal=new Modal()
    // modal.show();
  }

}
