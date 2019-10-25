import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';//Para validar
import { finalize } from "rxjs/operators";

//import { storage } from 'firebase';
declare var $: any;
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(public authService: AuthService, 
    public router: Router, 
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) { }


  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    confirm: new FormControl(),
    foto: new FormControl(),
  });

  submitted = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
      foto: ['', [Validators.required]]
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

   SubirFoto(){
    var user = this.authService;
    var file = $("#foto")[0].files[0]; 
    //console.log(file);
    if (!file) {
      
    } else {
      var filePath = 'fotosPerfil/'+ file.name;
      var storageRef = this.storage.ref(filePath) //rutaSeparada[2]);
      var uploadTask = this.storage.upload(filePath, file).snapshotChanges().pipe(
        finalize(()=>{
          storageRef.getDownloadURL().subscribe((url)=>{
            //console.info(url);
            user.updateProfile(url);
          })
        })
      ).subscribe(); /*storageRef.put(file).then(foto =>{
        console.info(foto); 
      });*/
      /*uploadTask.on('state_changed', function(snapshot){

      }, function(error){
        console.log(error);
      }, function(){
        console.log("Archivo subido");
        var downloadURL = uploadTask.task.snapshot.downloadURL;
        console.log(downloadURL);
        user.updateProfile(downloadURL, "");
        window.location.reload(true);
      }

    );*/
    }
    
   }

  OnSubmitRegister() {
    if(this.loginForm.value.confirm != this.loginForm.value.password){
      return 0;
    } else {
      this.submitted = true;
      console.log(this.loginForm.value.foto);
      this.SubirFoto();
      this.authService.signUpWithEmail(this.loginForm.value.email , this.loginForm.value.password).then(res => {
        this.authService.updateProfile(this.loginForm.value.foto)
        this.router.navigate(['/login']);
      }).catch(err => {
        var x = document.getElementById("userInvalid");
        x.style.display = "block";
        // Implementar toast
        this.presentToast()
      })
    }
    
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
