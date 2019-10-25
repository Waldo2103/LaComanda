import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/auth/auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';//Para validar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router, private formBuilder: FormBuilder) { }


  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  submitted = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

  }, {
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {


      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
   }



  OnSubmitLogin() {
    this.submitted = true;
    this.authService.login(this.loginForm.value.email , this.loginForm.value.password).then(res => {
      this.router.navigate(['/home']);
    }).catch(err => {
      var x = document.getElementById("userInvalid");
      x.style.display = "block";
      // Implementar toast
      this.presentToast()
    })
  }


  async presentToast() {
    /*const toast = await this.toastController.create({
      message: 'los datos son incorrectos o no existe el usuario',
      duration: 2000,
      color: "secondary"
    });
    toast.present();*/
    console.log("Error en el ingreso de datos");
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
