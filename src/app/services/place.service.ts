import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PlaceService {
  url = `${HOST}/categories`;
  constructor() {}

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
}
