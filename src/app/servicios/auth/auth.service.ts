import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User | null >;

  constructor(private AFauth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.user = this.AFauth.authState;
   }

   coso(){
     var coso = this.AFauth.auth.currentUser.photoURL;
     //this.AFauth.auth.currentUser
     console.log(coso);
     return coso;
   }

  login(email: string, password: string){
    return new Promise((resolve, rejected) =>{
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user)
      }).catch(err => rejected(err))
    })

  }

  // Obtener el estado de autenticación
get authenticated():boolean {
  return this.user != null; // True ó False
}
// Obtener el observador del usuario actual
get currentUser(): Observable<firebase.User | null> {
  return this.user;
}
// Registro con email
signUpWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
  return this.AFauth.auth.createUserWithEmailAndPassword(email,pass);
 }
 // Ingreso con email
 signInWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
  return this.AFauth.auth.signInWithEmailAndPassword(email,pass)
 }
// Actualizar perfil firebase authentication
updateProfile(photo,name?):Promise<void> {
  return this.AFauth.auth.currentUser.updateProfile({
  displayName:
  (name) ? name : this.AFauth.auth.currentUser.displayName,
  photoURL:
  (photo) ? photo : this.AFauth.auth.currentUser.photoURL
  });
  }


}
