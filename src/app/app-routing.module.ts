import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component: LoginComponent },
  { path:'registro', component: RegistroComponent },
  { path:'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
