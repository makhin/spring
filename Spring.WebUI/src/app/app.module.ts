import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ContractListComponent } from './contract-list/contract-list.component';

import {ContractService} from './services/contract.service';
import { ContractDetailEditComponent } from './contract-detail-edit/contract-detail-edit.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppRouting } from './app.routing';
import {AuthService} from './security/auth.service';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SavePanelComponent } from './save-panel/save-panel.component';

import { ErrorLogService } from './services/error-log.service';
import { LOGGING_ERROR_HANDLER_PROVIDERS } from './services/logging-error-handler';
import { LOGGING_ERROR_HANDLER_OPTIONS } from './services/logging-error-handler';
import {ContractItemService} from './services/contract-item.service';

@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent,
    ContractDetailEditComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent,
    SavePanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    AppRouting
  ],
  providers: [
    // ApiRequestService,
    ContractService,
    ContractItemService,
    AuthService,
    ErrorLogService,
    // CAUTION: This providers collection overrides the CORE ErrorHandler with our
    // custom version of the service that logs errors to the ErrorLogService.
    LOGGING_ERROR_HANDLER_PROVIDERS,

    // OPTIONAL: By default, our custom LoggingErrorHandler has behavior around
    // rethrowing and / or unwrapping errors. In order to facilitate dependency-
    // injection instead of resorting to the use of a Factory for instantiation,
    // these options can be overridden in the providers collection.
    {
      provide: LOGGING_ERROR_HANDLER_OPTIONS,
      useValue: {
        rethrowError: false,
        unwrapError: false
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
