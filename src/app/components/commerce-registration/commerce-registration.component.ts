import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommerceService } from 'src/app/services/commerce.service';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

declare let google: any;

@Component({
  selector: 'app-commerce-registration',
  templateUrl: './commerce-registration.component.html',
  styleUrls: ['./commerce-registration.component.css']
})
export class CommerceRegistrationComponent implements OnInit {
  // INICO PARA SUBIR LA IMAGEN
  imagenSubida = false;
  imagenSeleccionada = false;
  reciboURL: any;
  selectedFile: File;
  urlImgEmpleado: any;
  logoTemporal = '';
  mapZoom = 18;
  // FIN DE VARIABLES PARA SUBIR IMAMGEN
  // INICIO VARAIBLES PREVIEW IMAGEN
  public imagePath;
  imgURL: any;
  public message: string;
  // FIN VARAIBLES PREVIEW IMAGEN
  lat = -0.1840506;
  lng = -78.503374;
  markLat;
  markLng;
  direccion;
  commerceCategories = [];
  invalidControls = [];
  isMobileView;
  frecuencyOptions = [
    'Lunes a Viernes',
    'Lunes a Sábado',
    'Solo fines de semana',
    'Todos los días'
  ];

  cities = ['Quito', 'Guayaquil'];

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
  scrollToForm = '';

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  constructor(
    private commerceService: CommerceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.loadCategoryData();
  }

