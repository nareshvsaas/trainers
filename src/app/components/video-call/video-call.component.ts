import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ZoomVideo, { VideoPlayer, VideoPlayerContainer, VideoQuality } from '@zoom/videosdk';
import { KJUR } from 'jsrsasign';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent {

  client: any;
  isBrowser: boolean;
  sessionName: string = "1o1-Test-Demo";

  isVideoMuted: boolean = true;
  isAudioMuted: boolean = true;
  sub: any;

  name: string = "";
  role: number = 0;
  user_id: string = "";

  private chatMessageSubject = new Subject<string>();

  messages: string[] = [];
  newMessage: string = '';
  isChatVisible: boolean = false;
  isUsersVisible: boolean = false;
  zoom_user_id: string = 'USER_ID'; 

  userVideos: number[] = [
  ];
  videosPerPage: number = 4; // Default number of videos per page
  currentPage: number = 1;
  users: any;
  sessionContainer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.name= params['name'];
      this.user_id= params['user_id'];
      var roleparam = params['role'];
      if(roleparam == "host")
        this.role=1;
      else
        this.role=0;
    });
    console.log("In call component");
    this.sessionContainer = document.getElementById('sessionContainer');
   
    console.log("SharedArrayBuffer:  " +  typeof SharedArrayBuffer === 'function');
    this.joinMeeting();
  }

  async joinMeeting() {
    const jwtToken = this.generateVideoSdkApiJwt("iCjNmlJ0tHuA5k6qM3y7S1Vo4hjO0VyyoCXV", "ulaqib8IDthk6SQaT4GiNKFkbAfzMHjQ12x8");
    this.client = ZoomVideo.createClient();
    this.setupEventListeners();
    this.client.init("en-US", "Global", { patchJsMedia: true, enforceMultipleVideos:true }).then(async () => {
    await this.client.join(this.sessionName, jwtToken, this.name);
    const mediaStream = this.client.getMediaStream();
    await mediaStream.startAudio();
    await mediaStream.startVideo();
    console.log("crossOriginIsolated:  " +  crossOriginIsolated);
    this.renderVideo("Start",  this.client.getCurrentUserInfo().userId);
    });

  }

  async renderVideo(action: string, userId: number){
    const mediaStream = this.client.getMediaStream();
    if (action === "Stop") {
      const element = await mediaStream.detachVideo(userId);
      Array.isArray(element) ? element.forEach((el) => el.remove()) :
      element.remove();
      this.userVideos = this.userVideos.filter(id => id !== userId); // Update userVideos
    } else {
      if (!this.userVideos.includes(userId)) {
         if(this.userVideos.length == 0){
          const videoPlayerContainer = document.createElement('video-player-container');
          this.sessionContainer.appendChild(videoPlayerContainer as VideoPlayerContainer);
         }
        mediaStream.attachVideo(userId, VideoQuality.Video_720P).then((userVideo: any) => {
         
          const videoPlayerContainer = document.querySelector(
            "video-player-container"
          ) as Element;
          userVideo.style.backgroundColor="#80808096";


          const videoPlayer = document.createElement('video-player');
          videoPlayer.setAttribute('node-id', userId.toString()); // Use the dynamic userId here
          videoPlayer.setAttribute('video-quality', '720p');


          const videoElement = document.createElement('video');
          videoElement.setAttribute('autoplay', 'true');
          videoElement.setAttribute('playsinline', 'true');
          videoElement.style.width = '100%'; // Set video width
          videoElement.style.height = '100%'; // Set video height


           // Append the video element to the video-player element
          videoPlayer.appendChild(videoElement);


          videoPlayerContainer.appendChild(videoPlayer as VideoPlayer);
          // videoPlayerContainer.appendChild(userVideo);
          this.userVideos.push(userId);
    });
   
      }
    }
  }



  getVideoLayoutClass(): string {
    const videoCount = this.userVideos.length;
    if (videoCount === 1) {
      return 'single-video';
    } else if (videoCount === 2) {
      return 'two-videos';
    } else {
      return 'multi-videos';
    }
  }
  async onCameraClick() {
    const mediaStream = this.client.getMediaStream();
    if (!this.isVideoMuted) {
      await mediaStream.startVideo();
      this.isVideoMuted = true;
    } else {
      await mediaStream.stopVideo();
      this.isVideoMuted = false;
    }
  }

  async onMicrophoneClick() {
    const mediaStream = this.client.getMediaStream();
    this.isAudioMuted ? await mediaStream?.unmuteAudio() : await mediaStream?.muteAudio();
    this.isAudioMuted = this.client.getCurrentUserInfo().muted ?? true;
  };


  // https://www.npmjs.com/package/jsrsasign
  generateVideoSdkApiJwt(sdkApiKey: string, sdkApiSecret: string): string {
    // const KJUR = require('jsrsasign');
    const iat = Math.round((new Date().getTime() - 30000) / 1000); // issued at time
    const exp = iat + 60 * 60 * 2; // expiration time (2 hours)

    const oHeader = { alg: 'HS256', typ: 'JWT' };
    const oPayload = {
      app_key: sdkApiKey,
      iss: sdkApiKey, // issuer
      iat: iat, // issued at
      exp: exp, // expiration
      tpc: this.sessionName,
      role_type: this.role
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);

    // Sign the JWT using HS256 and return the token
    const videosdkApiToken = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkApiSecret);
    console.log(videosdkApiToken);

    return videosdkApiToken;
  }


  setupEventListeners(): void {
    this.client.on('user-added', (payload: any) => {
      console.log(payload[0].userId + ' joined the session');
      
    });

    // Optionally, you can handle other events as well
    this.client.on('user-removed', (payload: any) => {
      if(payload.length != 0)
      console.log(payload[0].userId + ' left the session');
    });

    this.client.on("peer-video-state-change", (payload: any) => {
      if(this.client.getCurrentUserInfo().userId != payload.userId){
          void this.renderVideo(payload.action, payload.userId)
      }
    });
    

    this.client.on('chat-on-message', (payload: any) => {
      console.log(payload)
      console.log(`Message: ${payload.message}, from ${payload.sender.name} to ${payload.receiver.name}`);
      if(this.client.getCurrentUserInfo().userId == payload.sender.userId)
        this.messages.push( "Me: " + payload.message);
      else
      this.messages.push(payload.sender.name + ": " + payload.message);
    })
  }



  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
    this.isUsersVisible = false;
  }

  toggleUsers() {
    this.isUsersVisible = !this.isUsersVisible;
    this.isChatVisible = false;
  }

  sendMessage() {
    const chat = this.client.getChatClient();
    if (this.newMessage.trim()) {
      chat.sendToAll(this.newMessage);
      // this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }

   // Update this method to change videos per row based on user selection

   get paginatedVideos() {
    const startIndex = (this.currentPage - 1) * this.videosPerPage;
    return this.userVideos.slice(startIndex, startIndex + this.videosPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.userVideos.length / this.videosPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  updateVideosPerPage() {
    this.currentPage = 1; // Reset to first page when changing videos per page
  }
}
