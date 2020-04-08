import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {


  loginForm: FormGroup;
  loginUserData = {
    userName: '',
    pass: '',
  };
  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSignIn() {
    this.loginUserData = {
      userName: this.loginForm.get('username').value,
      pass: this.loginForm.get('password').value
    };

    this._auth.usuarioLogin(this.loginUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.role);
        this._router.navigate(['/inicio-admin']);
      },
      err => {
        alert('Credenciales inválidas, vuelva a intentarlo');
      }
    );
  }

}
