import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string = "YET TO DEVELOP";

  echannelVerification = false;
  echannelVerificationData = false;

  constructor() { }

  ngOnInit(): void {

  }

  echannelVerificationMenu() {
    this.echannelVerification = true;
    this.echannelVerificationData = false;
    console.log('echannelVerificationMenu');
  }


  echannelVerificationDataMenu() {
    this.echannelVerification = false;
    this.echannelVerificationData = true;
    console.log('echannelVerificationMenu data');
  }
}
