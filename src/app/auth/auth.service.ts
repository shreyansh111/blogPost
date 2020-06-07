import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.module';
import { Router } from '@angular/router';
import {Subject} from 'rxjs'
import {environment} from "../../environments/environment"


const BACKEND_URL=environment.apiUrl+"/posts/";

@Injectable({providedIn:"root"})
export class AuthService{
private token :string;
private authStatusListner =new Subject<boolean>();
private isAuth=false;
private tokenTimer:any
private userId:string
getToken(){
  return this.token
}
getAuthStatus(){
  return this.isAuth
}

constructor(private http:HttpClient,private router:Router){}

createUser(email:string,password:string)
{
  const authData:AuthData={email:email,password:password}
   this.http.post(BACKEND_URL+'signup',authData).subscribe(response=>{
     this.router.navigate(["/"])
   },error=>{
     this.authStatusListner.next(false)
  })
}
private GetAuth(){
  const token =localStorage.getItem("token")
  const expireDate=localStorage.getItem('expiration')
  const userId=localStorage.getItem("userId")
  if(!token||!expireDate)
  {
    return
  }
  else{
    return{
      token:token,
      expireDate:new Date(expireDate),
      userId:userId
    }
  }
}
getUserId(){
  return this.userId
}
autoAuth(){
  const authInformation=this.GetAuth();
  if(!authInformation){
    return
  }
  const now =new Date()
  const expiresIn=authInformation.expireDate.getTime()-now.getTime();
  if(expiresIn>0)
  {
    this.token=authInformation.token;
    this.isAuth=true;
    this.userId=authInformation.userId
    this.authStatusListner.next(true);
    this.setAuthTimer(expiresIn/1000)
  }
}

login(email:string,password:string)
{
  const authData:AuthData={email:email,password:password}
  this.http.post<{token :string,expiresIn:number,userId:string}>(BACKEND_URL+'/login',authData).subscribe(response=>{
    const  token =response.token;

    this.token=token;
    if(token){
      const expireDuration=response.expiresIn
      console.log(response.expiresIn)
      this.setAuthTimer(response.expiresIn)
      this.isAuth=true
      this.userId=response.userId;
      this.authStatusListner.next(true)
      const now =new Date()
      const expirations=new Date(now.getTime()+expireDuration*1000)
      console.log(expirations)
      this.saveAuthData(token,expirations,this.userId)
      this.router.navigate(['/'])
    }

  },error=>{
    this.authStatusListner.next(false)
  });
}
getAuthStatusListner()
{
  return this.authStatusListner.asObservable()
}
logOut(){
  this.token=null;
  this.isAuth=false
  this.authStatusListner.next(false)
  clearTimeout(this.tokenTimer)
  this.clearAuthData()
  this.userId=null;
  this.router.navigate(['/'])
}
private saveAuthData(token:string,expireDuration:Date,userId:string)
{
  localStorage.setItem('token',token);
  localStorage.setItem('expiration',expireDuration.toISOString())
  localStorage.setItem('userId',userId)
}
private clearAuthData()
{
  localStorage.removeItem('token');
  localStorage.removeItem('expiration')
  localStorage.removeItem('userId')
}
private setAuthTimer(duration:number)
{
  this.tokenTimer= setTimeout(()=>{
    this.logOut
  },duration*1000)
}

}
