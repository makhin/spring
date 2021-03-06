import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {DataTableModule} from 'primeng/components/datatable/datatable';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {CheckboxModule} from 'primeng/components/checkbox/checkbox';
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import {SelectButtonModule} from 'primeng/components/selectbutton/selectbutton';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';
import {DialogModule} from 'primeng/components/dialog/dialog';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AppComponent } from './app.component';
import { ContractListComponent } from './contract-list/contract-list.component';

import { ContractDetailEditComponent } from './contract-detail-edit/contract-detail-edit.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppRouting } from './app.routing';
import {JsonHeaderService} from './Shared/jsonHeader.service';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

import { ErrorLogService } from './services/error-log.service';
import { LOGGING_ERROR_HANDLER_PROVIDERS } from './services/logging-error-handler';
import { LOGGING_ERROR_HANDLER_OPTIONS } from './services/logging-error-handler';
import { SlimLoadingBarModule } from "ng2-slim-loading-bar";
import {DataService} from "./services/data.service";
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailEditComponent } from './customer-detail-edit/customer-detail-edit.component';
import {Localization} from "./Shared/Localization";
import { InsuranceCaseListComponent } from './insurance-case-list/insurance-case-list.component';
import {LookupService} from "./services/lookup.service";
import { InsuranceCaseDetailEditComponent } from './insurance-case-detail-edit/insurance-case-detail-edit.component';
import {OnlyNumber} from "app/Shared/onlyNumber-directive";

import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './account/signin.component';
import { SignupComponent } from './account/signup.component';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import {IdentityService} from "./services/identity.service";
import {AuthenticationService} from "./services/authentication.service";
import {AuthGuard} from "./services/auth.guard";

// Set tokenGetter to use the same storage in AuthenticationService.Helpers.
export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    tokenGetter: (() => localStorage.getItem('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent,
    ContractDetailEditComponent,
    AboutComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent,
    CustomerListComponent,
    CustomerDetailEditComponent,
    InsuranceCaseListComponent,
    InsuranceCaseDetailEditComponent,
    OnlyNumber,
    DashboardComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 1500}),
    SlimLoadingBarModule.forRoot(),
    DataTableModule,
    CalendarModule,
    CheckboxModule,
    InputMaskModule,
    SelectButtonModule,
    DropdownModule,
    AutoCompleteModule,
    DialogModule,
    CurrencyMaskModule,
    RouterModule,
    AppRouting
  ],
  providers: [
    JsonHeaderService,
    ErrorLogService,
    DataService,
    LookupService,
    FormBuilder,
    Localization,
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
    },
    AuthGuard,
    AuthenticationService,
    IdentityService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
