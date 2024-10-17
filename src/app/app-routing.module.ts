import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { CallSchedulerComponent } from './components/call-scheduler/call-scheduler.component';
import { VideoCallComponent } from './components/video-call/video-call.component';

const routes: Routes = [
  // { path: '', component: ContentComponent },
  { path: '', component: CallSchedulerComponent },
  { path: 'content', component: ContentComponent },
  { path: 'login', component: LoginComponent },
  {path: 'call/:name/:role/:user_id', component: VideoCallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
