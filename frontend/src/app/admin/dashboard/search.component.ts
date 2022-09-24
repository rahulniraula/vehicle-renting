import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  vehicleTypes:[string]=[""];
  vehicleBrands:[string]=[""];
  transmissionTypes:[string]=[""];
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.getConfigData()
  }
  getConfigData(){
    this.httpService.get<IConfigResponse>({path:'config'}).subscribe(data=>{
      if(data.status==1){
        this.vehicleBrands=data.data.vehicleBrands;
        this.vehicleTypes=data.data.vehicleTypes;
        this.transmissionTypes=data.data.transmissionTypes;
      }
    });
  }

}
interface IConfigResponse{
  status:number,
  data:{
    vehicleTypes:[string],
    vehicleBrands:[string],
    transmissionTypes:[string]
  }
}
