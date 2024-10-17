import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from '../environments/environment.development';
import { ContentComponent } from './components/content/content.component';

// ngx-bootstrap imports 
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './components/login/login.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { CallSchedulerComponent } from './components/call-scheduler/call-scheduler.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    LoginComponent,
    FilterPipe,
    HeaderComponent,
    VideoCallComponent,
    CallSchedulerComponent
  ],
  imports: [
    // Firebase imports
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    // ngx- bootstrap imports
    ModalModule.forRoot(),
    ToastrModule.forRoot(), 

    // Angular imports
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
