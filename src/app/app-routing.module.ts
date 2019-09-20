import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponentComponent} from "./Users/list-component/list-component.component";
import {AuthGuardGuard} from "./auth/auth-guard.guard";
import {LoginComponentComponent} from "./login/login-component/login-component.component";
import {NavBarComponent} from "./navbar/nav-bar/nav-bar.component";
import {EditComponentComponent} from "./Users/edit-component/edit-component.component";
import {CommonAddComponentComponent} from "./Users/common-add-component/common-add-component.component";
import {ParticularUserListComponent} from "./User/particular-user-list/particular-user-list.component";
import {AdminGuard} from "./auth/admin.guard";


const routes: Routes = [
  {path: 'dashboard', component: ParticularUserListComponent, canActivate: [AuthGuardGuard]},
  {path: 'listuser', component: ListComponentComponent, canActivate: [AuthGuardGuard, AdminGuard]},
  {path: 'edituser', component: EditComponentComponent, canActivate: [AuthGuardGuard]},
  {path: 'register/:id', component: CommonAddComponentComponent},
  {path: 'register', component: CommonAddComponentComponent},
  {path: 'login', component: LoginComponentComponent},
  {path: 'logout', component: NavBarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
