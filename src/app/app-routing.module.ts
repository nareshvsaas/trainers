import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { CallSchedulerComponent } from './components/call-scheduler/call-scheduler.component';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { VideoComponent } from './components/video/video.component';

const routes: Routes = [
  // { path: '', component: ContentComponent },
   { path: '', component: CallSchedulerComponent },
  // { path: '', component: VideoComponent },
  { path: 'content', component: ContentComponent },
  { path: 'login', component: LoginComponent },
  // {path: 'call/:name/:role/:user_id', component: VideoCallComponent},
  {path: 'call/:name/:user_id', component: VideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
