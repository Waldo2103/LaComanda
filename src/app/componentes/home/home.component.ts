import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { 
  }
  userImgSource: string = "";
  ngOnInit() {
    
  }
  
 coso(){
  this.userImgSource = this.auth.coso();
  console.log(this.userImgSource);
 }
}
