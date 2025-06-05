// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class InvoiceService {

//   private apiUrl = 'http://localhost:8080/api/bill/generate'; // Adjust if needed
//   invoiceService: any;

//   constructor(private http: HttpClient) { }

//   generateInvoiceExcel(invoiceData: any): Observable<Blob> {
//     return this.http.post(this.apiUrl, invoiceData, { responseType: 'blob' });
//   }
//   saveInvoice() {
//   this.invoiceService.saveInvoiceData(this.invoice).subscribe({
//     next: (response: any) => {
//       console.log('Invoice saved successfully:', response);
//     },
//     error: (err: any) => {
//       console.error('Failed to save invoice:', err);
//     }
//   });
//   }
//   invoice(invoice: any) {
//     throw new Error('Method not implemented.');
//   }

// }



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class InvoiceService {
//   private baseUrl = 'http://localhost:8080/api/bill'; // Adjust port as needed

//   constructor(private http: HttpClient) { }

//   generateExcel(invoiceData: any): Observable<Blob> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });

//     return this.http.post(`${this.baseUrl}/generate`, invoiceData, {
//       headers: headers,
//       responseType: 'blob' // Important: This tells Angular to expect binary data
//     });
//   }
// }




// invoice.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceData } from './invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  [x: string]: any;

  private apiUrl = 'http://localhost:8080/api/bill/generate';

  constructor(private http: HttpClient) { }

  // ✅ Save invoice to database
  saveInvoiceData(invoiceData: InvoiceData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, invoiceData, { headers });
  }

  // ✅ Generate and download Excel from backend
  generateBill(invoiceData: any): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, invoiceData, {
      headers,
      responseType: 'blob'
    });
  }
}
