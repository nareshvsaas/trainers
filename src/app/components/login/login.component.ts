import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export class profile {
  trainerUserName: any;
  trainerId: any;
  profileStatus: any;
  registraionType: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Google Var
  public auth2: any;

  email: string = "";
  password: string = "";
  errorMessage: string = "";
  mfaStep = false;
  mfaData = {
    destination: '',
    callback: null
  };
  // cognito auth tokens
  authData: any;
  auth: any;
  session: any;

  show: boolean;
  showEye: boolean;
  showSplash: boolean;
  title: string ="";
  closeBtnName: string="";
  userId: string="";
  userName: string="";
  currentUserPic: any;
  logedInType: string="";
  profile: profile = new profile;
  profileResponse: any;
  profileStatus: string ="";
  profileCategory: string="";
  profileGender: string="";
  profileRegistration: string="";

  public parameters: Array<Parameters> = [];

  cat : any;

  loaderHide: boolean = false;
  constructor(private db_service: DbService,
    public router: Router,
    private toastr: ToastrService
  ) {
      this.show = false;
      this.showEye = false;
      this.showSplash = true;
  }


  ngOnInit() {
    this.profile = new profile();
    this.errorMessage = "";
    
  }

  onLogin() {
    if (this.email == null || this.email === '' || this.password == null || this.password === '') {
      this.toastr.error('', 'Mandatory fields are required', {
        timeOut: 5000,
        extendedTimeOut: 1000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: true
      });
    } else {
      this.loaderHide = !this.loaderHide;
      localStorage.clear();
      // this.userService.authenticate(this.email, this.password, this);
      // this.getProfileDataFromServer();
    }
  }
  

  showPassword() {
    this.show = !this.show;
    this.showEye = !this.showEye;
    this.showSplash = !this.showSplash;
  }


  getProfileDataFromServer() {
    // var index = '/profile/category/';
    // this.db_service.getDataFromServer(this.email, index).subscribe(
    //   response => {
    //     // console.log('Data Retrived succesfully.', response);
    //     var responceSample = response;
    //     response = response.data[0];
    //     this.userId = response.trainerId;
    //     this.userName = response.trainerUserName;
    //     this.currentUserPic = response.profileImage["profileImagePath"];
    //     this.logedInType = response.registraionType;
    //     this.profileResponse = response;
    //     this.profileStatus = response.profileStatus;
    //     this.profileRegistration = response.registraionType;
        
    //     this.cat = [];
    //     for(var i = 0 ; i < responceSample.data.length ; i++){
    //           this.cat.push(responceSample.data[i]["category"][0]);
    //     }
    //     localStorage.setItem("userCategory",JSON.stringify(this.cat));
    //     for (let i = 0; i < this.cat.length; i++) {
    //       if (this.cat[i]["primary"] == true) {
    //         this.profileCategory = this.cat[i]["category_name"];
    //       }
    //     }
    //     // this.profileCategory = response.category;
    //     this.profileGender = response.gender;
    //     // this.Status = response.profileStatus;
    //     if (this.profileStatus == "created") {
    //       // this.getProfileDataFromServer();
    //       this.router.navigate(['gender', this.email, this.userId]);
    //     } else {
    //       this.userService.broadcastLoginChange(this.userId, this.currentUserPic, this.logedInType);
    //       this.userService.broadcastUserCategories(JSON.stringify(this.cat));
    //       localStorage.setItem("ProfileCategory", this.profileCategory);
    //       localStorage.setItem("ProfileGender", this.profileGender);
    //       this.router.navigate(['dashboard']);
    //     }
    //   },
    //   (error: any) => {
    //     this.toastr.error('', "An error has occurred while retriving profile data.", {
    //       timeOut: 5000,
    //       extendedTimeOut: 1000,
    //       positionClass: 'toast-top-right',
    //       progressBar: true,
    //       progressAnimation: 'increasing',
    //       tapToDismiss: true
    //     });
    //     // alert();
    //   }
    // )
  }

  cognitoCallback(message: string, result: any) {
    //console.log("login Result" + result);
    if (message != null) { //error
      this.errorMessage = message;
      
      this.loaderHide = !this.loaderHide;
      this.toastr.error('', message, {
        timeOut: 5000,
        extendedTimeOut: 1000,
        positionClass: 'toast-top-right',
        progressBar: true,
        progressAnimation: 'increasing',
        tapToDismiss: true
      });
      if (this.errorMessage === 'User is not confirmed.') {
        // console.log("redirecting");
        this.loaderHide = !this.loaderHide;
        this.router.navigate(['confirm', this.email]);
      } else if (this.errorMessage === 'User needs to set password.') {
        // console.log("redirecting to set new password");
      }
    }
    else {
      this.loaderHide = !this.loaderHide;
      let id = result.accessToken.payload.sub;
      this.userId = result.accessToken.payload.sub;
      // var index = '/profile/category/';
      // this.db_service.getDataFromServer(this.email, index).subscribe(
      //   response => {
      //     //console.log('Data Retrived succesfully.', response);
      //     var responceSample = response;
      //     response = response.data[0];

      //     if (response == undefined || response == null) {
      //       this.logedInType = "Cognito";
      //       this.userService.broadcastLoginChange(this.userId, this.currentUserPic, this.logedInType)
      //       this.userService.broadcastUserCategories(JSON.stringify(this.cat));
      //       this.router.navigate(['gender', this.email, this.userId]);
      //     }
      //     else if (response.profileStatus == undefined) {
      //       this.logedInType = "Cognito";
      //       this.userService.broadcastLoginChange(this.userId, this.currentUserPic, this.logedInType)
      //       this.userService.broadcastUserCategories(JSON.stringify(this.cat));
      //       this.router.navigate(['gender', this.email, this.userId]);
      //     }
      //     else {
      //       this.userId = response.trainerId;
      //       this.userName = response.trainerUserName;
      //       this.currentUserPic = response.profileImage["profileImagePath"];
      //       this.logedInType = response.registraionType;
      //       this.profileResponse = response;
      //       this.profileStatus = response.profileStatus;
      //       this.profileRegistration = response.registraionType;
           
      //       this.cat = [];
      //       for(var i = 0 ; i < responceSample.data.length ; i++){
      //             this.cat.push(responceSample.data[i]["category"][0]);
      //       }
      //       localStorage.setItem("userCategory",JSON.stringify(this.cat));
      //       for (let i = 0; i < this.cat.length; i++) {
      //         if (this.cat[i]["primary"] == true) {
      //           this.profileCategory = this.cat[i]["category_name"];
      //         }
      //       }
      //       this.profileGender = response.gender;
      //       this.logedInType = "Cognito";
      //       this.userService.broadcastLoginChange(this.userId, this.currentUserPic, this.logedInType)
      //       this.userService.broadcastUserCategories(JSON.stringify(this.cat));
      //       localStorage.setItem("ProfileCategory", this.profileCategory)
      //       localStorage.setItem("ProfileGender", this.profileGender)
      //       this.router.navigate(['dashboard']);
      //     }

         
      //   },
      //   (error: any) => {
      //     this.toastr.error('', "An error has occurred while retriving profile data.", {
      //       timeOut: 5000,
      //       extendedTimeOut: 1000,
      //       positionClass: 'toast-top-right',
      //       progressBar: true,
      //       progressAnimation: 'increasing',
      //       tapToDismiss: true
      //     });
      //     // alert();
      //   }
      // )
      // this.getProfile();



    }
  }



  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
     
    }
  }


  cancelMFA(): boolean {
    this.mfaStep = false;
    return false;   //necessary to prevent href navigation
  }
  

  initCognitoSDK() {
    // const authData = {
    //   ClientId: environment.clientId,
    //   AppWebDomain: environment.cognito_domain_name,
    //   TokenScopesArray: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    //   // RedirectUriSignIn: 'http://localhost:4200/login',
    //   // RedirectUriSignIn: 'https://dev.1o1.cloudns.asia/Trainers/login',
    //   RedirectUriSignIn: 'https://demo.1o1fitness.com/Trainers/login',
    //   // RedirectUriSignIn: 'https://uat.1o1fitness.com/Trainers/login',
    //   // RedirectUriSignIn: 'https://1o1fitness.com/Trainers/login',
    //   UserPoolId: environment.userPoolId,
    //   // RedirectUriSignOut: 'http://localhost:4200',
    //   // RedirectUriSignOut: 'https://dev.1o1.cloudns.asia/Trainers/',
    //   RedirectUriSignOut: 'https://demo.1o1fitness.com/Trainers/',
    //   // RedirectUriSignOut: 'https://uat.1o1fitness.com/Trainers/',
    //   // RedirectUriSignOut: 'https://1o1fitness.com/Trainers/',
    //   AdvancedSecurityDataCollectionFlag: false,
    //   IdentityProvider : 'Google', // e.g. 'Facebook',
    // //   ResponseType: 'code',
    // };

    // const auth = new CognitoAuth(authData);

    // auth.userhandler = {
    //   onSuccess: (result) => {
    //     // alert('Sign in success');
    //     console.log("sucess" +result);
    //     this.showSignedIn(result);
    //     this.ngOnInit();
    //   },
    //   onFailure: (err) => {
    //     // alert('Sign in failed');
    //     console.log("Sign in failed" +err);
    //   }
    // };
    // auth.useCodeGrantFlow();
    // return auth;
  }

  loginGoogle() {
    this.auth.getSession();
    this.ngOnInit();
  }

  showSignedIn(session: any) {
    // console.log('Session: ', session);
    // this.awsService.signedIn(session);
    // this.email = session.idToken.payload.email;
    // this.userId = session.idToken.payload.sub;
    // console.log("google email is " + this.email);
    // if (this.email != null || this.email != undefined) {
    //   var index = '/profile/category/';
    //   this.db_service.getDataFromServer(this.email, index).subscribe(
    //     response => {
    //       console.log('Date Retrived succesfully.', response);
    //       var responceSample = response;
    //       response = response.data[0];
    //       // responceSAmple = respo
    //       if (response == undefined || response == null) {
    //         this.logedInType = "Google";
    //         this.userService.broadcastLoginChange(this.userId, this.currentUserPic, this.logedInType)
    //         this.userService.broadcastUserCategories(JSON.stringify(this.cat));

    //         this.router.navigate(['gender', this.email, this.userId]);
    //       }
    //       else if (response.registraionType == "Cognito" && response.trainerUserName == this.email) {
    //         this.toastr.error('', "User already registered", {
    //           timeOut: 5000,
    //           extendedTimeOut: 1000,
    //           positionClass: 'toast-top-right',
    //           progressBar: true,
    //           progressAnimation: 'increasing',
    //           tapToDismiss: true
    //         });
    //         this.auth.signOut();
    //       }
    //       else {
    //         this.userId = response.trainerId;
    //         this.userName = response.trainerUserName;
    //         this.currentUserPic = response.profileImage["profileImagePath"];
    //         this.logedInType = response.registraionType;
    //         this.profileResponse = response;
    //         this.profileStatus = response.profileStatus;
    //         this.profileRegistration = response.registraionType;
           
    //         this.cat = [];
    //         for(var i = 0 ; i < responceSample.data.length ; i++){
    //               this.cat.push(responceSample.data[i]["category"][0]);
    //         }
    //         localStorage.setItem("userCategory",JSON.stringify(this.cat));
    //         // this.profileCategory = response.category;
    //         this.profileGender = response.gender;
    //         for (let i = 0; i < this.cat.length; i++) {
    //           if (this.cat[i]["primary"] == true) {
    //             this.profileCategory = this.cat[i]["category_name"];
    //           }
    //         }
           
    //         this.logedInType = "Google";
    //         this.userService.broadcastLoginChange(this.userId, this.currentUserPic, this.logedInType)
    //         this.userService.broadcastUserCategories(JSON.stringify(this.cat));
    //         localStorage.setItem("ProfileCategory", this.profileCategory)
    //         localStorage.setItem("ProfileGender", this.profileGender)
    //         this.router.navigate(['dashboard']);
    //       }
    //     },
    //     (error: any) => {
    //       this.toastr.error('', "An error has occurred while retriving profile data.", {
    //         timeOut: 5000,
    //         extendedTimeOut: 1000,
    //         positionClass: 'toast-top-right',
    //         progressBar: true,
    //         progressAnimation: 'increasing',
    //         tapToDismiss: true
    //       });
    //       // alert();
    //     }
    //   )
    // }
  }


  profileCategories :any ;
  getProfileCategories(){
    // var index = "/profile/category/"
    // this.db_service.getDataFromServer(this.userId,index).subscribe(response =>{
    //   this.profileCategories = [];
    //   for(var i = 0 ; i < response.data.length ; i++){
    //         this.profileCategories.push(response.data[i]["category"][0]);
    //   }
    //   console.log(this.profileCategories);
    // })
  }


}




export class Parameters {
  name: any;
  value: any;
}


