import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Router, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ContractListComponent } from './contract-list/contract-list.component';

import {ContractService} from './services/contract.service';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppRouting } from './app.routing';
import {AuthService} from './security/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent,
    ContractDetailComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRouting
  ],
  providers: [
    ContractService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
