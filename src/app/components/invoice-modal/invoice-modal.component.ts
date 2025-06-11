import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from './invoice-modal.service';
import { InvoiceData } from './invoice.model';
interface InvoiceItem {
  sno: number;
  description: string;
  quantity: number;
  unit: number;
  unitPrice: number;
  taxRate: number;
  subTotal: number;
  total: number;
}

interface SavedInvoice {
  invoiceDate: string;
  invoiceNo: string;
  id: number;
  // invoiceNo: string;
  // invoiceDate: string;
  billingName: string;
  totalAmount: number;
  items: InvoiceItem[];
  transportMode: string;
  vehicleNo: string;
  referenceNo: string;
  billingAddress: string;
  billingPhone: string;
  billingGst: string;
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  shippingGst: string;
  specialDiscount: number;
  shippingHandling: number;
  totalTax: number;
  status: 'paid' | 'unpaid';
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
}
interface Transaction {
  id: number;
  customerId: number;
  customerName: string;
  invoiceNumber: string;
  date: Date;
  amount: number;
  status: 'paid' | 'unpaid';
  dueDate?: Date;
  paidDate?: Date;
  items?: string;
  paymentMethod?: string;
}

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit {
  
  // Invoice Details
  invoiceNo: string = '';
  invoiceDate: string = '';
  transportMode: string = '';
  vehicleNo: string = '';
  referenceNo: string = '';
  
  // Billing Details
  billingName: string = '';
  billingAddress: string = '';
  billingPhone: string = '';
  billingGst: string = '';
  
  // Shipping Details
  shippingName: string = '';
  shippingAddress: string = '';
  shippingPhone: string = '';
  shippingGst: string = '';
  
  // Invoice Items
  invoiceItems: InvoiceItem[] = [
    {
      sno: 1,
      description: '',
      quantity: 0,
      unit: 0,
      unitPrice: 0,
      taxRate: 0,
      subTotal: 0,
      total: 0
    }
  ];
  
  // Calculation fields
  specialDiscount: number = 0;
  shippingHandling: number = 0;
  // Payment fields
  paymentMethod: string = '';
  isPaid: boolean = false;
  dueDate: string = '';
  // Saved Invoices
  savedInvoices: SavedInvoice[] = [];
  filteredInvoices: SavedInvoice[] = [];
  searchTerm: string = '';
  nextInvoiceId: number = 1;
  
  // Edit Mode Tracking
  isEditMode: boolean = false;
  editingInvoiceId: number | null = null;
  paymentSummary: any;
  paymentService: any;
  
  constructor(private router: Router, private invoiceService: InvoiceService ) { }
  
  ngOnInit(): void {
    this.setCurrentDate();
    this.setDueDate();
    this.loadSavedInvoices();
    this.generateInvoiceNumber();
  }
  setDueDate(): void {
    const today = new Date();
    const dueDate = new Date(today.setDate(today.getDate() + 30)); // 30 days from now
    const day = String(dueDate.getDate()).padStart(2, '0');
    const month = String(dueDate.getMonth() + 1).padStart(2, '0');
    const year = dueDate.getFullYear();
    this.dueDate = `${day}/${month}/${year}`;
  }
  setCurrentDate(): void {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    this.invoiceDate = `${day}.${month}.${year}`;
  }
  
  generateInvoiceNumber(): void {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const invoiceCount = this.savedInvoices.length + 1;
    this.invoiceNo = `INV-${year}-${month}-${String(invoiceCount).padStart(3, '0')}`;
  }
  getInvoiceCountForCurrentMonth(): number {
    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    const prefix = `INV-${currentYear}-${currentMonth}`;
    
    return this.savedInvoices.filter(invoice => 
      invoice.invoiceNo.startsWith(prefix)
    ).length;
  }
  loadSavedInvoices(): void {
    // Load from localStorage
    const saved = localStorage.getItem('savedInvoices');
    if (saved) {
      this.savedInvoices = JSON.parse(saved);
      this.filteredInvoices = [...this.savedInvoices];
      this.nextInvoiceId = this.savedInvoices.length > 0 
        ? Math.max(...this.savedInvoices.map(inv => inv.id)) + 1 
        : 1;
    }
  }



onPaymentStatusChange(): void {
  if (!this.paymentSummary || !this.paymentSummary.invoiceNumber) {
    alert('No invoice loaded Testing');
    return;
  }

  const invoiceNumber = this.paymentSummary.invoiceNumber;

  if (this.isPaid) {
    this.paymentService.markInvoiceAsPaid(invoiceNumber).subscribe({
      next: (updatedPayment: { pendingAmount: any; }) => {
        console.log("✅ Invoice marked as paid",updatedPayment);
        // Update UI
        this.paymentSummary.paidAmount = this.paymentSummary.totalAmount;
        this.paymentSummary.pendingAmount = updatedPayment.pendingAmount;
      },
      error: (err: any) => {
        console.error("❌ Error marking invoice as paid:", err);
        this.isPaid = false; // Revert checkbox
      }
    });
  }
}

   saveInvoice(): void {
  // Validate form
  if (!this.invoiceNo || !this.billingName) {
    alert('Please fill Invoice Number and Billing Name at minimum');
    return;
  }

  const hasValidItem = this.invoiceItems.some(item =>
    item.description && item.quantity > 0 && item.unitPrice > 0
  );

  if (!hasValidItem) {
    alert('Please add at least one item with description, quantity and price');
    return;
  }

  this.invoiceService.generateBill({
    invoiceNo: this.invoiceNo,
    invoiceDate: this.invoiceDate,
    billingName: this.billingName,
    totalAmount: this.getBalanceDue(),
    items: this.invoiceItems,
    transportMode: this.transportMode,
    vehicleNo: this.vehicleNo,
    referenceNo: this.referenceNo,
    billingAddress: this.billingAddress,
    billingPhone: this.billingPhone,
    billingGst: this.billingGst,
    shippingName: this.shippingName,
    shippingAddress: this.shippingAddress,
    shippingPhone: this.shippingPhone,
    shippingGst: this.shippingGst,
    specialDiscount: this.specialDiscount,
    shippingHandling: this.shippingHandling
  }).subscribe({
    next: (response: Blob) => {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${this.invoiceNo}.xlsx`;
      a.click();
      alert('Invoice saved and downloaded successfully!');
      this.resetForm();
    },
    error: (err) => {
      console.error('Error saving invoice to backend', err);
      alert('Failed to save invoice to backend');
    }
  });
}
  createTransaction(invoice: SavedInvoice, itemsDescription: string): void {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      customerId: invoice.id,
      customerName: invoice.billingName,
      invoiceNumber: invoice.invoiceNo,
      date: new Date(invoice.invoiceDate.split('/').reverse().join('-')),
      amount: invoice.totalAmount,
      status: invoice.status,
      dueDate: invoice.status === 'unpaid' ? new Date(invoice.dueDate.split('/').reverse().join('-')) : undefined,
      paidDate: invoice.status === 'paid' ? new Date(invoice.invoiceDate.split('/').reverse().join('-')) : undefined,
      items: itemsDescription,
      paymentMethod: invoice.paymentMethod
    };
    
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  updateTransaction(invoice: SavedInvoice, itemsDescription: string): void {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transactionIndex = transactions.findIndex((t: Transaction) => t.invoiceNumber === invoice.invoiceNo);
    
    if (transactionIndex !== -1) {
      transactions[transactionIndex] = {
        ...transactions[transactionIndex],
        customerName: invoice.billingName,
        amount: invoice.totalAmount,
        status: invoice.status,
        dueDate: invoice.status === 'unpaid' ? new Date(invoice.dueDate.split('/').reverse().join('-')) : undefined,
        paidDate: invoice.status === 'paid' ? new Date(invoice.invoiceDate.split('/').reverse().join('-')) : undefined,
        items: itemsDescription,
        paymentMethod: invoice.paymentMethod
      };
      
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }
  
  markAsPaid(invoice: SavedInvoice): void {
    if (confirm(`Mark invoice ${invoice.invoiceNo} as paid for ${invoice.billingName}?`)) {
      const invoiceIndex = this.savedInvoices.findIndex(inv => inv.id === invoice.id);
      
      if (invoiceIndex !== -1) {
        // Update invoice status
        this.savedInvoices[invoiceIndex].status = 'paid';
        this.savedInvoices[invoiceIndex].paidAmount = invoice.totalAmount;
        this.savedInvoices[invoiceIndex].paidDate = new Date().toLocaleDateString('en-GB');
        this.savedInvoices[invoiceIndex].paymentMethod = 'Cash'; // Default payment method
        
        // Update transaction
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const transactionIndex = transactions.findIndex((t: Transaction) => t.invoiceNumber === invoice.invoiceNo);
        
        if (transactionIndex !== -1) {
          transactions[transactionIndex].status = 'paid';
          transactions[transactionIndex].paidDate = new Date();
          transactions[transactionIndex].paymentMethod = 'Cash';
          localStorage.setItem('transactions', JSON.stringify(transactions));
        }
        
        // Save updated invoices
        localStorage.setItem('savedInvoices', JSON.stringify(this.savedInvoices));
        this.filteredInvoices = [...this.savedInvoices];
        
        alert('Invoice marked as paid successfully!');
      }
    }
  }
  resetForm(): void {
    // Reset edit mode
    this.isEditMode = false;
    this.editingInvoiceId = null;
    
    // Reset all form fields
    this.transportMode = '';
    this.vehicleNo = '';
    this.referenceNo = '';
    this.billingName = '';
    this.billingAddress = '';
    this.billingPhone = '';
    this.billingGst = '';
    this.shippingName = '';
    this.shippingAddress = '';
    this.shippingPhone = '';
    this.shippingGst = '';
    this.specialDiscount = 0;
    this.shippingHandling = 0;
    
    // Reset invoice items
    this.invoiceItems = [
      {
        sno: 1,
        description: '',
        quantity: 0,
        unit: 0,
        unitPrice: 0,
        taxRate: 0,
        subTotal: 0,
        total: 0
      }
    ];
    
    // Generate new invoice number and date
    this.generateInvoiceNumber();
    this.setCurrentDate();
     this.setDueDate();
   
    // Clear search
    this.searchTerm = '';
    this.filteredInvoices = [...this.savedInvoices];
  }
  
  searchInvoices(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredInvoices = [...this.savedInvoices];
    } else {
      this.filteredInvoices = this.savedInvoices.filter(invoice =>
        invoice.billingName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }


  
  viewInvoice(invoice: SavedInvoice): void {
    // Set edit mode
    this.isEditMode = true;
    this.editingInvoiceId = invoice.id;
    
    // Load invoice data into form
    this.invoiceNo = invoice.invoiceNo;
    this.invoiceDate = invoice.invoiceDate;
    this.transportMode = invoice.transportMode;
    this.vehicleNo = invoice.vehicleNo;
    this.referenceNo = invoice.referenceNo;
    this.billingName = invoice.billingName;
    this.billingAddress = invoice.billingAddress;
    this.billingPhone = invoice.billingPhone;
    this.billingGst = invoice.billingGst;
    this.shippingName = invoice.shippingName;
    this.shippingAddress = invoice.shippingAddress;
    this.shippingPhone = invoice.shippingPhone;
    this.shippingGst = invoice.shippingGst;
    this.invoiceItems = [...invoice.items];
    this.specialDiscount = invoice.specialDiscount;
    this.shippingHandling = invoice.shippingHandling;
    this.isPaid = invoice.status === 'paid';
    this.paymentMethod = invoice.paymentMethod || '';
    this.dueDate = invoice.dueDate;
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  deleteInvoice(id: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      const invoice = this.savedInvoices.find(inv => inv.id === id);
      
      if (invoice) {
        // Delete associated transaction
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const updatedTransactions = transactions.filter((t: Transaction) => t.invoiceNumber !== invoice.invoiceNo);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      }
      
      // Update both arrays
      this.savedInvoices = this.savedInvoices.filter(inv => inv.id !== id);
      
      // Update filtered invoices by removing the deleted invoice first
      this.filteredInvoices = this.filteredInvoices.filter(inv => inv.id !== id);
      
      // Then apply any active search filter if needed
      if (this.searchTerm.trim() !== '') {
        this.searchInvoices();
      }
      
      localStorage.setItem('savedInvoices', JSON.stringify(this.savedInvoices));
      
      // If we're deleting the invoice currently being edited, reset the form
      if (this.isEditMode && this.editingInvoiceId === id) {
        this.resetForm();
      }
      
      alert('Invoice deleted successfully!');
    }
  }
  
  addNewRow(): void {
    const newItem: InvoiceItem = {
      sno: this.invoiceItems.length + 1,
      description: '',
      quantity: 0,
      unit: 0,
      unitPrice: 0,
      taxRate: 0,
      subTotal: 0,
      total: 0
    };
    this.invoiceItems.push(newItem);
  }
  
  removeRow(index: number): void {
    if (this.invoiceItems.length > 1) {
      this.invoiceItems.splice(index, 1);
      // Update serial numbers
      this.invoiceItems.forEach((item, i) => {
        item.sno = i + 1;
      });
    }
  }
  
  calculateRow(index: number): void {
    const item = this.invoiceItems[index];
    item.subTotal = item.quantity * item.unit * item.unitPrice;
    const taxAmount = (item.subTotal * item.taxRate) / 100;
    item.total = item.subTotal + taxAmount;
  }
  
  getSubtotal(): number {
    return this.invoiceItems.reduce((sum, item) => sum + item.subTotal, 0);
  }
  
  getTotal(): number {
    return this.invoiceItems.reduce((sum, item) => sum + item.total, 0);
  }
  
  getSubtotalLessDiscount(): number {
    return this.getTotal() - this.specialDiscount;
  }
  
  getTotalTax(): number {
    return this.invoiceItems.reduce((sum, item) => {
      const taxAmount = (item.subTotal * item.taxRate) / 100;
      return sum + taxAmount;
    }, 0);
  }
  
  getTaxRate(): number {
    const subtotal = this.getSubtotal();
    const totalTax = this.getTotalTax();
    return subtotal > 0 ? (totalTax / subtotal) * 100 : 0;
  }
  
  getBalanceDue(): number {
    return this.getSubtotalLessDiscount() + this.shippingHandling;
  }
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  }
  
  printInvoice(): void {
    window.print();
  }
  
  closeModal(): void {
    this.router.navigate(['/dashboard']);
  }
}


  //   deleteInvoice(id: number): void {
  //   if (confirm('Are you sure you want to delete this invoice?')) {
  //     const invoice = this.savedInvoices.find(inv => inv.id === id);
      
  //     if (invoice) {
  //       // Delete associated transaction
  //       const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  //       const updatedTransactions = transactions.filter((t: Transaction) => t.invoiceNumber !== invoice.invoiceNo);
  //       localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  //     }
      
  //     // Update both arrays
  //     this.savedInvoices = this.savedInvoices.filter(inv => inv.id !== id);
      
  //     // Update filtered invoices by removing the deleted invoice first
  //     this.filteredInvoices = this.filteredInvoices.filter(inv => inv.id !== id);
      
  //     // Then apply any active search filter if needed
  //     if (this.searchTerm.trim() !== '') {
  //       this.searchInvoices();
  //     }
      
  //     localStorage.setItem('savedInvoices', JSON.stringify(this.savedInvoices));
      
  //     // If we're deleting the invoice currently being edited, reset the form
  //     if (this.isEditMode && this.editingInvoiceId === id) {
  //       this.resetForm();
  //     }
      
  //     alert('Invoice deleted successfully!');
  //   }
  // }

  
//   printInvoice(): void {
//     window.print();
//   }
  
//     closeModal(): void {
//     this.router.navigate(['/dashboard']);
//   }
//   saveInvoice(): void {
//   // Validate form
//   if (!this.invoiceNo || !this.billingName) {
//     alert('Please fill Invoice Number and Billing Name at minimum');
//     return;
//   }

//   const hasValidItem = this.invoiceItems.some(item =>
//     item.description && item.quantity > 0 && item.unitPrice > 0
//   );

//   if (!hasValidItem) {
//     alert('Please add at least one item with description, quantity and price');
//     return;
//   }

//   this.invoiceService.generateBill({
//     invoiceNo: this.invoiceNo,
//     invoiceDate: this.invoiceDate,
//     billingName: this.billingName,
//     totalAmount: this.getBalanceDue(),
//     items: this.invoiceItems,
//     transportMode: this.transportMode,
//     vehicleNo: this.vehicleNo,
//     referenceNo: this.referenceNo,
//     billingAddress: this.billingAddress,
//     billingPhone: this.billingPhone,
//     billingGst: this.billingGst,
//     shippingName: this.shippingName,
//     shippingAddress: this.shippingAddress,
//     shippingPhone: this.shippingPhone,
//     shippingGst: this.shippingGst,
//     specialDiscount: this.specialDiscount,
//     shippingHandling: this.shippingHandling
//   }).subscribe({
//     next: (response: Blob) => {
//       const blob = new Blob([response], {
//         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//       });
//       const downloadUrl = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = downloadUrl;
//       a.download = `${this.invoiceNo}.xlsx`;
//       a.click();
//       alert('Invoice saved and downloaded successfully!');
//       this.resetForm();
//     },
//     error: (err) => {
//       console.error('Error saving invoice to backend', err);
//       alert('Failed to save invoice to backend');
//     }
//   });
// }

// export class InvoiceComponent {
//   invoiceRequest: InvoiceData = {
//     receivernamecloumncell: 'Receiver Name',
//     adderssrow1: 'Address Line 1',
//     adderssrow2: 'Address Line 2',
//     phonenumberrow: '9876543210',
//     gstrow: 'GST123456',

//     shippingnamecloumncell: 'Shipping Name',
//     shippingadderssrow1: 'Shipping Address Line 1',
//     shippingadderssrow2: 'Shipping Address Line 2',
//     shippingphonenumberrow: '9876543210',
//     shippinggstrow: 'GST654321',

//     transportmoderow: 'By Truck',
//     vechilenorow: 'TN01AB1234',
//     referencenorow: '123456',
//     specialDiscount: 50,
//     finaltaxvalue: 225,

//     products: [
//       { description: 'Rice', quantity: 10, unit: '25', unitPrice: '50.0', taxRate: '5.0' },
//       { description: 'Wheat', quantity: 5, unit: '50', unitPrice: '45.0', taxRate: '5.0' },
//       { description: 'Wheat', quantity: 5, unit: '50', unitPrice: '45.0', taxRate: '5.0' }
//     ]
//   };

//   constructor(private invoiceService: InvoiceService) {}

//   generateExcel() {
//     this.invoiceService['generateInvoice'](this.invoiceRequest).subscribe((response: BlobPart) => {
//       const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'invoice.xlsx';
//       a.click();
//       window.URL.revokeObjectURL(url);
//     });
//   }
// }

