import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'app-commerce-registration',
  templateUrl: './commerce-registration.component.html',
  styleUrls: ['./commerce-registration.component.css']
})
export class CommerceRegistrationComponent implements OnInit {
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

  constructor(private commerceService: CommerceService) {}

  ngOnInit() {
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
      location: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
      commerceDescription: new FormControl(null, Validators.required)
    });
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
      location:  {'type': 'Point', 'coordinates': [-78.4877785,-0.2043812]}, // this.registerForm.get('location').value,
      reference: this.registerForm.get('reference').value,
      commerceDescription: this.registerForm.get('commerceDescription').value
    };
    console.log(this.commerce);
    this.commerceService.createNewCommerce(this.commerce)
    .subscribe((data) => {
      console.log('registro exitoso', data);
    }, (err) => {
      console.error(err);
    });

  }
}
