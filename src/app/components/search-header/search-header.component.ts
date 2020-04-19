import { Component, OnInit } from '@angular/core';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {
  totalCommerces = 0;

  constructor(private commmerceService: CommerceService) { }

  ngOnInit(): void {
    this.commmerceService.getTotalRegisteredCommerces()
    .subscribe((data) => {
      this.totalCommerces = data['allowedCommerces']
    })
  }

}
