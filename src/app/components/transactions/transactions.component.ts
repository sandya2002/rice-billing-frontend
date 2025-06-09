// import { Component, OnInit } from '@angular/core';

// interface Customer {
//   id: number;
//   name: string;
//   phone: string;
//   address?: string;
//   totalBusiness?: number;
// }

// interface Transaction {
//   id: number;
//   customerId: number;
//   customerName: string;
//   invoiceNumber: string;
//   date: Date;
//   amount: number;
//   status: 'paid' | 'unpaid';
//   dueDate?: Date;
//   paidDate?: Date;
//   items?: string;
//   paymentMethod?: string;
// }

// @Component({
//   selector: 'app-transactions',
//   templateUrl: './transactions.component.html',
//   styleUrls: ['./transactions.component.css']
// })
// export class TransactionsComponent implements OnInit {
//   isMenuOpen = false;
//   selectedFilter: 'paid' | 'unpaid' = 'paid';
  
//   // New properties for search functionality
//   searchInvoiceNumber = '';
//   searchResults: any = null;
//   showSearchResults = false;
//   isLoading = false;

//   // Dummy customer data
//   customers: Customer[] = [
//     { id: 1, name: 'Rajesh Kumar', phone: '9876543210', address: 'Street 1, Hyderabad' },
//     { id: 2, name: 'Priya Sharma', phone: '9876543211', address: 'Street 2, Secunderabad' },
//     { id: 3, name: 'Mohammed Ali', phone: '9876543212', address: 'Street 3, Kukatpally' },
//     { id: 4, name: 'Lakshmi Devi', phone: '9876543213', address: 'Street 4, Madhapur' },
//     { id: 5, name: 'Suresh Reddy', phone: '9876543214', address: 'Street 5, Gachibowli' },
//     { id: 6, name: 'Anita Patel', phone: '9876543215', address: 'Street 6, Begumpet' },
//     { id: 7, name: 'Ravi Shankar', phone: '9876543216', address: 'Street 7, Ameerpet' },
//     { id: 8, name: 'Fatima Begum', phone: '9876543217', address: 'Street 8, Charminar' }
//   ];

//   // Dummy transaction data
//   transactions: Transaction[] = [
//     // Rajesh Kumar transactions
//     {
//       id: 1,
//       customerId: 1,
//       customerName: 'Rajesh Kumar',
//       invoiceNumber: 'INV-2024-001',
//       date: new Date('2024-01-05'),
//       amount: 25000,
//       status: 'paid',
//       paidDate: new Date('2024-01-07'),
//       items: 'Basmati Rice - 50 bags',
//       paymentMethod: 'Bank Transfer'
//     },
//     {
//       id: 2,
//       customerId: 1,
//       customerName: 'Rajesh Kumar',
//       invoiceNumber: 'INV-2024-002',
//       date: new Date('2024-01-10'),
//       amount: 30000,
//       status: 'unpaid',
//       dueDate: new Date('2024-02-10'),
//       items: 'Sona Masoori - 40 bags'
//     },
//     {
//       id: 3,
//       customerId: 1,
//       customerName: 'Rajesh Kumar',
//       invoiceNumber: 'INV-2024-015',
//       date: new Date('2024-01-25'),
//       amount: 18000,
//       status: 'paid',
//       paidDate: new Date('2024-01-26'),
//       items: 'Brown Rice - 30 bags',
//       paymentMethod: 'Cash'
//     },
    
//     // Priya Sharma transactions
//     {
//       id: 4,
//       customerId: 2,
//       customerName: 'Priya Sharma',
//       invoiceNumber: 'INV-2024-003',
//       date: new Date('2024-01-12'),
//       amount: 45000,
//       status: 'paid',
//       paidDate: new Date('2024-01-15'),
//       items: 'Premium Basmati - 60 bags',
//       paymentMethod: 'UPI'
//     },
//     {
//       id: 5,
//       customerId: 2,
//       customerName: 'Priya Sharma',
//       invoiceNumber: 'INV-2024-004',
//       date: new Date('2024-01-18'),
//       amount: 35000,
//       status: 'unpaid',
//       dueDate: new Date('2024-02-18'),
//       items: 'Brown Rice - 45 bags'
//     },
//     {
//       id: 6,
//       customerId: 2,
//       customerName: 'Priya Sharma',
//       invoiceNumber: 'INV-2024-016',
//       date: new Date('2024-02-01'),
//       amount: 28000,
//       status: 'unpaid',
//       dueDate: new Date('2024-03-01'),
//       items: 'Jasmine Rice - 35 bags'
//     },
    
