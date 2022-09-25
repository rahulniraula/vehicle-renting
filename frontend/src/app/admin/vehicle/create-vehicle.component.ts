import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  createForm = this.fb.group({
    vehicleType: ["", Validators.required],
    vehicleBrand: ["", Validators.required],
    vehicleTransmission: ["", Validators.required],
    availability: this.fb.array([]),
    latitude: [0],
    longitude: [0],
    useCurrentLocation: [false],
  });
  constructor(private http: HttpService,
    private fb: FormBuilder,
    private activeRoute:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.http.getConfig();
    vehicleTypesSubject.subscribe(data => {
      this.configData = data;
    });
    this.createForm.controls['useCurrentLocation'].valueChanges.subscribe(data => {
      data ? this.getLocation() : null;
    });
    this.activeRoute.params.subscribe((u)=>{
      if(u['id']){
        console.log("In Edit mode");
        this.fetchRecord(u['id']);
      }
    });
  }
  fetchRecord(id:string){
    this.http.get<IVehicleResponse>({path:`vehicles/${id}`}).subscribe(data=>{
      
      if(data.status==1 && data.data.length==1){
        let vehicleRecord=data.data[0];
        const checkboxes: FormArray<FormControl> = this.createForm.get('availability') as FormArray;
        checkboxes.push(new FormControl("Sunday"))
        this.createForm.patchValue({
          vehicleType:vehicleRecord.vehicleType,
          vehicleBrand:vehicleRecord.vehicleBrand,
          vehicleTransmission:vehicleRecord.vehicleTransmission,
          availability:vehicleRecord.availability,
          latitude:vehicleRecord.latitude,
          longitude:vehicleRecord.longitude
        });
      }
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
  submitForm() {
    this.http.post<{ status: number }>({ path: 'vehicles', data: this.createForm.value }).subscribe(data => {
      if (data.status == 1) {
        this.router.navigate(['', 'admin', 'vehicle']);
      }
    });
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

