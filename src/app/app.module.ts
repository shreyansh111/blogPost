import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component'
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutongModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor.';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component'
import { AngularModule } from './angular.material.module';
import { PostModule } from './posts/post.module';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
      ErrorComponent
  ],
  imports: [
    BrowserModule,
    PostModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularModule,
    AppRoutongModule,
    AuthModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor ,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor ,multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
