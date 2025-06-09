import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Payment {
  id: number;
  invoiceNumber: string;
  pendingAmount: number;
  paidAmount: number;
  status: 'paid' | 'unpaid';
  dueDate?: string; // Add if available
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // getAllTransactions() {
  //   throw new Error('Method not implemented.');
  // }
  private baseUrl = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) {}

//   getPayment(invoiceNumber: string): Observable<Payment> {
//     return this.http.get<Payment>(`${this.baseUrl}/get?invoiceNumber=${invoiceNumber}`);
//   }

getAllTransactions(): Observable<Payment[]> {
  const invoiceNumber='SAT/2025/1';
    console.log("Calling API to get transactions...");
  return this.http.get<Payment[]>(`http://localhost:8080/api/payment/get?invoiceNumber=${invoiceNumber}`);
}
getPayment(invoiceNumber: string): Observable<Payment> {
  console.log(`working `)
    return this.http.get<Payment>(`${this.baseUrl}/get`, {
      params: new HttpParams().set('invoiceNumber', invoiceNumber)
    });
  }

  // Create new payment (initial entry)
  createPayment(invoiceNumber: string, pendingAmount: number): Observable<Payment> {
    const params = new HttpParams()
      .set('invoiceNumber', invoiceNumber)
      .set('pendingAmount', pendingAmount.toString());

    return this.http.post<Payment>(`${this.baseUrl}/create`, null, { params });
  }

  // Update existing payment (add paid amount)
  updatePayment(invoiceNumber: string, paidAmount: number): Observable<Payment> {
    const params = new HttpParams()
      .set('invoiceNumber', invoiceNumber)
      .set('paidAmount', paidAmount.toString());

    return this.http.put<Payment>(`${this.baseUrl}/update`, null, { params });
  }
  

}
