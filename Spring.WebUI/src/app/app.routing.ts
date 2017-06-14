import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContractDetailEditComponent } from './contract-detail-edit/contract-detail-edit.component';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CustomerDetailEditComponent} from "./customer-detail-edit/customer-detail-edit.component";
import {InsuranceCaseListComponent} from "app/insurance-case-list/insurance-case-list.component";
import {InsuranceCaseDetailEditComponent} from "./insurance-case-detail-edit/insurance-case-detail-edit.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";
import {SigninComponent} from "./account/signin.component";
import {SignupComponent} from "./account/signup.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'contract/:id/edit', component: ContractDetailEditComponent, data: { title: 'Контракт' }  },
    { path: 'contract/:id/customers', component: CustomerListComponent, data: { title: 'Клиенты' }  },
    { path: 'customer/:id/new', component: CustomerDetailEditComponent, data: { title: 'Клиент' }  },
    { path: 'customer/:id/edit', component: CustomerDetailEditComponent, data: { title: 'Клиент' }  },
    { path: 'customer/:id/cases', component: InsuranceCaseListComponent, data: { title: 'Случаи' }  },
    { path: 'case/:id/edit', component: InsuranceCaseDetailEditComponent, data: { title: 'Случаи' }  },
    { path: 'case/:id/new', component: InsuranceCaseDetailEditComponent, data: { title: 'Случаи' }  },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: '**', component: PageNotFoundComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const AppRoutingProviders: any[] = [];
