import { Component } from '@angular/core';
import { ConversionRepository } from '../conversions/state/conversion.repository';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  
  fromCurrency!: string;
  toCurrency!: string;
  amount!: number;

  constructor(private conversionRepo: ConversionRepository, private snackBar: MatSnackBar) {}

  convertCurrency(): void {
    if (this.fromCurrency && this.toCurrency && this.amount) {
      this.conversionRepo.convertCurrency(this.fromCurrency, this.toCurrency, this.amount).subscribe(
        (conversion) => {
          console.log('Conversion done:', conversion);
          this.openSnackBar("¡Conversión realizada con éxito!");
        },
        (error) => {
          console.error('Error during conversion:', error);
          this.openSnackBar("Hubo un error al realizar la conversión.");
        }
      );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 6000, // Este es el tiempo en milisegundos durante el cual se mostrará el snackBar. Puedes ajustarlo según tus necesidades.
    });
  }
}