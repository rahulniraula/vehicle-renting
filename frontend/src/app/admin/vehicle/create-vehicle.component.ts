import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { HttpService } from 'src/app/http.service';
import { vehicleTypesSubject } from 'src/app/localState';
import { IVehicleRecord } from 'src/app/typeDefinition/IVehicleRecord';
import { IVehicleResponse } from 'src/app/typeDefinition/IVehicleResponse';
import { IConfigResponse } from '../dashboard/search.component';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {
  configData: IConfigResponse = {
    status: 1, data: {
      vehicleTypes: [""],
      transmissionTypes: [""],
      vehicleBrands: [""]
    }
  };
  days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  public createForm = this.fb.group({
    vehicleType: ["", Validators.required],
    vehicleBrand: ["", Validators.required],
    vehicleTransmission: ["", Validators.required],
    availability: this.fb.array([]),
    description:["",Validators.required],
    images:["",Validators.required],
    prices: this.fb.array([]),
    latitude: [0],
    longitude: [0],
    useCurrentLocation: [false],
  });

  minDate: string = moment().format("YYYY-MM-DD");
  maxDate: string = moment().add(7, 'days').format("YYYY-MM-DD");
  constructor(private http: HttpService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  getPrices() {
    return this.createForm.controls.prices as FormArray;
  }
  getAvailability(){
    return this.createForm.controls.availability as FormArray;
  }

  addNewRow({date="",price=0}) {
    this.getPrices().push(this.fb.group({
      date: [date, Validators.required],
      price: [price, Validators.required]
    }));
  }
  ngOnInit(): void {
    this.http.getConfig();
    vehicleTypesSubject.subscribe(data => {
      this.configData = data;
    });
    this.createForm.controls['useCurrentLocation'].valueChanges.subscribe(data => {
      data ? this.getLocation() : null;
    });
    this.activeRoute.params.subscribe((u) => {
      if (u['id']) {
        this.fetchRecord(u['id']);
      }
    });
    // this.days.forEach(n=>{
      // this.getAvailability().push(new FormControl(false))
    // });
  }
  fetchRecord(id: string) {
    this.http.get<IVehicleResponse>({ path: `vehicles/${id}` }).subscribe(data => {

      if (data.status == 1 && data.data.length == 1) {
        let vehicleRecord = data.data[0];
        // const checkboxes: FormArray<FormControl> = this.createForm.get('availability') as FormArray;
        // checkboxes.push(new FormControl("Sunday"))
        this.createForm.patchValue({
          vehicleType: vehicleRecord.vehicleType,
          vehicleBrand: vehicleRecord.vehicleBrand,
          vehicleTransmission: vehicleRecord.vehicleTransmission,
          // availability: vehicleRecord.availability,
          description:vehicleRecord.description,
          prices:vehicleRecord.prices,
          latitude: vehicleRecord.latitude,
          longitude: vehicleRecord.longitude
        });
        vehicleRecord.prices?.forEach(p=>{
          this.addNewRow({date:p.date,price:p.price});
        })
        vehicleRecord.availability.forEach(a=>{
          //console.log(this.getAvailability());TODO
        });
      }
    });
  }
  fileSelected(f:Event){
    const element = f.target as HTMLInputElement;
    const formData=new FormData();
    // element.files[0].
    formData.append("files",element.files![0]);
    console.log(element.files![0].name);
    this.http.post<{status:number,data:{url:string}}>({path:'upload-file',data:formData}).subscribe(data=>{
      this.createForm.patchValue({
        images:data.data.url
      });
      console.log(data);
    });
  }
  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((pos: { coords: { latitude: number, longitude: number, accuracy: number } }) => {
      const crd = pos.coords;
      this.createForm.patchValue({
        latitude: crd.latitude,
        longitude: crd.longitude
      });
    }, (err: { message: string, code: number }) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }, options);
  }
  isEditMode(){
    return this.activeRoute.snapshot.params["id"];
  }
  submitForm() {
    const id = this.activeRoute.snapshot.params["id"];
    if(this.isEditMode()){
      this.http.patch<{ status: number }>({path:'vehicles/'+id,data:this.createForm.value}).subscribe(data=>{
        if (data.status == 1) {
          this.router.navigate(['', 'admin', 'vehicle']);
        }
      });
    }else{
      this.http.post<{ status: number }>({ path: 'vehicles', data: this.createForm.value }).subscribe(data => {
        if (data.status == 1) {
          this.router.navigate(['', 'admin', 'vehicle']);
        }
      });
    }

  }
  onCheckboxChange(e: { target: { checked: boolean; value: any; }; }) {
    const checkboxes: FormArray<FormControl> = this.createForm.get('availability') as FormArray;
    if (e.target.checked) {
      checkboxes.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkboxes.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkboxes.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}

