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
  constructor(private http: HttpClient) {}

  getCountryList() {
    return  [
      'Quito',
      'Guayaquil',
      'Cuenca',
      'Guaranda',
      'Azogues',
      'Tulcán',
      'Riobamba',
      'Latacunga',
      'Machala',
      'Esmeraldas',
      'Puerto Baquerizo Moreno',
      'Ibarra',
      'Loja',
      'Babahoyo',
      'Portoviejo',
      'Macas',
      'Tena',
      'Francisco de Orellana',
      'Puyo',
      'Santa Elena',
      'Santo Domingo',
      'Nueva Loja',
      'Ambato',
      'Zamora'
    ];

  }

  getAllowedCountryList() {
    return [
      'Quito',
      'Guayaquil',
      'Cuenca',
      'Sangolquí',
      'Daule',
      'Durán',
      'Chordeleg',
      'Atarazana',
      'Salitre',
      'Samanes'
    ];
  }

  getPolygonBoundariesArea() {

  }

  setSelectedCoordinates(lat, lng) {
    this.selectedCoordinates = {lat: lat, lng: lng};
    this.selectedCoordinatesChanged.next(this.selectedCoordinates);
  }
  getSelectedCoordinates() {
    return this.selectedCoordinates;
  }
  getReverseGeocode(lat, lng ) {
    return this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lng}`);
  }

  async getCurrentLocation() {
    if (navigator.geolocation) {
    const promise = await navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('position in service', pos);
        },
        () => {}
      );
      return promise;
    } else {
     return null;
    }
  }
}