//     // Mohammed Ali transactions
//     {
//       id: 7,
//       customerId: 3,
//       customerName: 'Mohammed Ali',
//       invoiceNumber: 'INV-2024-005',
//       date: new Date('2024-01-20'),
//       amount: 28000,
//       status: 'paid',
//       paidDate: new Date('2024-01-22'),
//       items: 'Jasmine Rice - 35 bags',
//       paymentMethod: 'Cheque'
//     },
//     {
//       id: 8,
//       customerId: 3,
//       customerName: 'Mohammed Ali',
//       invoiceNumber: 'INV-2024-006',
//       date: new Date('2024-01-25'),
//       amount: 32000,
//       status: 'unpaid',
//       dueDate: new Date('2024-02-25'),
//       items: 'Basmati Rice - 40 bags'
//     },
    
//     // Lakshmi Devi transactions
//     {
//       id: 9,
//       customerId: 4,
//       customerName: 'Lakshmi Devi',
//       invoiceNumber: 'INV-2024-007',
//       date: new Date('2024-01-28'),
//       amount: 22000,
//       status: 'paid',
//       paidDate: new Date('2024-01-30'),
//       items: 'Sona Masoori - 30 bags',
//       paymentMethod: 'Cash'
//     },
//     {
//       id: 10,
//       customerId: 4,
//       customerName: 'Lakshmi Devi',
//       invoiceNumber: 'INV-2024-017',
//       date: new Date('2024-02-05'),
//       amount: 15000,
//       status: 'paid',
//       paidDate: new Date('2024-02-06'),
//       items: 'Red Rice - 20 bags',
//       paymentMethod: 'UPI'
//     },
    
//     // Suresh Reddy transactions
//     {
//       id: 11,
//       customerId: 5,
//       customerName: 'Suresh Reddy',
//       invoiceNumber: 'INV-2024-008',
//       date: new Date('2024-02-01'),
//       amount: 55000,
//       status: 'unpaid',
//       dueDate: new Date('2024-03-01'),
//       items: 'Premium Mix - 70 bags'
//     },
//     {
//       id: 12,
//       customerId: 5,
//       customerName: 'Suresh Reddy',
//       invoiceNumber: 'INV-2024-018',
//       date: new Date('2024-02-10'),
//       amount: 42000,
//       status: 'paid',
//       paidDate: new Date('2024-02-12'),
//       items: 'Basmati Special - 55 bags',
//       paymentMethod: 'Bank Transfer'
//     },
    
//     // Additional transactions
//     {
//       id: 13,
//       customerId: 6,
//       customerName: 'Anita Patel',
//       invoiceNumber: 'INV-2024-009',
//       date: new Date('2024-01-15'),
//       amount: 38000,
//       status: 'paid',
//       paidDate: new Date('2024-01-18'),
//       items: 'Mixed Rice Variety - 50 bags',
//       paymentMethod: 'UPI'
//     },
//     {
//       id: 14,
//       customerId: 6,
//       customerName: 'Anita Patel',
//       invoiceNumber: 'INV-2024-010',
//       date: new Date('2024-02-08'),
//       amount: 26000,
//       status: 'unpaid',
//       dueDate: new Date('2024-03-08'),
//       items: 'Sona Masoori - 35 bags'
//     }
//   ];

//   // Computed property for filtered transactions
//   get filteredTransactions() {
//     return this.transactions.filter(t => t.status === this.selectedFilter);
//   }

//   // Calculate summary statistics
//   get summaryStats() {
//     const totalPaid = this.transactions
//       .filter(t => t.status === 'paid')
//       .reduce((sum, t) => sum + t.amount, 0);
    
//     const totalUnpaid = this.transactions
//       .filter(t => t.status === 'unpaid')
//       .reduce((sum, t) => sum + t.amount, 0);
    
//     return {
//       totalPaid,
//       totalUnpaid,
//       totalBusiness: totalPaid + totalUnpaid,
//       paidCount: this.transactions.filter(t => t.status === 'paid').length,
//             unpaidCount: this.transactions.filter(t => t.status === 'unpaid').length
//     };
//   }

//   ngOnInit() {
//     // Initialize any data if needed
//   }

//   toggleMenu() {
//     this.isMenuOpen = !this.isMenuOpen;
//   }

//   setFilter(filter: 'paid' | 'unpaid') {
//     this.selectedFilter = filter;
//     // Reset search when changing filter
//     this.showSearchResults = false;
//     this.searchInvoiceNumber = '';
//   }

//   // Search by invoice number
//   searchByInvoice() {
//     if (!this.searchInvoiceNumber.trim()) {
//       this.searchResults = null;
//       this.showSearchResults = false;
//       return;
//     }

