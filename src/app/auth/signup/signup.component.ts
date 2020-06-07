import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  isLoading=false;
authSub:Subscription
  constructor(public authService:AuthService) { }

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
  onsignup(signupForm:NgForm)
  {  this.isLoading=true
     if(signupForm.invalid)
     {
      return
     }
     this.authService.createUser(signupForm.value.email,signupForm.value.password)
  }
  ngOnDestroy(){
    this.authSub.unsubscribe()
  }
}
