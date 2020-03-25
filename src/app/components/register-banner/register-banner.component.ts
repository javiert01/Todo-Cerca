import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-banner',
  templateUrl: './register-banner.component.html',
  styleUrls: ['./register-banner.component.css']
})
export class RegisterBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToForm() {
    window.scrollTo(0, 3200);
  }

}
