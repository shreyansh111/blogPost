import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 posts:Post[]=[]
   isLoading=false;
sub:Subscription
totalPost=0;
postPerPage=2;
currentPage=1
pageSizeOption=[1,2,5,10];
private authSub:Subscription
userAu=false;
userId:string
  constructor(private postService:PostService,private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.postService.getPosts(this.postPerPage,this.currentPage)
    this.userId=this.authService.getUserId()
    this.sub =this.postService.getPostUpdatedListner().subscribe((postData:{posts:Post[],postCount:number})=>{
      this.posts=postData.posts;
      this.isLoading=false;
      this.totalPost=postData.postCount;
    })
    this.userAu=this.authService.getAuthStatus()
    this.authSub=this.authService.getAuthStatusListner().subscribe(
      isLogin =>{
        this.userAu=isLogin;
        this.userId=this.authService.getUserId()
      }
    )
  }
  onDelete(id:string){
    this.postService.deletePost(id).subscribe(()=>{
      this.postService.getPosts(this.postPerPage,this.currentPage)
    })
  }
ngOnDestroy(){
this.sub.unsubscribe();
this.authSub.unsubscribe()
}
onPageChange(pageData:PageEvent)
{
  this.isLoading=true;
 this.currentPage=pageData.pageIndex+1;
 this.postPerPage=pageData.pageSize;
this.postService.getPosts(this.postPerPage,this.currentPage)

}

}