  loadCategoryData() {
    this.categoryService.getCategoryList().subscribe((data: any) => {
      this.commerceCategories = data;
    });
  }
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.scrollToForm = params.formulario;
        if (this.scrollToForm === 'true') {
          const newWindowWidth = window.innerWidth;
            if ( newWindowWidth > 600) {
              this.isMobileView = false;
            } else {
              this.isMobileView = true;
            }
          if (this.isMobileView) {
            window.scrollTo(0, 6000);
          } else {
            window.scrollTo(0, 4400);
          }
      }});
    this.imgURL =
      '../../../assets/06-no-image.png';
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
      autocomplete.setComponentRestrictions({
        country: ['ec']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.mapZoom = 18;
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.markLat = this.lat;
          this.markLng = this.lng;
          this.registerForm.get('ltd').setValue(this.markLat);
          this.registerForm.get('lng').setValue(this.markLng);
          this.getAddress(this.lat, this.lng);
        });
      });
    });

    this.registerForm = new FormGroup({
      ownerName: new FormControl(null, Validators.required),
      ownerLastName: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp('^[0-9]*$')),
        Validators.minLength(10)
      ]),
      commerceName: new FormControl(null, Validators.required),
      category: new FormControl('', Validators.required),
      frecuency: new FormControl('', Validators.required),
      hourOpen: new FormControl(null, [
        Validators.required,
        this.onCheckLesserTime.bind(this)
      ]),
      hourClose: new FormControl(null, [
        Validators.required,
        this.onCheckGreaterTime.bind(this)
      ]),
      city: new FormControl('', Validators.required),
      /* province: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required), */
      address: new FormControl(null, Validators.required),
      lng: new FormControl(null),
      ltd: new FormControl(null),
      reference: new FormControl(null, Validators.required),
      commerceDescription: new FormControl(null, Validators.required)
    });

    if (this.commerceService.commerceFormData) {
      this.registerForm.reset(this.commerceService.commerceFormData);
      this.lat = this.registerForm.get('ltd').value;
      this.lng = this.registerForm.get('lng').value;
      this.markLat = this.lat;
      this.markLng = this.lng;
    }

    this.registerForm.get('phone').valueChanges.subscribe(data => {
      if (data.length > 10) {
        this.cdRef.detectChanges();
        this.registerForm.get('phone').setValue(data.substring(0, 10));
      }
    });

    this.registerForm.valueChanges.subscribe(data => {
      this.findInvalidControls();
      this.translateControls(this.invalidControls);
    });
  }

  findInvalidControls() {
    const controls = this.registerForm.controls;
    this.invalidControls = [];
    for (const name in controls) {
      if (controls[name].invalid) {
        this.invalidControls.push(name);
      }
    }
  }

  translateControls(controls) {
    for (let i = 0; i < controls.length; i++) {
      switch (controls[i]) {
        case 'ownerName':
          controls[i] = 'Nombre';
          break;
        case 'ownerLastName':
          controls[i] = 'Apellido';
          break;
        case 'phone':
          controls[i] = 'Télefono Celular';
          break;
        case 'commerceName':
          controls[i] = 'Nombre del comercio';
          break;
        case 'category':
          controls[i] = 'Categoría';
          break;
        case 'frecuency':
          controls[i] = 'Días de apertura';
          break;
        case 'hourOpen':
          controls[i] = 'Horario de apertura';
          break;
        case 'hourClose':
          controls[i] = 'Horario de cierre';
          break;
        case 'city':
          controls[i] = 'Ciudad';
          break;
        case 'address':
          controls[i] = 'Dirección exacta';
          break;
        case 'reference':
          controls[i] = 'Referencia';
          break;
        case 'commerceDescription':
          controls[i] = 'Breve descripción';
          break;
      }
    }
  }

  onCapitalizeLetter(data, formCN) {
    if (data) {
      if (data.length > 0) {
        let newString = '';
        newString = data.toLowerCase();
        newString = newString[0].toUpperCase() + newString.substring(1);
        this.registerForm.get(formCN).setValue(newString);
      }
    }
  }

  onCheckGreaterTime(control: FormControl): { [s: string]: boolean } {
    const hourCloseDate = new Date(control.value);
    if (this.registerForm) {
      const hourOpenDate = new Date(this.registerForm.get('hourOpen').value);
      if (hourCloseDate < hourOpenDate) {
        return { hourGreatError: true };
      }
    }
    return null;
  }

  onCheckLesserTime(control: FormControl): { [s: string]: boolean } {
    const hourOpenDate = new Date(control.value);
    if (this.registerForm) {
      if (this.registerForm.get('hourClose').value) {
        const hourCloseDate = new Date(
          this.registerForm.get('hourClose').value
        );
        if (hourOpenDate >= hourCloseDate) {
          return { hourLessError: true };
        }
      }
    }
    return null;
  }

  onSetCityMap(city) {
    console.log('changing city', city);
    const geocoder = new google.maps.Geocoder();
    const self = this;
    geocoder.geocode(
      {
        address: city
      },
      function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          self.lat = results[0].geometry.location.lat();
          self.lng = results[0].geometry.location.lng();
          self.markLat = results[0].geometry.location.lat();
          self.markLng = results[0].geometry.location.lng();
          self.registerForm.get('ltd').setValue(self.markLat);
          self.registerForm.get('lng').setValue(self.markLng);
          self.mapZoom = 11;
          console.log(self.lat);
          self.cdRef.detectChanges();
        } else {
          alert('Something got wrong ' + status);
        }
      }
    );
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
            this.direccion = result.formatted_address;
            this.registerForm.get('address').setValue(this.direccion);
            // console.log(result.formatted_address);
            /* this.direccion = rsltAdrComponent[0].short_name;
            console.log(this.direccion); */
          } else {
            alert(
              'No hay dirección disponible en este momento, llenela manualmente'
            );
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
          this.mapZoom = 18;
          this.lat = pos.lat;
          this.lng = pos.lng;
          this.markLat = pos.lat;
          this.markLng = pos.lng;
          this.registerForm.get('ltd').setValue(this.markLat);
          this.registerForm.get('lng').setValue(this.markLng);
          this.getAddress(this.lat, this.lng);
        },
        () => {}
      );
    } else {
      alert(
        'Tu navegador no soporta geolocalización! Selecciona tu dirección manualmente'
      );
    }
  }

  parseHour(hour) {
    let hourString = hour.toString();

    if (hour < 10) {
      hourString = '0' + hour.toString();
    }
    return hourString;
  }

  submitCommerce() {
    const hourOpenParse = new Date(this.registerForm.get('hourOpen').value);
    const hourCloseParse = new Date(this.registerForm.get('hourClose').value);
    this.commerce = {
      ownerName: this.registerForm.get('ownerName').value,
      ownerLastName: this.registerForm.get('ownerLastName').value,
      phone: this.registerForm.get('phone').value,
      commerceName: this.registerForm.get('commerceName').value,
      category: this.registerForm.get('category').value,
      commercePhoto: this.imgURL,
      frequency: this.registerForm.get('frecuency').value,
      hourOpen:
        this.parseHour(hourOpenParse.getHours()) +
        ':' +
        this.parseHour(hourOpenParse.getMinutes()),
      hourClose:
        this.parseHour(hourCloseParse.getHours()) +
        ':' +
        this.parseHour(hourCloseParse.getMinutes()),
      city: this.registerForm.get('city').value,
      address: this.registerForm.get('address').value,
      location: {
        type: 'Point',
        coordinates: [
          this.registerForm.get('lng').value,
          this.registerForm.get('ltd').value
        ]
      },
      reference: this.registerForm.get('reference').value,
      commerceDescription: this.registerForm.get('commerceDescription').value
    };
    this.commerceService.setCommerceFormData(this.registerForm.value);
    this.commerceService.setCommerce(this.commerce);

    console.log(this.commerce);
    this.router.navigate(['/verificar']);
  }

  onFileChangedRecibo(event) {
    // console.log("Cambio de valor en el bolean: ", this.imagenSubida);
    this.imagenSubida = true;
    // console.log("Cambio de valor en el bolean 2: ", this.imagenSubida);
    this.selectedFile = event.target.files[0];
    this.imagenSeleccionada = true;
    // console.log("OnFileChanged", this.selectedFile);
    if (event.target.files.length === 0) {
      this.imagenSeleccionada = false;
      this.imgURL =
        '../../../assets/06-no-image.png';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Solo se permite subir imágenes!';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = _event => {
      console.log('Entra al cambio de reviboUrl: ', this.reciboURL);
      this.reciboURL = reader.result.toString();
    };
  }
  // INICIO GET-SIGNED-REQUEST METODO QUE SE LLAMA DESDE EL BOTON OPERAR
  getSignedRequest2(commerceName) {
    // console.log("El archivo selecionado: ", this.selectedFile);
    const file = {
      fName_p: 'commerce/' + commerceName + '/' + this.selectedFile.name,
      fType_p: this.selectedFile.type
    };

    // LLAMAMOS A HEROKU PARA QUE FIRME LA PETICION
    return this.http.get<any>(
      'https://todo-mas-cerca.herokuapp.com/image/upload?fName_p=' +
        file.fName_p +
        '&fType_p=' +
        file.fType_p
    );
  }
  // FIN GET-SIGNED-REQUEST PARA EL BOTON OPERAR
  // INICIO UPLOAD2 PARA LLAMAR DESDE EL METODO OPERAR
  onUpload2(file, signedRequest, url) {
    this.http.put(signedRequest, file).subscribe(data => {
      // this.empresa.logo = url;
      this.imgURL = url;
      this.submitCommerce();
    });
  }
  // FIN UPLOAD2 PARA LLAMAR DESDE EL METODO OPERAR
  operar(name: String) {
    name = name.replace(/\s/g, '');
    if (this.imagenSubida) {
      // console.log("Operar -> Se crea la imagen - creando");
      // SI CARGA IMAGEN
      // INICIO-SI-SUBE-IMAGEN
      // console.log("Empresa Nueva: ", this.empresa);
      this.getSignedRequest2(name).subscribe(data => {
        // INICIO SE LLAMA AL METODO UPLOAD
        this.onUpload2(this.selectedFile, data.signedRequest, data.url);
        // FIN SE LLAMA AL METODO UPLOAD
        // console.log(data.url);
      });
      // FIN-SI-SUBE-IMAGEN
    }
  }
}
