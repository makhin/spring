import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContractDetailEditComponent } from './contract-detail-edit/contract-detail-edit.component';
import { ContractDetailViewComponent } from './contract-detail-view/contract-detail-view.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'contract/edit/:id', component: ContractDetailEditComponent, data: { title: 'Edit' }  },
    { path: 'contract/view/:id', component: ContractDetailViewComponent, data: { title: 'View' }  },
    { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: '**', component: PageNotFoundComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const AppRoutingProviders: any[] = [];
