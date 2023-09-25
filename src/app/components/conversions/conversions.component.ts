import { Conversion } from 'src/app/modelo/conversions';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConversionRepository } from './state/conversion.repository';
import { MatDialog } from '@angular/material/dialog';
import { ConversionUpdateDialogComponent } from 'src/app/conversion-update-dialog/conversion-update-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css'],
})

export class ConversionsComponent implements OnInit {

  conversions: Conversion[] = [];
  isLoading = true; 
  errorMessage: string | null = null; 
  displayedColumns: string[] = ['conversionId', 'fromCurrencyCode', 'toCurrencyCode', 'amount', 'convertedAmount', 'conversionDate', 'actions'];
  
  constructor(
    private conversionRepo: ConversionRepository, 
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    
  ) { }

  ngOnInit(): void {
    this.errorMessage = "No tiene permiso para realizar esta transacción.";
    this.spinner.show();


    this.conversionRepo.fetchConversionsFromAPI();

    this.conversionRepo.conversions$.subscribe(conversions => {
      this.conversions = conversions;
      this.spinner.hide();
      this.isLoading = false;this.errorMessage = null; 
  
    }, error => {
      console.error(error);
      if (error.status === 403) {
        this.errorMessage = "No tiene permiso para realizar esta transacción.";  
      } else {
        this.errorMessage = "Error al obtener las conversiones.";  
      }
      this.spinner.hide();
      this.isLoading = false;
    });
    
  }
  deleteConversion(conversionId: number): void {
    this.spinner.show();
  
    this.conversionRepo.deleteConversion(conversionId).subscribe(() => {
      this.spinner.hide();
    }, error => {
      console.error(error);
      if (error.status === 403) {
        this.errorMessage = "No tiene permiso para realizar esta transacción.";
      } else {
        this.errorMessage = "Error al obtener las conversiones.";
      }
      this.spinner.hide();
      this.isLoading = false;
    });
  }
  
  openUpdateDialog(conversion: Conversion): void {
    const dialogRef = this.dialog.open(ConversionUpdateDialogComponent, {
      width: '250px',
      data: { conversionId: conversion.conversionId, conversionDate: conversion.conversionDate }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.conversionRepo.updateConversionDate(result.conversionId, result.conversionDate)
          .subscribe(() => {
            // Aquí puedes actualizar tu lista de conversiones o hacer alguna otra acción después de actualizar
            this.spinner.hide();
          }, error => {
            console.error("Error updating conversion date:", error);
            if (error.status === 403) {
              this.openSnackBar("No tiene permiso para eliminar esta conversión.");
            } else {
              this.openSnackBar("Error al eliminar la conversión.");
            }
            this.spinner.hide();
          });
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 6000,
    });
  }
  get isListEmpty(): boolean {
    return this.conversions && this.conversions.length === 0;
  }
  
}
/*
import { Conversion } from 'src/app/modelo/conversions';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConversionRepository } from './state/conversion.repository';
import { MatDialog } from '@angular/material/dialog';
import { ConversionUpdateDialogComponent } from 'src/app/conversion-update-dialog/conversion-update-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css'],
})

export class ConversionsComponent implements OnInit {

  conversions: Conversion[] = [];
  isLoading = true; 
  errorMessage: string | null = null; 
  displayedColumns: string[] = ['conversionId', 'fromCurrencyCode', 'toCurrencyCode', 'amount', 'convertedAmount', 'conversionDate', 'actions'];
  
  constructor(
    private conversionRepo: ConversionRepository, 
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router 
    
  ) { }
  ngOnInit(): void {
    this.spinner.show();

    // Hacer la llamada a la API para obtener las conversiones
    this.conversionRepo.fetchConversionsFromAPI();

    // Suscribirse a conversions$ para obtener las conversiones y actualizarlas en el componente
    this.conversionRepo.conversions$.subscribe(conversions => {
      this.conversions = conversions;
      this.spinner.hide();
      this.isLoading = false;
    }, error => {
      console.error(error);
      if (error.status === 403) {
        console.log("Detectado error 403. Intentando navegar...");
        this.router.navigate(['403'])
          .then(success => {
            if (!success) {
              console.error("Fallo al navegar hacia la ruta del error 403.");
            }
          })
          .catch(navError => {
            console.error("Error durante la navegación:", navError);
          });
      } else {
        this.errorMessage = "Error al obtener las conversiones.";
      }
      this.spinner.hide();
      this.isLoading = false;
    });
}


  deleteConversion(conversionId: number): void {
    this.spinner.show();
  
    this.conversionRepo.deleteConversion(conversionId).subscribe(() => {
      this.spinner.hide();
    }, error => {
      console.error(error);
      if (error.status === 403) {
        this.errorMessage = "No tiene permiso para realizar esta transacción.";
      } else {
        this.errorMessage = "Error al obtener las conversiones.";
      }
      this.spinner.hide();
      this.isLoading = false;
    });
  }
  
  openUpdateDialog(conversion: Conversion): void {
    const dialogRef = this.dialog.open(ConversionUpdateDialogComponent, {
      width: '250px',
      data: { conversionId: conversion.conversionId, conversionDate: conversion.conversionDate }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.conversionRepo.updateConversionDate(result.conversionId, result.conversionDate)
          .subscribe(() => {
            // Aquí puedes actualizar tu lista de conversiones o hacer alguna otra acción después de actualizar
            this.spinner.hide();
          }, error => {
            console.error("Error updating conversion date:", error);
            if (error.status === 403) {
              this.openSnackBar("No tiene permiso para eliminar esta conversión.");
            } else {
              this.openSnackBar("Error al eliminar la conversión.");
            }
            this.spinner.hide();
          });
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 6000,
    });
  }
  
  
}

*/
/*
ngOnInit(): void {
    //this.errorMessage = "No tiene permiso para realizar esta transacción.";
    this.spinner.show();


    this.conversionRepo.fetchConversionsFromAPI();

    this.conversionRepo.conversions$.subscribe((response: Conversion[] | HttpResponse<any>) => {
      if (response instanceof HttpResponse) {
        console.log("Status:", response.status);
        if (response.status == 403) {
          this.errorMessage = "No tiene permiso para realizar esta transacción.";  
          console.log("Detectado error 403. Intentando navegar...");
          this.spinner.hide();
          this.isLoading = false;
        }
        else {
          this.errorMessage = "Error al obtener las conversiones.";  
        }
      }
      //this.spinner.hide();
      //this.isLoading = false;
      console.log("llega al spinner");
      //this.errorMessage = null; 
    },
    (error)=>{
      console.error("Error:", error);
      console.log("llega al error no ak if");
      if (error.status == 403) {
        this.errorMessage = "No tiene permiso para realizar esta transacción.";  
        console.log("Detectado error 403. Intentando navegar...");
      } else {
        this.errorMessage = "Error al obtener las conversiones.";  
      }
      this.spinner.hide();
      this.isLoading = false;
    }
    );
   
  }
*/