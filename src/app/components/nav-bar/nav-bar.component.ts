import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import jwt_decode from "jwt-decode";
import {SessionService} from "../../services/auth/session.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  user: any;
  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    const currentUser =this.sessionService.getUser();
    
    this.user = {
      name: `${currentUser.names} ${currentUser.surnames}`,
      picture: currentUser.picture,
      rol: currentUser.rol.replace('_', ' ')
    }
  }

}
