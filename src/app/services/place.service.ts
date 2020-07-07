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
    "Quito",
    "Guayaquil",
    "Cuenca",
    "Guaranda",
    "Azogues",
    "Tulcán",
    "Riobamba",
    "Latacunga",
    "Machala",
    "Esmeraldas",
    "Puerto Baquerizo Moreno",
    "Ibarra",
    "Loja",
    "Babahoyo",
    "Portoviejo",
    "Macas",
    "Tena",
    "Francisco de Orellana",
    "Puyo",
    "Santa Elena",
    "Santo Domingo",
    "Nueva Loja",
    "Ambato",
    "Zamora",
  ];
  private _allowedCountries = ["Quito", "Guayaquil", "Cuenca", "Sangolquí", "Daule", "Durán", "Chordeleg", "Atarazana", "Salitre", "Samanes", "Loja", "Ibarra"];
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
