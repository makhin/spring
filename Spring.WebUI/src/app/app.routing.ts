import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContractDetailEditComponent } from './contract-detail-edit/contract-detail-edit.component';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CustomerDetailEditComponent} from "./customer-detail-edit/customer-detail-edit.component";
import {InsuranceCaseListComponent} from "app/insurance-case-list/insurance-case-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'contract/:id/edit', component: ContractDetailEditComponent, data: { title: 'Контракт' }  },
    { path: 'contract/:id/customers', component: CustomerListComponent, data: { title: 'Клиенты' }  },
    { path: 'customer/:id/new', component: CustomerDetailEditComponent, data: { title: 'Клиент' }  },
    { path: 'customer/:id/edit', component: CustomerDetailEditComponent, data: { title: 'Клиент' }  },
    { path: 'customer/:id/cases', component: InsuranceCaseListComponent, data: { title: 'Случаи' }  },
    { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: '**', component: PageNotFoundComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const AppRoutingProviders: any[] = [];
