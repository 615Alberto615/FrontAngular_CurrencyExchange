import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConversionsComponent } from './components/conversions/conversions.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PostComponent } from './components/post/post.component';


import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ConversionUpdateDialogComponent } from './conversion-update-dialog/conversion-update-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Error403Component } from './error403/error403.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'realm1xd',
        clientId: 'currencyweb'
      },
      initOptions: {
        onLoad: 'check-sso',//login-required
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ConversionsComponent,
    PostComponent,
    ConversionUpdateDialogComponent,
    Error403Component 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,  
    MatCardModule, 
    FormsModule,
    MatSnackBarModule,
    KeycloakAngularModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
