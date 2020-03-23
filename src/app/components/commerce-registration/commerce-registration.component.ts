import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommerceService } from 'src/app/services/commerce.service';
import { MapsAPILoader } from '@agm/core';

declare let google: any;

@Component({
  selector: 'app-commerce-registration',
  templateUrl: './commerce-registration.component.html',
  styleUrls: ['./commerce-registration.component.css']
})
export class CommerceRegistrationComponent implements OnInit {
  lat = -0.1840506;
  lng = -78.503374;
  markLat;
  markLng;
  direccion;

  commerceCategories = [
    'Abarrotes',
    'Tienda',
    'Restaurante',
    'Farmacia',
    'Víveres/frutería',
    'Micromercado',
    'Otros'
  ];

  provinces = [
    'Azuay',
    'Bolívar',
    'Cañar',
    'Carchi',
    'Chimborazo',
    'Cotopaxi',
    'El Oro',
    'Esmeraldas',
    'Galápagos',
    'Guayas',
    'Imbabura',
    'Loja',
    'Los Ríos',
    'Manabí',
    'Morona Santiago',
    'Napo',
    'Orellana',
    'Pastaza',
    'Pichincha',
    'Santa Elena',
    'Santo Domingo de los Tsáchilas',
    'Sucumbíos',
    'Tungurahua',
    'Zamora Chinchipe'
  ];

  registerForm: FormGroup;
  commerce;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  constructor(
    private commerceService: CommerceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.markLat = this.lat;
    this.markLng = this.lng;
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.markLat = this.lat;
          this.markLng = this.lng;
        });
      });
    });
    this.registerForm = new FormGroup({
      ownerName: new FormControl(null, Validators.required),
      ownerLastName: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      commerceName: new FormControl(null, Validators.required),
      commerceCategory: new FormControl(null, Validators.required),
      hourOpen: new FormControl(null, Validators.required),
      hourClose: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      lng: new FormControl(this.lng, Validators.required),
      ltd: new FormControl(this.lat, Validators.required),
      reference: new FormControl(null, Validators.required),
      commerceDescription: new FormControl(null, Validators.required)
    });
  }

  setMarker($event) {
    // console.log($event.coords.lat);
    this.markLat = $event.coords.lat;
    this.markLng = $event.coords.lng;
    this.registerForm.get('ltd').setValue(this.markLat);
    this.registerForm.get('lng').setValue(this.markLng);
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
            console.log(this.direccion);
            console.log(result.formatted_address);
            this.direccion = rsltAdrComponent[0].short_name;
          } else {
            alert('No hay dirección disponible en este momento');
          }
        }
      });
    }
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.lat = pos.lat;
          this.lng = pos.lng;
          this.markLat = pos.lat;
          this.markLng = pos.lng;
        },
        () => {}
      );
    } else {
      alert(
        'Tu navegador no soporta geolocalización! Selecciona tu dirección manualmente'
      );
    }
  }

  submitCommerce() {
    this.commerce = {
      ownerName: this.registerForm.get('ownerName').value,
      ownerLastName: this.registerForm.get('ownerLastName').value,
      phone: this.registerForm.get('phone').value,
      commerceName: this.registerForm.get('commerceName').value,
      commerceCategory: this.registerForm.get('commerceCategory').value,
      hourOpen: '09:00', // this.registerForm.get('hourOpen').value,
      hourClose: '23:00', // this.registerForm.get('hourClose').value,
      province: this.registerForm.get('province').value,
      city: this.registerForm.get('city').value,
      neighborhood: 'Floresta', // this.registerForm.get('neighborhood').value,
      address: this.registerForm.get('address').value,
      // tslint:disable-next-line: max-line-length
      location: {
        type: 'Point',
        coordinates: [
          this.registerForm.get('lng').value,
          this.registerForm.get('ltd').value
        ]
      }, // this.registerForm.get('location').value,
      reference: this.registerForm.get('reference').value,
      commerceDescription: this.registerForm.get('commerceDescription').value
    };
    console.log(this.commerce);
    this.commerceService.createNewCommerce(this.commerce).subscribe(
      data => {
        console.log('registro exitoso', data);
      },
      err => {
        console.error(err);
      }
    );
  }
}
