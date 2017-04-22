import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContractListComponent } from './contract-list/contract-list.component';

import {ContractService} from './services/contract.service';

@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
