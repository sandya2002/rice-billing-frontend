import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from './payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [
    {
      id: 1,
      customerId: 1,
      customerName: 'Rajesh Kumar',
      invoiceNumber: 'INV-2024-001',
      date: new Date('2024-01-05'),
      amount: 25000,
      status: 'paid',
      paidDate: new Date('2024-01-07'),
      items: 'Basmati Rice - 50 bags',
      paymentMethod: 'Bank Transfer'
    },
  ];
  

// searchPayment() {
//   let paidAmount = 0;
//   let pendingAmount = 0;

//   this.transactions.forEach((tx: { status: string; amount: number; }) => {
//     if (tx.status.toLowerCase() === 'paid') {
//       paidAmount += tx.amount;
//     } else if (tx.status.toLowerCase() === 'pending') {
//       pendingAmount += tx.amount;
//     }
//   });

//   console.log('Total Paid Amount: ₹' + paidAmount);
//   console.log('Total Pending Amount: ₹' + pendingAmount);
// }

 paidAmount = 0;
  pendingAmount = 0;
  totalAmount: any;

//  ngOnInit() {
//   const invoiceNumber = this.InvoiceNumber; // make sure this is defined
//   if (invoiceNumber) {
//     this.paymentService.getPayment(invoiceNumber).subscribe({
//       next: (data) => console.log(data),
//       error: (err) => console.error("Error fetching transactions:", err),
//     });
//   } else {
//     console.error("Invoice number is undefined!");
//   }
// }

//  ngOnInit(): void {
//     // Get invoice number from query param
//     this.route.queryParams.subscribe(params => {
//       const invoiceNumber = params['invoiceNumber'];
//       if (invoiceNumber) {
//         this.InvoiceNumber = invoiceNumber;
//         this.paymentService.getPayment(invoiceNumber).subscribe({
//           next: (data) => console.log(data),
//           error: (err) => console.error("Error fetching transactions:", err),
//         });
//       } else {
//         console.error("Invoice number is undefined!");
//       }
//     });
//  }

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const invoiceNumber = params['invoiceNumber'];
    
    if (invoiceNumber) {
      console.log("Invoice number from query param:", invoiceNumber);
      this.InvoiceNumber = invoiceNumber;

      this.paymentService.getPayment(invoiceNumber).subscribe({
        next: (data) => console.log("Payment data loaded on init:", data),
        error: (err) => console.error("Error fetching transactions:", err),
      });
    } else {
      console.warn("No invoice number in query params — waiting for user input.");
    }
  });
}


//   searchPayment(): void {
//   const invoice = this.InvoiceNumber?.trim();
//   if (!invoice) {
//     console.warn('Please enter an invoice number');
//     return;
//   }

//   this.isLoading = true;
//   this.paymentService.getAllTransactions(invoice).subscribe({
//     next: (data: Payment[]) => {
//       this.transactions = Array.isArray(data) ? data : [];
//       this.calculateSummaryStats();
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('Error fetching transactions:', err);
//       this.transactions = [];
//       this.isLoading = false;
//     }
//   });
// }

searchPayment() {

  // if (!this.InvoiceNumber) {
  //   alert('Please enter an invoice number');
  //   return;
  // }
  if (this.InvoiceNumber) {
    this.paymentService.getPayment(this.InvoiceNumber).subscribe({
      next: (data) => console.log("Fetched payment data:", data),
      error: (err) => console.error("Error fetching transactions:", err),
    });
  } else {
    console.error("Invoice number is undefined!");
  }
  


  // this.isLoading = true;

  // this.paymentService.getAllTransactions(this.InvoiceNumber).subscribe({
  //   next: (data) => {
  //     this.transactions = data || [];
  //     this.calculateSummaryStats(this.transactions);
  //     this.isLoading = false;
  //   },
  //   error: (err) => {
  //     console.error('Error fetching transactions:', err);
  //     this.transactions = [];
  //     this.isLoading = false;
  //   }
  // });
}



// InvoiceNumber: any;
 InvoiceNumber: string = '';
toggleMenu() {
throw new Error('Method not implemented.');
}
  searchInvoiceNumber = '';
  isLoading = false;
  payment: Payment | null = null;
  showSearchResults = false;
isMenuOpen: any;
summaryStats: any;

  //constructor(private paymentService: PaymentService) {}


constructor(private paymentService: PaymentService, private route: ActivatedRoute) {}


  // ngOnInit(): void {}

  searchByInvoice(): void {
    if (!this.searchInvoiceNumber.trim()) return;

    this.isLoading = true;

    this.paymentService.getPayment(this.searchInvoiceNumber).subscribe({
      next: (result: Payment) => {
        this.payment = result;
        this.showSearchResults = true;
        this.isLoading = false;

        this.calculateSummaryStats(result);
      },
      error: () => {
        this.payment = null;
        this.showSearchResults = true;
        this.isLoading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchInvoiceNumber = '';
    this.payment = null;
    this.showSearchResults = false;
  }

  formatCurrency(amount: number): string {
    return amount?.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    });
  }
  transactionSummary = {
    unpaidCount: 0,
    paidCount: 0,
    totalCount: 0
  };
 calculateSummaryStats(transactions:any): void {
//   if (!Array.isArray(this.transactions)) {
//     console.error('Transactions is not an array:', this.transactions);
//     this.transactions = []; // default to empty array to prevent further errors
    

//   this.totalAmount = transactions.reduce((sum: any, t: { totalAmount: any; }) => sum + t.totalAmount, 0);
//   this.paidAmount = transactions.reduce((sum: any, t: { paidAmount: any; }) => sum + t.paidAmount, 0);
//   this.pendingAmount = transactions.reduce((sum: any, t: { pendingAmount: any; }) => sum + t.pendingAmount, 0);
// }
this.totalAmount = transactions.totalAmount;
  this.paidAmount = transactions.paidAmount;
  this.pendingAmount = transactions.pendingAmount;

  let totalPaid = 0;
  let totalUnpaid = 0;
  let paidCount = 0;
  let unpaidCount = 0;

  this.transactions.forEach((tx: any) => {
    if (tx.status?.toLowerCase() === 'paid') {
      totalPaid += tx.amount;
      paidCount++;
    } else if (tx.status?.toLowerCase() === 'pending' || tx.status?.toLowerCase() === 'unpaid') {
      totalUnpaid += tx.amount;
      unpaidCount++;
    }
  });

  this.summaryStats = {
    totalBusiness: totalPaid + totalUnpaid,
    totalPaid,
    totalUnpaid,
    paidCount,
    unpaidCount
  };
}


}



