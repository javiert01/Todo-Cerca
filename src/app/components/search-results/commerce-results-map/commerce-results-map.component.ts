import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/services/place.service';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'app-commerce-results-map',
  templateUrl: './commerce-results-map.component.html',
  styleUrls: ['./commerce-results-map.component.css']
})
export class CommerceResultsMapComponent implements OnInit {

  initialCoordinates;
  commerceCoordinates = [];

  constructor(private placeService: PlaceService, private commerceService: CommerceService) {
   }

  ngOnInit(): void {
    this.initialCoordinates = this.placeService.getSelectedCoordinates();
    console.log(this.initialCoordinates);
    this.commerceService.commerceResultListChanged
    .subscribe((data) => {
      this.commerceCoordinates = data;
    });
    this.commerceCoordinates = this.commerceService.getCommerceResultList();
    console.log(this.commerceCoordinates);
  }

}
