import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {EchannelVerificationComponent} from "./echannel-verification/echannel-verification.component";
import {EchannelVerificationDataComponent} from "./echannel-verification-data/echannel-verification-data.component";
import {EchannelVerificationFormComponent} from "./echannel-verification-form/echannel-verification-form.component";
import { AuthGuardService as AuthGuard } from './shared/_services/auth-guard.service';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'echannel-verification', component: EchannelVerificationComponent, canActivate: [AuthGuard]},
  {path: 'echannel-verification/:id', component: EchannelVerificationFormComponent, canActivate: [AuthGuard]},
  {path: 'echannel-verification-data', component: EchannelVerificationDataComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // {enableTracing: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
