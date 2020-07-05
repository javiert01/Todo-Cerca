import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

export interface LocalCoordinates {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: "root",
})
export class PlaceService {
  private _selectedCoordinates: LocalCoordinates;
  private _cities = [
    'Guadalajara',
    'Zapopan',
  ];
  private _allowedCountries = ['Guadalajara', 'Zapopan'];
  constructor() {}

  getCities(): string[] {
    return this._cities;
  }

  getAllowedCountries(): string[] {
    return this._allowedCountries;
  }

  setSelectedCoordinates(lat: number, lng: number) {
    this._selectedCoordinates = { lat, lng };
  }

  getSelectedCoordinates(): Observable<LocalCoordinates> {
    return of(this._selectedCoordinates);
  }
}
