import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: any;
  currentEmail: any;
  userName: string = "";
  userID: string = "";
  location: string = "Finding ..";
  showNotificationsPopup: boolean = false;
  adminnotifications: any[] = [];
  adminnotificationssize = 0;
  Fitnsssticker :boolean = false;
  adminnewnotifications = [];
  @Input() profilepicUrl: string = "assets/images/uploadimg.png";
  //isLoggedIn$: Observable<boolean>;

  // Google Va
  googleUserEmail!: string;
  private loggedIn!: boolean;
  currentLogged: any;
  currentUrl: any;

  // cognito auth tokens
  authData: any;
  auth: any;
  session: any;
  userCategories: any;
  isFitness: boolean = false;
  isYoga: boolean = false;
  isZumba : boolean = false;
  primCat: any;
  currentCategory: any;

  constructor(private db_service: DbService, public router: Router,private httpClient: HttpClient) {
  }


  //gangadhar closenotification
  closeNotifications(adminnotifi: string | any[]){
    let size = adminnotifi.length;
    if (size > 25)
      size = 25
    else
      size = adminnotifi.length;
      for(var i = 0 ; i < size; i++){
        // this.db_service.updateNotification(adminnotifi[i]).subscribe((response :any) =>{
        // })

      }

  }




  //gangadhar get notifications from server
  // this.userID
  getNotification() {
    if(this.adminnotificationssize != 0){
    this.adminnotificationssize = 0;
    // this.db_service.getNotifications(this.userID).subscribe((response: any) => {
    //   this.adminnotifications = response['data'];
    //   this.adminnotifications = this.adminnotifications.reverse();
    //   this.closeNotifications(this.adminnotifications);
    //   // this.adminnotificationssize = this.adminnotifications.length;

    // })
  }else{
    this.adminnotifications = [];
  }
  }
  //gangadhar get new notification size upto 25
  getSize(userID: string) {
    if(this.adminnotifications.length == 0){
    // this.db_service.getNewNotifications(userID).subscribe((response: any) => {
    //   this.adminnewnotifications = response['data'];
    //   this.adminnotificationssize = response['data'];

    // })
  }else{
    this.adminnotificationssize = 0;
  }
  }


  ngOnInit() {
    this.currentCategory = localStorage.getItem("ProfileCategory")
    this.currentLogged = localStorage.getItem("isloggedIn")
    // this.userService.currentUserID.subscribe((val) => {
    //   if (val != '') {
    //     this.userID = val;
    //     this.getProfile();
    //   }
    // });
    // this.userService.currentUserPic.subscribe((val) => {
    //   if (val != '') {
    //     this.profilepicUrl = val;
    //   }
    
    // });
    // this.userService.currentUserDetails.subscribe((val) =>{
    //   if(val != '')
    //   this.userCategories = JSON.parse(val);
    //   if(this.userCategories  != null){
    //     for(var i = 0; i < this.userCategories.length; i++) {
    //       if (this.userCategories[i].category_name == 'Bodybuilder') {
    //           this.isFitness = true;
    //           // break;
    //       }
    //       if(this.userCategories[i].category_name == "Yoga"){
    //           this.isYoga = true;
    //           // break;
    //       }
    //       if(this.userCategories[i].category_name == "Zumba"){
    //           this.isZumba = true;
    //           // break;
    //       }
    //       if (this.userCategories[i]["primary"] == true) {
    //         this.primCat = this.userCategories[i]["category_name"];
    //         this.currentCategory =  this.primCat;
    //       }
    //     }
    //   }

    // })


    ///gangadhar added methods starts here
    // this.getNotification();

    // interval(18000).subscribe(val => {
    //   this.getNotification();
    // })
    interval(900000).subscribe(val => {
      this.getSize(this.userID);
    })
    //gangadhar added methods ends here
    // console.log("current Email" + this.userID);
    // this.profilepicUrl;

    //this.getProfileDataFromServer();
    // location code
    window.navigator.geolocation.getCurrentPosition(

      (position) => {

        // const proxyurl = "https://fathomless-scrubland-37738.herokuapp.com/";
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const proxyurl = "https://thingproxy.freeboard.io/fetch/"
        this.httpClient.get(proxyurl+"https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyCnGd66Ff8wznTZiXjULR5FvQPL7KJrNug"
        ).subscribe((result: any) => {
          console.log(result);
          var address = result["results"][0]["address_components"];
          for (let i = 0; i < address.length; i++) {
            var locality = address[i]["types"][0];
            if (locality == "locality") {
              this.location = address[i]["long_name"];
            }
          }
        });
      },
      (failure) => {
        // if (failure.message.indexOf("Only secure origins are allowed") == 0) {
        //   // alert('Only secure origins are allowed by your browser.');
        // }
      }
    );
    navigator.geolocation.getCurrentPosition(function (location) {
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);
    });

    // this.userCategories = JSON.parse(localStorage.getItem("userCategory"));
    const userCategoryString = localStorage.getItem("userCategory");
    this.userCategories = userCategoryString ? JSON.parse(userCategoryString) : [];

    if(this.userCategories  != null){
    for(var i = 0; i < this.userCategories.length; i++) {
      if (this.userCategories[i].category_name == 'Bodybuilder') {
          this.isFitness = true;
          // break;
      }
      if(this.userCategories[i].category_name == "Yoga"){
          this.isYoga = true;
          // break;
      }
      if(this.userCategories[i].category_name == "Zumba"){
          this.isZumba = true;
          // break;
      }
      if (this.userCategories[i]["primary"] == true) {
        this.primCat = this.userCategories[i]["category_name"];
      }
    }
  }
    // this.isFitness = 

    
  }

  getProfile() {
    var index = '/profile/';
    var category= localStorage.getItem("ProfileCategory");
    if(category == null || category == undefined){
      const userCategoryString = localStorage.getItem("userCategory");
this.userCategories = userCategoryString ? JSON.parse(userCategoryString) : [];
      // this.userCategories = JSON.parse(localStorage.getItem("userCategory"))
        for(let i = 0; i< this.userCategories.length; i++){
            if(this.userCategories[i].primary)
              category = this.userCategories[i].category_name;
        }
    }

    if(category != "Yoga"){
    // this.db_service.getDataFromServer(this.userID, index).subscribe(
    //   response => {
    //     if (response != null) {
    //       //console.log('Data Retrived succesfully.', response);

    //       if (response.data.length != 0 && response.data[0] != null) {
    //         response = response.data[0];

    //         if (response.profileImage != null) {
    //           this.profilepicUrl = response.profileImage.profileImagePath;

    //         }
    //       }
    //     }

    //   },
    //   error => {
    //     console.log("An error has occurred while retriving profile data.");
    //   }
    // )
    }else{
      // this.yoga_db_service.getDataFromServer(this.userID, index).subscribe(
      //   response => {
      //     if (response != null) {
      //       //console.log('Data Retrived succesfully.', response);
  
      //       if (response.data.length != 0 && response.data[0] != null) {
      //         response = response.data[0];
  
      //         if (response.profileImage != null) {
      //           this.profilepicUrl = response.profileImage.profileImagePath;
  
      //         }
      //       }
      //     }
  
  
      //   },
      //   error => {
      //     console.log("An error has occurred while retriving profile data.");
      //   }
      // )
    }
   
  }
  getProfileDataFromServer() {
    // var index = '/profile/category/';
    // this.db_service.getDataFromServer(this.currentEmail, index).subscribe(
    //   response => {
    //     //console.log('Data Retrived succesfully.', response);
    //     if (response != null) {
    //       if (response.data.length != 0 && response.data[0] != null) {
    //         for(let i =0 ; i< response.data.length;i++){
    //          if(response.data[i].category[0].category_name == this.currentCategory){ 
    //         response = response.data[i];
    //         console.log("header reponse :" +response)
    //         this.userID = response.trainerId;
    //         this.getSize(this.userID);
    //         // this.profilepicUrl = response.im
    //         if (response.profileImage != null) {
    //           this.profilepicUrl = response.profileImage.profileImagePath;
    //         }
    //         // this.profileResponse = response;
    //       }
    //     }
    //     }
    //     }

    //   },
    //   error => {
    //     // alert("An error has occurred while retriving profile data.");
    //   }
    // )
  }
  onFitness(){
    localStorage.setItem("ProfileCategory","Bodybuilder")
    window.location.reload();
  }
  onYoga(){
    localStorage.setItem("ProfileCategory","Yoga")
    window.location.reload();
  }
  onZumba(){
    localStorage.setItem("ProfileCategory","Zumba")
    window.location.reload();
  }

  onMyprofile() {
    // this.getProfile();;
    // this.userName = this.currentUser.username;
    this.router.navigate(['mydata', this.userID]);
  }

  onBusinessDetails() {
    this.router.navigate(['businessdetails', this.userID]);
  }
  logout() {
    localStorage.clear();
    localStorage.removeItem("ProfileCategory");
    localStorage.removeItem("ProfileGender");
    this.profilepicUrl = "assets/images/uploadimg.png";
  }
  onHeader() {
    if (this.router.url.includes('profile') || this.router.url.includes('gender') || this.router.url == '' || this.router.url.includes('login') || this.router.url.includes('register') || this.router.url.includes('privacy')) {

    }
    else if (this.userID == null || this.userID == "") {
      this.router.navigate(['/']);
    }

    else {
      this.router.navigate(['/dashboard']);
    }
  }
  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
      this.router.navigate(['/']);
    } else {
      if (this.loggedIn == true) {
        this.currentEmail = localStorage.getItem('lastAuthUser');
        this.getProfileDataFromServer();
      }
      else {
        // this.currentEmail = this.cognitoUtil.getCurrentUser().getUsername();
        // if(this.currentEmail == undefined || this.currentEmail == '' || this.currentEmail == null || this.currentEmail.includes("Google") || this.currentEmail.includes("google"))
        // {
        //   this.currentEmail = this.cognitoUtil.auth.signInUserSession.idToken.payload.email;
        // }
        
        this.getProfileDataFromServer();
      }
    }
  }
}
