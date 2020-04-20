import { Component, OnInit } from '@angular/core';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalCommerces = 0;

  constructor(private commmerceService: CommerceService) { }

  ngOnInit(): void {
    this.commmerceService.getTotalRegisteredCommerces()
    .subscribe((data) => {
      this.totalCommerces = data['allowedCommerces']
    })
  }

}
