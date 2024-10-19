import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  @ViewChild('root')
  root: ElementRef = {} as ElementRef;

  sub: any;

  name: string = "";
  user_id: string = "";
  APP_ID:number = 978108198;
  room_id = "test-room"

  constructor(private route: ActivatedRoute) {

  }

  ngAfterViewInit() {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    // const userID = randomID(5);
    // const userName = randomID(5);
    // generate token
    generateToken(
      'https://demo.1o1fitness.com/traineeservice/api/zego/token?userId='+ this.user_id + "&roomId="+this.room_id
    ).then((res:any) => {
      var tokenObject: any = JSON.parse(res);
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        this.APP_ID,
        tokenObject.data.data,
        this.room_id,
        this.user_id,
        this.name
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);

      console.log(
        'this.root.nativeElement',
        this.root.nativeElement.clientWidth
      );
      // start the call
      zp.joinRoom({
        container: this.root.nativeElement,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        showPreJoinView: false,
        // showScreenSharingButton: false

      });
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.name= params['name'];
      this.user_id= params['user_id'];
    });
  
  }
  


}




// get token
function generateToken(tokenServerUrl: string) {
  // Obtain the token interface provided by the App Server
  return fetch(tokenServerUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(async (res) => {
    const result = await res.text();
    return result;
  });
}

function randomID(len: number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}
