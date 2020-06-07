import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{
  userAu=false
  listnerSubs:Subscription

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userAu=this.authService.getAuthStatus()
    this.listnerSubs=  this.authService.getAuthStatusListner().subscribe(
      islogin =>{
        this.userAu=islogin;
      }
    )
  }
ngOnDestroy(){
this.listnerSubs.unsubscribe()
}
onLogOut()
{
  this.authService.logOut()
}
}
