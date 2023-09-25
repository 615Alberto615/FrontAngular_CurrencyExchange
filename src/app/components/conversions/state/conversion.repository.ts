import { select } from '@ngneat/elf';
import conversionsStore, { ConversionsState } from 'src/app/components/conversions/store/conversion.store';
import { Conversion } from "src/app/modelo/conversions";
import { ConversionsService } from 'src/app/services/conversions.service'; // Importa el servicio
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversionRepository {
  conversions$ = conversionsStore.pipe(select((state: ConversionsState) => state.conversions));

  constructor(private conversionsService: ConversionsService) {} // Inyecta el servicio

  setConversions(conversions: Conversion[]) {
    conversionsStore.update((state: ConversionsState) => ({ ...state, conversions }));
  }

  addConversion(conversion: Conversion) {
    conversionsStore.update((state: ConversionsState) => {
      return { ...state, conversions: [...state.conversions, conversion] };
    });
  }
  

  fetchConversionsFromAPI(): void {
    this.conversionsService.getConversions().subscribe(conversions => {
      this.setConversions(conversions); // Utiliza el método setConversions para actualizar el estado
    }), catchError(error => {
      console.error("Error deleting conversion:", error);
        return throwError(error);
    });
  }
/*
  fetchConversionsFromAPI(): Observable<Conversion> {
    return this.conversionsService.getConversions().pipe(
      tap((conversion: Conversion) => {
        this.getConversions(); // actualiza el estado
      }),
      catchError(error => {
        console.error("Error during currency conversion:", error);
        return throwError(error);
      })
    );
  }
*/
  deleteConversion(conversionId: number): Observable<any> {
    // Nota que ahora retorna el observable
    return this.conversionsService.deleteConversion(conversionId).pipe(
      tap(() => {
        conversionsStore.update((state: ConversionsState) => ({
          ...state,
          conversions: state.conversions.filter(conversion => conversion.conversionId !== conversionId)
        }));
      }),
      catchError(error => {
        console.error("Error deleting conversion:", error);
        return throwError(error); // Esto es para que puedas manejar el error en el componente
      })
    );
  }
  convertCurrency(fromCurrency: string, toCurrency: string, amount: number): Observable<Conversion> {
    return this.conversionsService.addConversion(fromCurrency, toCurrency, amount).pipe(
      tap((conversion: Conversion) => {
        this.addConversion(conversion); // actualiza el estado
      }),
      catchError(error => {
        console.error("Error during currency conversion:", error);
        return throwError(error);
      })
    );
  }
  updateConversionDate(conversionId: number, conversionDate: string): Observable<Conversion> {
    return this.conversionsService.updateConversionDate(conversionId, conversionDate).pipe(
      tap((updatedConversion: Conversion) => {
        conversionsStore.update((state: ConversionsState) => ({
          ...state,
          conversions: state.conversions.map(conversion => 
            conversion.conversionId === updatedConversion.conversionId ? updatedConversion : conversion
          )
        }));
      }),
      catchError(error => {
        console.error("Error updating conversion date:", error);
        return throwError(error);
      })
    );
  }
  
}
