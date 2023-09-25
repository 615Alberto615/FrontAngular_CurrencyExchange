import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Conversion } from '../modelo/conversions';

@Injectable({
  providedIn: 'root'
})
export class ConversionsService {

  constructor(private http: HttpClient) { }

 
  getConversions(): Observable<Conversion[]> {
    return this.http.get<any>('/api/conversions').pipe(
      map(response => response.content)
    );
  }
  deleteConversion(conversionId: number): Observable<void> {
    return this.http.delete<void>(`/api/conversions/${conversionId}`);
  }

  addConversion(fromCurrency: string, toCurrency: string, amount: number): Observable<Conversion> {
    const url = `/api/conversions/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`;
    return this.http.post<Conversion>(url, {});  
  }

  updateConversionDate(conversionId: number, conversionDate: string): Observable<Conversion> {
    return this.http.put<Conversion>(`/api/conversions/${conversionId}`, {
      conversionDate: conversionDate
    });
  }
}
  