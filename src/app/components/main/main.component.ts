import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  title = 'Currency Converter';
  constructor(private keycloakService: KeycloakService) {}

  logout(): void {
    this.keycloakService.logout();
    alert('Sesión cerrada');
  }
  
}
