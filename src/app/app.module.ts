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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    NavBarComponent,
    ListComponentComponent,
    AddComponentComponent,
    EditComponentComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
  ],
  providers: [ApiServiceService, {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
