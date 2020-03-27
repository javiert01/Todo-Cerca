import { Component, OnInit } from '@angular/core';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'app-commerces',
  templateUrl: './commerces.component.html',
  styleUrls: ['./commerces.component.css']
})
export class CommercesComponent implements OnInit {

  commerceList = [];
  titlesList = [];

  constructor(private commerceService: CommerceService) { }

  ngOnInit(): void {
    this.commerceService.getAllCommerces()
    .subscribe((data) => {
      console.log(data);
      this.commerceList = data;
      if (this.commerceList.length > 0) {
        // tslint:disable-next-line: forin
        for (const key in this.commerceList[0]) {
          this.titlesList.push(key);
        }
      }
    });
  }

}
