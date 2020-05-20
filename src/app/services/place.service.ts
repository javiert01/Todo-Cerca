import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PlaceService {
  url = `${HOST}/categories`;
  selectedCoordinates ;
  selectedCoordinatesChanged = new Subject<any>();
  constructor() {}

  getCountryList() {
    return  [
      'Guadalajara',
      'Zapopan'
    ];

  }

  getAllowedCountryList() {
    return [
     'Guadalajara',
     'Zapopan'
    ];
  }

  setSelectedCoordinates(lat, lng) {
    this.selectedCoordinates = {lat: lat, lng: lng};
    this.selectedCoordinatesChanged.next(this.selectedCoordinates);
  }
  getSelectedCoordinates() {
    return this.selectedCoordinates;
  }
}
