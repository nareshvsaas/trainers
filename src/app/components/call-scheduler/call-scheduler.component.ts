import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call-scheduler',
  templateUrl: './call-scheduler.component.html',
  styleUrl: './call-scheduler.component.css'
})
export class CallSchedulerComponent {

  userID: any  = "7922fff2-9865-481a-a95b-45c29068aa53";
  currentMonth: any = "September/2024";
  timezone: any = "Asia/Calcutta";
  SERVER_LINK: string = "https://demo.1o1fitness.com/trainerservice/api/trainer";

  daysdata: any;
  name: string = "";
  role: string = "";
  user_id: string = "";
  constructor(private db_service: DbService, private http: HttpClient, private route: Router){

  }
  
  ngOnInit() {
    // this.getSchedulerDataFromServer();
  }

  // getSchedulerDataFromServer() {
  //   var index = '/scheduler/slots';
  //   var data = {
  //     "trainerId": this.userID,
  //     "month": this.currentMonth,
  //     "timezone": this.timezone,
  //   }
  //   this.http.post(this.SERVER_LINK + index, data).subscribe(
  //     (response:any) => {
  //       this.daysdata = response.data;
  //       this.daysdata = this.daysdata.filter((data: any) => data.participants.length > 0 && data.status=='open');
  //     },
  //     (error: any) => {
  //       console.log("An error has occurred while retriving profile data.");
  //     }
  //   )
  // }

  onJoinRoom(name: string, trainee_id: string){
    this.name = name;
    const userID = randomID(5);
    this.user_id = trainee_id; 
    console.log(this.name + "   " + this.role);
    this.route.navigate(['call/'+this.name +'/' + this.role + '/' + this.user_id])
  }

  joinMeeting(){
    let USER_ID = "";
    console.log(this.name + "   " + this.role);
    if(this.role == 'host')
      USER_ID = this.userID;
    else
      USER_ID = randomID(6);
    this.route.navigate(['call/'+this.name +'/' + USER_ID])
    }
}

function randomID(len: number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}
