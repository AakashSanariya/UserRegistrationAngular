import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login/login-component/login-component.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {DataTablesModule} from "angular-datatables/index";
import {ApiServiceService} from "./service/api-service.service";
import {Interceptor} from "./Interceptor/interceptor";
import { NavBarComponent } from './navbar/nav-bar/nav-bar.component';
import { ListComponentComponent } from './Users/list-component/list-component.component';
import { AddComponentComponent } from './Users/add-component/add-component.component';
import { EditComponentComponent } from './Users/edit-component/edit-component.component';
import {AngularFontAwesomeModule} from "angular-font-awesome/dist/angular-font-awesome";
import { MustMatchDirective } from './directive/must-match.directive';
import { CommonAddComponentComponent } from './Users/common-add-component/common-add-component.component';
import { ParticularUserListComponent } from './User/particular-user-list/particular-user-list.component';
import {UserIdleModule} from "angular-user-idle";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    NavBarComponent,
    ListComponentComponent,
    AddComponentComponent,
    EditComponentComponent,
    MustMatchDirective,
    CommonAddComponentComponent,
    ParticularUserListComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    UserIdleModule.forRoot({idle: 1, timeout: 300, ping: 1}),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ApiServiceService, {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
