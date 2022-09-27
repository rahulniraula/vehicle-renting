import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() onSearch=new EventEmitter<{}>();
  vehicleTypes: [string] = [""];
  vehicleBrands: [string] = [""];
  transmissionTypes: [string] = [""];
  constructor(private httpService: HttpService, private fb: FormBuilder) { }
  public searchForm = this.fb.group({
    vehicleBrand:[""],
    vehicleType:[""],
    vehicleTransmission:[""],
    latitude:[0],
    longitude:[0]

  });
  ngOnInit(): void {
    this.getConfigData()
  }
  getConfigData() {
    this.httpService.get<IConfigResponse>({ path: 'config' }).subscribe(data => {
      if (data.status == 1) {
        this.vehicleBrands = data.data.vehicleBrands;
        this.vehicleTypes = data.data.vehicleTypes;
        this.transmissionTypes = data.data.transmissionTypes;
      }
    });
  }
  search(){
    console.log(this.searchForm.value);
    this.onSearch.emit(this.searchForm.value);
  }
  async checkboxClicked(e: { target: { checked: boolean; value: any; }; }){
    if(e.target.checked){
      let loc=await this.httpService.getLocation();
      this.searchForm.patchValue({
        latitude:loc.latitude,
        longitude:loc.longitude
      });
      console.log(loc);
    } else{
      this.searchForm.patchValue({
        latitude:0,
        longitude:0
      });
    }   
  }

}
export interface IConfigResponse {
  status: number,
  data: {
    vehicleTypes: [string],
    vehicleBrands: [string],
    transmissionTypes: [string]
  }
}
