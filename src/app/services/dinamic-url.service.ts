import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DinamicUrlService {
  public urlSubject = new Subject<string>();
  // UNA VEZ QUE SE SETEA EL URL DEL BACKEND A DONDE SE VA A CONECTAR
  // ESTA QUEDA FIJA Y ALAMCENADA EN url_backend_fija
  public url_backend_fija;
  public cities = [];

  constructor() {}

  setUrlFromCountry(country) {
    let url;
    switch (country) {
      case "ecuador":
        url = "https://todo-mas-cerca-1.herokuapp.com";
        this.url_backend_fija = url;
        this.urlSubject.next(url);
        console.log("Set ecuador url");
        break;
      case "mexico":
        url = "https://todo-mas-cerca-1-mx.herokuapp.com";
        this.url_backend_fija = url;
        this.urlSubject.next(url);
        console.log("Set ecuador url");
        break;

      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  }

  setCities(country) {
    switch (country) {
      case "ecuador":
        console.log("Set cities ecuador");
        this.cities = [
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
        break;
      case "mexico":
        console.log("Set cities mexico");
        this.cities = [
          "Aguascalientes",
          "Mexicali",
          "La Paz",
          "San Francisco de Campeche",
          "Chihuahua",
          "Tuxtla Gutiérrez",
          "Saltillo",
          "Colima",
          "Victoria de Durango",
          "Guanajuato",
          "Chilpancingo de los Bravo",
          "Pachuca de Soto",
          "Guadalajara",
          "Toluca de Lerdo",
          "Morelia",
          "Cuernavaca",
          "Tepic",
          "Monterrey",
          "Oaxaca de Juárez",
          "Puebla de Zaragoza",
          "Santiago de Querétaro",
          "Chetumal",
          "San Luis Potosí",
          "Culiacán Rosales",
          "Hermosillo",
          "Villahermosa",
          "Ciudad Victoria",
          "Tlaxcala de Xicohténcatl",
          "Xalapa-Enríquez",
          "Mérida",
          "Zacatecas",
        ];
        break;
    }
  }
}
