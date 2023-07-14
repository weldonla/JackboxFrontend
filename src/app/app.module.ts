import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { JwtHelperService, JwtModule, JwtModuleOptions, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from './_services/auth-guard.service';
import { AdminGuardService } from './_services/admin-guard.service';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { UserListModule } from './user-list/user-list.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: tokenGetter,
      allowedDomains: ['http://localhost:4200/']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    UserListModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService,
    AdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
