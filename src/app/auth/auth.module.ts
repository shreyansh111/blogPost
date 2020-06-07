import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularModule } from '../angular.material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent
  ],
  imports:[
    AngularModule,
    CommonModule,
    FormsModule
  ]
})
export class AuthModule{}
