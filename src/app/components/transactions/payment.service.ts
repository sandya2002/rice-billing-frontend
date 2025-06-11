import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Payment {
  totalAmount: number;
  id: number;
  invoiceNumber: string;
  pendingAmount: number;
  paidAmount: number;
  status: 'paid' | 'unpaid';
  dueDate?: string;
  date:Date;
  specialDiscount:DoubleRange;
  totalTax:DoubleRange;

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

getAllTransactions(invoiceNumber: string): Observable<Payment[]> {
  console.log("Calling API for invoice:", invoiceNumber);

  const params = new HttpParams().set('invoiceNumber', invoiceNumber);
  return this.http.get<Payment[]>(`${this.baseUrl}/get`, { params });
}

// getPayment(invoiceNumber: string): Observable<Payment> {
//   console.log(`working `)
//     return this.http.get<Payment>(`${this.baseUrl}/get`, {
//       params: new HttpParams().set('invoiceNumber', invoiceNumber)
//     });
//   }

getPayment(InvoiceNumber: string): Observable<any> {
  return this.http.get(`http://localhost:8080/api/payment/get?invoiceNumber=${InvoiceNumber}`);
}
 markFullPayment(invoiceNumber: string): Observable<any> {
  const url = `http://localhost:8080/api/payment/update`;
  const params = {
    invoiceNumber: invoiceNumber,
    fullPayment: true,
  };

  return this.http.put(url, null, { params });
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
