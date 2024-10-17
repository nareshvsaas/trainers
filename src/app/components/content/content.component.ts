import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, Input, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  hideMenu: boolean = false;
  @Input() videoUrl: string = "";
  showVideoPopup: boolean = false;
  cities: Array<string> = [];
  trainersDataLoctn: any[] = [];
  trainersData: any[] = [];
  location: string = 'hyderabad';
  dropdownSettings: any = {};
  closeDropdownSelection = false;
  disabled = false;
  searchTrainer: string = "";
  SelectedCity: string = "";
  showLocDB: boolean = true;
  showOvrDb: boolean = false;
  pagenumber:number = 0;
  pagesize:number = 13;
  notSroclly:boolean = true;
  notEmptyPost:boolean = true;
  modalRef!: BsModalRef;
  @ViewChild('contentVideo') contentVideo: any;

   constructor(public router: Router,private renderer: Renderer2,private httpClient: HttpClient,handler: HttpBackend, private modalService: BsModalService) {
      this.httpClient = new HttpClient(handler);
   }

  ngOnInit() {
    this.cities = ['By Trainer', 'By Location'];
    this.dropdownSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: false,
      closeDropDownOnSelection: this.closeDropdownSelection
    };

    this.getTrainersFromServer();
    this.pagenumber=0;
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'modal-open');
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
    if (isLoggedIn) {
      localStorage.clear();
      localStorage.removeItem("ProfileCategory");
      localStorage.removeItem("ProfileGender");
    }
  }

  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { closeDropDownOnSelection: this.closeDropdownSelection });
  }

  getTrainersFromServer() {
    this.httpClient.get<any>('https://demo.1o1fitness.com/trainerservice/api/trainer/guest?pagesize='+this.pagesize+'&pagenumber=' + this.pagenumber).subscribe({
        next: response => {
          console.log(response);
          this.trainersDataLoctn = [];
          this.showOvrDb = true;
          this.trainersData = response.data;
        },
        error: error => {
          console.log('There is an error while retriving data.');
        }
    })
  }

  openVideo(url: string,template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'modal-dialog-centered' }));
    this.showVideoPopup = !this.showVideoPopup;
    this.videoUrl = url;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closePopup() {
    this.showVideoPopup = !this.showVideoPopup;
    this.renderer.removeClass(document.body, 'modal-open');
  }
  onClickedOutside() {
    this.showVideoPopup = false;
    this.renderer.removeClass(document.body, 'modal-open');
  }
  showMenu() {
    this.hideMenu = !this.hideMenu
  }
 
  modelChanged() {
    if (this.searchTrainer != null || this.searchTrainer != '')
      this.showOvrDb = true;
    this.showLocDB = false;
  }
  onScroll(){
    console.log("scrolled..");
    if(this.notEmptyPost && this.notSroclly){
     this.notSroclly = false;
     this.pagenumber = this.pagenumber + 1;
     this.loadNext();
    }
  }
  loadNext(){
  
  this.httpClient.get<any>('https://demo.1o1fitness.com/trainerservice/api/trainer/guest?pagesize='+this.pagesize+'&pagenumber=' + this.pagenumber).subscribe({
      next: response => {
      if(response.data.length === 0){
        this.notEmptyPost = false;
      }
        this.trainersData = this.trainersData.concat(response.data);
        this.notSroclly = true;
      },
      error: error => {
        console.log('There is an error while retriving data.');
      }
  })
  }
}
