import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTOR_PROVIDERS} from "./shared/_helpers/http.interceptor";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "./shared/material-module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EchannelVerificationComponent } from './echannel-verification/echannel-verification.component';
import { EchannelVerificationDataComponent } from './echannel-verification-data/echannel-verification-data.component';
import { EchannelVerificationFormComponent } from './echannel-verification-form/echannel-verification-form.component';
import {GLOBAL_ERROR_HANDLER_PROVIDER} from "./shared/_helpers/global-error-handler";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    EchannelVerificationComponent,
    EchannelVerificationDataComponent,
    EchannelVerificationFormComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        AppRoutingModule,
        ReactiveFormsModule,
    ],
  providers: [HTTP_INTERCEPTOR_PROVIDERS, GLOBAL_ERROR_HANDLER_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
