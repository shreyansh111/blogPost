import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  isLoading=false;

  authSub:Subscription
  constructor(public authService:AuthService) { }
  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

  ngOnInit(): void {
   this.authSub=  this.authService.getAuthStatusListner().subscribe(
     authStatus=>{
       if(!authStatus)
       {
        this.isLoading=false
       }

     }
   )
  }

  onLogin(loginForm:NgForm)
  { this.isLoading=true
    if(loginForm.invalid)
    {
      return
    }
    else{
      this.authService.login(loginForm.value.email,loginForm.value.password)
    }
  }
}
