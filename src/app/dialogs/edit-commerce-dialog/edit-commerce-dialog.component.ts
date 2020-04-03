import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommerceService } from 'src/app/services/commerce.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-commerce-dialog',
  templateUrl: './edit-commerce-dialog.component.html',
  styleUrls: ['./edit-commerce-dialog.component.css']
})
export class EditCommerceDialogComponent implements OnInit {
  imagenSubida = false;
  imagenSeleccionada = false;
  reciboURL: any;
  selectedFile: File;
  urlImgEmpleado: any;
  logoTemporal = '';
  // FIN DE VARIABLES PARA SUBIR IMAMGEN
  // INICIO VARAIBLES PREVIEW IMAGEN
  public imagePath;
  imgURL: any;
  public message: string;
  // FIN VARAIBLES PREVIEW IMAGEN
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

  cities = [
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

  editForm: FormGroup;
  commerce;
  commerces = [];
  scrollToForm = '';

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  constructor(
    private commerceService: CommerceService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<EditCommerceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private categoryService: CategoryService,
  ) {
    this.commerces = data.commerces;
    console.log(data.commerces);
    this.loadCategoryData();
  }

  loadCategoryData() {
    this.categoryService.getCategoryList().subscribe((data: any) => {
      console.log(data);
      this.commerceCategories = data;
    });
  }
  ngOnInit() {
    this.commerceService.getCommerceByID(this.commerces)
    .subscribe((data) => {
      data = data[0];
      console.log(data);
      this.imgURL = data['commercePhoto'];
      this.reciboURL = this.imgURL;
      this.editForm = new FormGroup({
        ownerName: new FormControl(data['ownerName'], Validators.required),
        ownerLastName: new FormControl(data['ownerLastName'], Validators.required),
        phone: new FormControl(data['phone'], [
          Validators.required,
          Validators.pattern(new RegExp('^[0-9]*$')),
          Validators.minLength(10)
        ]),
        commerceName: new FormControl(data['commerceName'], Validators.required),
        category: new FormControl(data['category'].id, Validators.required),
        frecuency: new FormControl(data['frequency'], Validators.required),
        hourOpen: new FormControl(data['hourOpen'], [
          Validators.required,
          this.onCheckLesserTime.bind(this)
        ]),
        hourClose: new FormControl(data['hourClose'], [
          Validators.required,
          this.onCheckGreaterTime.bind(this)
        ]),
        city: new FormControl(data['city'], Validators.required),
        address: new FormControl(data['address'], Validators.required),
        reference: new FormControl(data['reference'], Validators.required),
        commerceDescription: new FormControl(data['commerceDescription'], [
          Validators.required,
          Validators.maxLength(90)
        ]),
        ownerEmail: new FormControl(data['ownerEmail'], [
          Validators.required,
          Validators.email
        ]),
      });
    })

  }

  findInvalidControls() {
    const controls = this.editForm.controls;
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
        case 'useConditions':
          controls[i] = 'Políticas de uso';
          break;
        case 'ownerEmail':
          controls[i] = 'Correo electrónico';
      }
    }
  }



  onCapitalizeLetter(data, formCN) {
    if (data) {
      if (data.length > 0) {
        let newString = '';
        newString = data.toLowerCase();
        newString = newString[0].toUpperCase() + newString.substring(1);
        this.editForm.get(formCN).setValue(newString);
      }
    }
  }


  onCheckGreaterTime(control: FormControl): { [s: string]: boolean } {
    if(this.editForm){
      if (control.value && this.editForm.get('hourOpen').value) {
        if (
          this.minutesOfDay(control.value) <
          this.minutesOfDay(this.editForm.get('hourOpen').value)
        ) {
          return { hourGreatError: true };
        }
      }
      return null;
    }
    return null;

  }

  onCheckLesserTime(control: FormControl): { [s: string]: boolean } {
    if(this.editForm) {
      if (control.value && this.editForm.get('hourClose').value) {
        if (
          this.minutesOfDay(control.value) >
          this.minutesOfDay(this.editForm.get('hourClose').value)
        ) {
          return { hourLessError: true };
        }
      }
      return null;
    }
    return null;

  }

  minutesOfDay(m) {
    m = this.convertTime12to24(m);
    const hourMinutesClose = m.split(':');
    const hours = Number(hourMinutesClose[0]);
    const minutes = Number(hourMinutesClose[1]);
    return minutes + hours * 60;
  }

  convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }


  parseHour(hour) {
    let hourString = hour.toString();

    if (hour < 10) {
      hourString = '0' + hour.toString();
    }
    return hourString;
  }

  submitCommerce() {
    this.commerce = {
      ownerName: this.editForm.get('ownerName').value,
      ownerLastName: this.editForm.get('ownerLastName').value,
      phone: this.editForm.get('phone').value,
      commerceName: this.editForm.get('commerceName').value,
      category: this.editForm.get('category').value,
      commercePhoto: this.imgURL,
      frequency: this.editForm.get('frecuency').value,
      hourOpen: this.editForm.get('hourOpen').value,
      hourClose: this.editForm.get('hourClose').value,
      city: this.editForm.get('city').value,
      address: this.editForm.get('address').value,
      reference: this.editForm.get('reference').value,
      commerceDescription: this.editForm.get('commerceDescription').value,
      ownerEmail: this.editForm.get('ownerEmail').value,
    };
    console.log('form', this.editForm);
    this.commerceService.updateCommerce(this.commerces, this.commerce)
    .subscribe((data) => {
      this.dialogRef.close('edit');
    })
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
      this.imgURL = '../../../assets/06-no-image.png';
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
      'https://todo-mas-cerca-1.herokuapp.com/image/upload?fName_p=' +
        file.fName_p +
        '&fType_p=' +
        file.fType_p
    );
  }
  // FIN GET-SIGNED-REQUEST PARA EL BOTON OPERAR
  // INICIO UPLOAD2 PARA LLAMAR DESDE EL METODO OPERAR
  onUpload2(file, signedRequest, url) {
    console.log('signed request', signedRequest);
    this.http.put(signedRequest, file).subscribe((data) => {
      // this.empresa.logo = url;
      this.imgURL = url;
      this.submitCommerce();
    }, (err)=> {
      console.log('error en put', err);
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

  close() {
    this.dialogRef.close();
  }
}
