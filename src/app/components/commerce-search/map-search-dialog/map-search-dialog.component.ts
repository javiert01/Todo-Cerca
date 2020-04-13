import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MapsAPILoader } from '@agm/core';

declare let google: any;

@Component({
  selector: "app-map-search-dialog",
  templateUrl: "./map-search-dialog.component.html",
  styleUrls: ["./map-search-dialog.component.css"],
})
export class MapSearchDialogComponent implements OnInit {

  mapZoom = 18;
  lat = -0.1840506;
  lng = -78.503374;
  markLat;
  markLng;

  constructor(
    private dialogRef: MatDialogRef<MapSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private mapsAPILoader: MapsAPILoader,
  ) {}

  ngOnInit(): void {}


  setMarker($event) {
    // console.log($event.coords.lat);
    this.markLat = $event.coords.lat;
    this.markLng = $event.coords.lng;
/*     this.registerForm.get('ltd').setValue(this.markLat);
    this.registerForm.get('lng').setValue(this.markLng); */
  }

  getAddress(lat: number, lng: number) {
    console.log('Finding Address');
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          const rsltAdrComponent = result.address_components;
          const resultLength = rsltAdrComponent.length;
          if (result != null) {
            /* this.direccion = result.formatted_address;
            this.registerForm.get('address').setValue(this.direccion); */
          } else {
            alert(
              'No hay dirección disponible en este momento, llenela manualmente'
            );
          }
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
