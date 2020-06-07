import { Component, OnInit, OnDestroy, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import {mimeType} from './mine-type.validator'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit ,OnDestroy{
  private isEdit=false;
  private  postId="";
   post:Post
   isLoading=false;
   form:FormGroup;
   imagePreview:string;
   private authStatusSub:Subscription

  constructor( private postService:PostService, public route:ActivatedRoute,private authService:AuthService) { }

  ngOnInit(): void {
    this.authStatusSub= this.authService.getAuthStatusListner().subscribe(()=>{
    this.isLoading=false;
    })
    this.form=new FormGroup({
      title:   new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      content: new FormControl(null,{validators:[Validators.required]}),
      image :  new FormControl(null,{validators:[Validators.required],asyncValidators:[mimeType] })
    })
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.isEdit=true;
        this.postId=paramMap.get('id');
        this.isLoading=true;
        this.postService.getPost(this.postId).subscribe(postData=>{
          this.isLoading=false;
          this.post={id:postData._id,title:postData.title,content:postData.content,imagePath:postData.imagePath,creator:postData.creator};
          this.form.setValue({
            title:this.post.title,
            content:this.post.content,
            image:this.post.imagePath
          })
        })
      }
      else{
        this.isEdit=false;
        this.postId=null;
      }
    })
  }
  onSubmit()
  {

    if(this.form.invalid)
    {
      return
    }
    if(this.isEdit)
    {
      this.isLoading=true;
      this.postService.updatePost(this.postId,this.form.value.title,this.form.value.content,this.form.value.image)
    }
    else{
      this.isLoading=true;
      this.postService.addPost(this.form.value.title,this.form.value.content,this.form.value.image)
    }

  this.form.reset();
  }
  onImagePicked(event:Event)
  {
    const file =(event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader =new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result as string;
    }
    reader.readAsDataURL(file);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe()
  }
}
