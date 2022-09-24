import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
// import {MatCardModule} from '@angular/material/card';
// import {MatGridListModule} from '@angular/material/grid-list';

import { CreateVehicleComponent } from './vehicle/create-vehicle.component';
import { ListVehicleComponent } from './vehicle/list-vehicle.component';
import { SingleVehicleComponent } from './vehicle/single-vehicle.component';
import { NavbarComponent } from './dashboard/navbar.component';
import { SearchComponent } from './dashboard/search.component';


const routes: Routes = [
  {
    path: 'vehicle',
    children: [
      { path: '', component: ListVehicleComponent},
      { path: 'create', component: CreateVehicleComponent}
    ]
  },

]
@NgModule({
  declarations: [
    DashboardComponent,
    CreateVehicleComponent,
    ListVehicleComponent,
    SingleVehicleComponent,
    NavbarComponent,
    SearchComponent,

  ],
  imports: [
    CommonModule,
    // MatToolbarModule,
    // MatListModule,
    // MatIconModule,
    // MatCardModule,
    // MatGridListModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
