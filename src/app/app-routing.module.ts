import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponentComponent} from "./Users/list-component/list-component.component";
import {AuthGuardGuard} from "./auth/auth-guard.guard";
import {AddComponentComponent} from "./Users/add-component/add-component.component";
import {LoginComponentComponent} from "./login/login-component/login-component.component";
import {NavBarComponent} from "./navbar/nav-bar/nav-bar.component";
import {EditComponentComponent} from "./Users/edit-component/edit-component.component";


const routes: Routes = [
  {path: 'dashboard', component: ListComponentComponent, canActivate: [AuthGuardGuard]},
  {path: 'edituser', component: EditComponentComponent, canActivate: [AuthGuardGuard]},
  {path: 'register', component: AddComponentComponent},
  {path: 'login', component: LoginComponentComponent},
  {path: 'logout', component: NavBarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
