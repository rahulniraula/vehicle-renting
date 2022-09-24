import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent,pathMatch: 'full'  },
  { path: 'admin', loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
