import { Conversion } from 'src/app/modelo/conversions';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConversionRepository } from './state/conversion.repository';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent implements OnInit {

  conversions: Conversion[] = [];
  isLoading = true; 
  displayedColumns: string[] = ['conversionId', 'fromCurrencyCode', 'toCurrencyCode', 'amount', 'convertedAmount', 'conversionDate', 'actions'];
  
  constructor(
    private conversionRepo: ConversionRepository, 
    private spinner: NgxSpinnerService
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
      this.spinner.hide();
      this.isLoading = false;
    });
  }
  deleteConversion(conversionId: number): void {
    this.spinner.show();
  
    this.conversionRepo.deleteConversion(conversionId).subscribe(() => {
      this.spinner.hide();
    }, error => {
      console.error("Error deleting conversion:", error);
      this.spinner.hide();
    });
  }
  
  
  
}
