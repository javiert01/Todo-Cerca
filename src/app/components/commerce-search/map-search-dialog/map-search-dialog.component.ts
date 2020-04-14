import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MapsAPILoader } from '@agm/core';
import { CommerceService } from 'src/app/services/commerce.service';

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
  category;

  constructor(
    private dialogRef: MatDialogRef<MapSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data, private commerceService: CommerceService
  ) {
    this.lat = data.lat;
    this.lng = data.lng;
    this.markLat = this.lat;
    this.markLng = this.lng;
    this.category = data.category;
  }

  ngOnInit(): void {

  }


  setMarker($event) {
    this.markLat = $event.coords.lat;
    this.markLng = $event.coords.lng;
    this.lat = this.markLat;
    this.lng = this.markLng;
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

  onSearchCommerce() {
    this.commerceService.getNearestCommerces(this.lng, this.lat, this.category, 1)
    .subscribe((data) => {
      this.commerceService.setCommerceResultList(data['commercesPaginated']);
      console.log('commerces obtained', data);
      this.dialogRef.close('ok');
    });
  }

  close() {
    this.dialogRef.close();
  }
}
