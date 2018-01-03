import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';


import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth/services/auth-interceptor';


import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { NavbarMainComponent } from './main/navbar-main/navbar-main.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePostsComponent } from './profile/profile-posts/profile-posts.component';
import { ProfilePostSingleComponent } from './profile/profile-posts/profile-post-single/profile-post-single.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';


import {AuthService} from './auth/services/auth.service';
import {CommentService} from './comment/services/comment.service';
import {ProfileService} from './profile/services/profile.service';
import {PostService} from './post/services/post.service';
import {ImageEditorService} from './image-editor/services/image-editor.service';
import {CloudinaryService} from './cloudinary/cloudinary.service';

import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';
import {CloudinarySettings} from './cloudinary/cloudinary.settings';
import { FileUploadModule } from 'ng2-file-upload';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { LoaderComponent } from './helpers/loader/loader.component';
import { PostImgPreviewComponent } from './post/post-img-preview/post-img-preview.component';
import { ProfilePostModalComponent } from './profile/profile-posts/profile-post-single/profile-post-modal/profile-post-modal.component';
import { CommentFormComponent } from './comment/comment-form/comment-form.component';


import {FromNowPipe} from './pipes/from-now';
import { CommentSingleComponent } from './comment/comment-single/comment-single.component';
import { PreloaderComponent } from './ui/preloader/preloader.component';
import { NewsComponent } from './news/news.component';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileSingleComponent } from './profile/profile-list/profile-single/profile-single.component';
import { ImageEditorComponent } from './image-editor/components/image-editor/image-editor.component';


import { SliderComponent } from './image-editor/components/slider/slider.component';
import { ResizeControlsComponent } from './image-editor/components/resize-controls/resize-controls.component';
import { CropControlsComponent } from './image-editor/components/crop-controls/crop-controls.component';
import { ControlPanelComponent } from './image-editor/components/control-panel/control-panel.component';
import { CropWindowComponent } from './image-editor/components/crop-window/crop-window.component';
import { CustomControlComponent } from './image-editor/components/custom-control/custom-control.component';
import { CommentRepliesComponent } from './comment/comment-single/comment-replies/comment-replies.component';
import { CommentReplySingleComponent } from './comment/comment-single/comment-reply-single/comment-reply-single.component';

import {AuthGuard} from './auth/services/authguard';


import {PostResolver} from './post/services/post.resolver';

export const routes:Routes = [
{path:'profile',component:ProfileComponent,canActivate:[AuthGuard],resolve:{posts:PostResolver}},
{path:'profile/:userId',component:ProfileComponent,canActivate:[AuthGuard],resolve:{posts:PostResolver}},
{path:'signin',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'news',component:NewsComponent,canActivate:[AuthGuard]},
{path:'post/new',component:CreatePostComponent,canActivate:[AuthGuard]},
{path:'edit-image',component:ImageEditorComponent,canActivate:[AuthGuard]},
{path:'',redirectTo:'profile',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarMainComponent,
    ProfileComponent,
    ProfilePostsComponent,
    ProfilePostSingleComponent,
    RegisterComponent,
    LoginComponent,
    CreatePostComponent,
    LoaderComponent,
    PostImgPreviewComponent,
    ProfilePostModalComponent,
    CommentFormComponent,
    FromNowPipe,
    CommentSingleComponent,
    PreloaderComponent,
    NewsComponent,
    ProfileListComponent,
    ProfileSingleComponent,
    ImageEditorComponent,
    SliderComponent,
    ResizeControlsComponent,
    CropControlsComponent,
    ControlPanelComponent,
    CropWindowComponent,
    CustomControlComponent,
    CommentRepliesComponent,
    CommentReplySingleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   RouterModule.forRoot(routes),
     NgbModule.forRoot(),
    HttpClientModule,ReactiveFormsModule,FormsModule,
      CloudinaryModule.forRoot(cloudinary, CloudinarySettings),
    FileUploadModule
 
  ],
  entryComponents:[ProfilePostModalComponent],
  providers: [AuthService,AuthGuard,CloudinaryService,PostResolver,ImageEditorService,ProfileService,
  PostService,CommentService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