//     this.isLoading = true;
    
//     // Simulate API call delay
//     setTimeout(() => {
//       const invoice = this.transactions.find(
//         t => t.invoiceNumber.toLowerCase() === this.searchInvoiceNumber.toLowerCase().trim()
//       );

//       if (invoice) {
//         // Get all transactions for this customer
//         const customerTransactions = this.transactions.filter(
//           t => t.customerId === invoice.customerId
//         );

//         // Calculate paid and unpaid amounts
//         const paidTransactions = customerTransactions.filter(t => t.status === 'paid');
//         const unpaidTransactions = customerTransactions.filter(t => t.status === 'unpaid');
        
//         const paidAmount = paidTransactions.reduce((sum, t) => sum + t.amount, 0);
//         const unpaidAmount = unpaidTransactions.reduce((sum, t) => sum + t.amount, 0);

//         // Get customer details
//         const customer = this.customers.find(c => c.id === invoice.customerId);

//         this.searchResults = {
//           customer: customer,
//           invoice: invoice,
//           totalPaid: paidAmount,
//           totalUnpaid: unpaidAmount,
//           totalBusiness: paidAmount + unpaidAmount,
//           allTransactions: customerTransactions,
//           paidTransactions: paidTransactions,
//           unpaidTransactions: unpaidTransactions,
//           transactionCount: customerTransactions.length,
//           paidCount: paidTransactions.length,
//           unpaidCount: unpaidTransactions.length
//         };
//       } else {
//         this.searchResults = null;
//       }

//       this.showSearchResults = true;
//       this.isLoading = false;
//     }, 500);
//   }

//   // Clear search
//   clearSearch() {
//     this.searchInvoiceNumber = '';
//     this.searchResults = null;
//     this.showSearchResults = false;
//   }

//   // Format currency
//   formatCurrency(amount: number): string {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0
//     }).format(amount);
//   }

//   // Get status color class
//   getStatusClass(status: string): string {
//     return status === 'paid' ? 'status-paid' : 'status-unpaid';
//   }

//   // Calculate days overdue - UPDATED TO HANDLE UNDEFINED
//   getDaysOverdue(dueDate: Date | undefined): number {
//     if (!dueDate) return 0;
    
//     const today = new Date();
//     const due = new Date(dueDate);
//     const diffTime = today.getTime() - due.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? diffDays : 0;
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { PaymentService, Payment } from './payment.service';

// interface Customer {
//   id: number;
//   name: string;
//   phone: string;
//   address?: string;
//   totalBusiness?: number;
// }

// interface Transaction {
//   id: number;
//   customerId: number;
//   customerName: string;
//   invoiceNumber: string;
//   date: Date;
//   amount: number;
//   status: 'paid' | 'unpaid';
//   dueDate?: Date;
//   paidDate?: Date;
//   items?: string;
//   paymentMethod?: string;
// }

// @Component({
//   selector: 'app-transactions',
//   templateUrl: './transactions.component.html',
//   styleUrls: ['./transactions.component.css']
// })
// export class TransactionsComponent implements OnInit {
//   isMenuOpen = false;
//   selectedFilter: 'paid' | 'unpaid' = 'paid';
//   searchInvoiceNumber = '';
//   searchResults: any = null;
//   showSearchResults = false;
//   isLoading = false;
//   searchNotFound = false;

//   customers: Customer[] = [
//     { id: 1, name: 'Rajesh Kumar', phone: '9876543210', address: 'Street 1, Hyderabad' },
//     { id: 2, name: 'Priya Sharma', phone: '9876543211', address: 'Street 2, Secunderabad' },
//     { id: 3, name: 'Mohammed Ali', phone: '9876543212', address: 'Street 3, Kukatpally' },
//     { id: 4, name: 'Lakshmi Devi', phone: '9876543213', address: 'Street 4, Madhapur' },
//     { id: 5, name: 'Suresh Reddy', phone: '9876543214', address: 'Street 5, Gachibowli' },
//     { id: 6, name: 'Anita Patel', phone: '9876543215', address: 'Street 6, Begumpet' },
//     { id: 7, name: 'Ravi Shankar', phone: '9876543216', address: 'Street 7, Ameerpet' },
//     { id: 8, name: 'Fatima Begum', phone: '9876543217', address: 'Street 8, Charminar' }
//   ];

//   transactions: Transaction[] = [
//     // Transactions omitted for brevity...
//   ];

//   get filteredTransactions() {
//     return this.transactions.filter(t => t.status === this.selectedFilter);
//   }

