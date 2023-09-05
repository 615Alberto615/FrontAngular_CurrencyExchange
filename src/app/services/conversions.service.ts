import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversion } from '../modelo/conversions';

@Injectable({
  providedIn: 'root'
})
export class ConversionsService {

  constructor(private http: HttpClient) { }

  getConversions():Observable<Conversion[]> {
    return this.http.get<Conversion[]>('/api/conversions');
  }
  deleteConversion(conversionId: number): Observable<void> {
    return this.http.delete<void>(`/api/conversions/${conversionId}`);
  }/*
  addConversion(conversion: Conversion): Observable<Conversion> {
    return this.http.post<Conversion>('/api/conversions', conversion);
  }*/
  // ConversionsService

  addConversion(fromCurrency: string, toCurrency: string, amount: number): Observable<Conversion> {
    const url = `/api/conversions/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`;
    return this.http.post<Conversion>(url, {});  
  }

  
}
  