//   get summaryStats() {
//     const totalPaid = this.transactions.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
//     const totalUnpaid = this.transactions.filter(t => t.status === 'unpaid').reduce((sum, t) => sum + t.amount, 0);
//     return {
//       totalPaid,
//       totalUnpaid,
//       totalBusiness: totalPaid + totalUnpaid,
//       paidCount: this.transactions.filter(t => t.status === 'paid').length,
//       unpaidCount: this.transactions.filter(t => t.status === 'unpaid').length
//     };
//   }

//   ngOnInit() {}

//   toggleMenu() {
//     this.isMenuOpen = !this.isMenuOpen;
//   }

//   setFilter(filter: 'paid' | 'unpaid') {
//     this.selectedFilter = filter;
//     this.showSearchResults = false;
//     this.searchInvoiceNumber = '';
//     this.searchNotFound = false;
//   }

//   searchByInvoice() {
//     if (!this.searchInvoiceNumber.trim()) {
//       this.clearSearch();
//       return;
//     }

//     this.isLoading = true;
//     this.searchNotFound = false;

//     setTimeout(() => {
//       const invoice = this.transactions.find(t => t.invoiceNumber.toLowerCase() === this.searchInvoiceNumber.toLowerCase().trim());

//       if (invoice) {
//         const customerTransactions = this.transactions.filter(t => t.customerId === invoice.customerId);
//         const paidTransactions = customerTransactions.filter(t => t.status === 'paid');
//         const unpaidTransactions = customerTransactions.filter(t => t.status === 'unpaid');
//         const paidAmount = paidTransactions.reduce((sum, t) => sum + t.amount, 0);
//         const unpaidAmount = unpaidTransactions.reduce((sum, t) => sum + t.amount, 0);
//         const customer = this.customers.find(c => c.id === invoice.customerId);

//         this.searchResults = {
//           customer,
//           invoice,
//           totalPaid: paidAmount,
//           totalUnpaid: unpaidAmount,
//           totalBusiness: paidAmount + unpaidAmount,
//           allTransactions: customerTransactions,
//           paidTransactions,
//           unpaidTransactions,
//           transactionCount: customerTransactions.length,
//           paidCount: paidTransactions.length,
//           unpaidCount: unpaidTransactions.length
//         };
//       } else {
//         this.searchResults = null;
//         this.searchNotFound = true;
//       }

//       this.showSearchResults = true;
//       this.isLoading = false;
//     }, 500);
//   }

//   clearSearch() {
//     this.searchInvoiceNumber = '';
//     this.searchResults = null;
//     this.showSearchResults = false;
//     this.searchNotFound = false;
//   }

//   formatCurrency(amount: number): string {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0
//     }).format(amount);
//   }

//   getStatusClass(status: string): string {
//     return status === 'paid' ? 'status-paid' : 'status-unpaid';
//   }

//   getDaysOverdue(dueDate: Date | undefined): number {
//     if (!dueDate) return 0;
//     const today = new Date();
//     const due = new Date(dueDate);
//     const diffTime = today.getTime() - due.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? diffDays : 0;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from './payment.service';

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

  ngOnInit(): void {
    // Example of hardcoded data. Replace with service call if needed
    this.paymentService.getAllTransactions().subscribe({
    next: (data: any[]) => {
      this.transactions = data;
      console.log("API response received:", data);
    },
    error: (err: any) => {
      console.error('Error fetching transactions:', err);
    }
  });
  }

  searchPayment() {
    this.paidAmount = 0;
    this.pendingAmount = 0;

    if (!this.transactions || !Array.isArray(this.transactions)) {
      console.error('Transactions not available');
      return;
    }

    this.transactions.forEach(tx => {
      if (tx.status.toLowerCase() === 'paid') {
        this.paidAmount += tx.amount;
      } else if (tx.status.toLowerCase() === 'pending') {
        this.pendingAmount += tx.amount;
      }
    });

    console.log('Total Paid Amount: ₹' + this.paidAmount);
    console.log('Total Pending Amount: ₹' + this.pendingAmount);
  }

InvoiceNumber: any;
toggleMenu() {
throw new Error('Method not implemented.');
}
  searchInvoiceNumber = '';
  isLoading = false;
  payment: Payment | null = null;
  showSearchResults = false;
isMenuOpen: any;
summaryStats: any;

  constructor(private paymentService: PaymentService) {}

  // ngOnInit(): void {}

  searchByInvoice(): void {
    if (!this.searchInvoiceNumber.trim()) return;

    this.isLoading = true;

    this.paymentService.getPayment(this.searchInvoiceNumber).subscribe({
      next: (result: Payment) => {
        this.payment = result;
        this.showSearchResults = true;
        this.isLoading = false;
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
}



