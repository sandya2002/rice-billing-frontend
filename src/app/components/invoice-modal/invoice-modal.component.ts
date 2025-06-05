import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from './invoice-modal.service';
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
  
  // Saved Invoices
  savedInvoices: SavedInvoice[] = [];
  filteredInvoices: SavedInvoice[] = [];
  searchTerm: string = '';
  nextInvoiceId: number = 1;
  
  // Edit Mode Tracking
  isEditMode: boolean = false;
  editingInvoiceId: number | null = null;
  
  constructor(private router: Router, private invoiceService: InvoiceService ) { }
  
  ngOnInit(): void {
    this.setCurrentDate();
    this.loadSavedInvoices();
    this.generateInvoiceNumber();
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
    const invoiceCount = this.savedInvoices.length + 1;
    this.invoiceNo = `SAT/${year}/${String(invoiceCount).padStart(4, '0')}`;
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
  
  // saveInvoiceOne(): void {
  //   // Validate form
  //   if (!this.invoiceNo || !this.billingName) {
  //     alert('Please fill Invoice Number and Billing Name at minimum');
  //     return;
  //   }
    
  //   // Check if at least one item has data
  //   const hasValidItem = this.invoiceItems.some(item => 
  //     item.description && item.quantity > 0 && item.unitPrice > 0
  //   );
    
  //   if (!hasValidItem) {
  //     alert('Please add at least one item with description, quantity and price');
  //     return;
  //   }
    
  //   if (this.isEditMode && this.editingInvoiceId !== null) {
  //     // Update existing invoice
  //     const invoiceIndex = this.savedInvoices.findIndex(inv => inv.id === this.editingInvoiceId);
      
  //     if (invoiceIndex !== -1) {
  //       // Update the existing invoice
  //       this.savedInvoices[invoiceIndex] = {
  //         id: this.editingInvoiceId,
  //         invoiceNo: this.invoiceNo,
  //         invoiceDate: this.invoiceDate,
  //         billingName: this.billingName,
  //         totalAmount: this.getBalanceDue(),
  //         items: [...this.invoiceItems],
  //         transportMode: this.transportMode,
  //         vehicleNo: this.vehicleNo,
  //         referenceNo: this.referenceNo,
  //         billingAddress: this.billingAddress,
  //         billingPhone: this.billingPhone,
  //         billingGst: this.billingGst,
  //         shippingName: this.shippingName,
  //         shippingAddress: this.shippingAddress,
  //         shippingPhone: this.shippingPhone,
  //         shippingGst: this.shippingGst,
  //         specialDiscount: this.specialDiscount,
  //         shippingHandling: this.shippingHandling
  //       };
        
  //       // Update filtered invoices
  //       this.filteredInvoices = [...this.savedInvoices];
        
  //       // Save to localStorage
  //       localStorage.setItem('savedInvoices', JSON.stringify(this.savedInvoices));
        
  //       // Show success message
  //       alert('Invoice updated successfully!');
  //     }
  //   } else {
  //     // Create new invoice
  //     const newInvoice: SavedInvoice = {
  //       id: this.nextInvoiceId++,
  //       invoiceNo: this.invoiceNo,
  //       invoiceDate: this.invoiceDate,
  //       billingName: this.billingName,
  //       totalAmount: this.getBalanceDue(),
  //       items: [...this.invoiceItems],
  //       transportMode: this.transportMode,
  //       vehicleNo: this.vehicleNo,
  //       referenceNo: this.referenceNo,
  //       billingAddress: this.billingAddress,
  //       billingPhone: this.billingPhone,
  //       billingGst: this.billingGst,
  //       shippingName: this.shippingName,
  //       shippingAddress: this.shippingAddress,
  //       shippingPhone: this.shippingPhone,
  //       shippingGst: this.shippingGst,
  //       specialDiscount: this.specialDiscount,
  //       shippingHandling: this.shippingHandling
  //     };
      
  //     // Add to saved invoices
  //     this.savedInvoices.push(newInvoice);
  //     this.filteredInvoices = [...this.savedInvoices];
      
  //     // Save to localStorage
  //     localStorage.setItem('savedInvoices', JSON.stringify(this.savedInvoices));
      
  //     // Show success message
  //     alert('Invoice saved successfully!');
  //   }
    
  //   // Reset form
  //   this.resetForm();
  // }
  
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
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  deleteInvoice(id: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.savedInvoices = this.savedInvoices.filter(inv => inv.id !== id);
      this.filteredInvoices = this.savedInvoices.filter(inv => 
        inv.billingName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      localStorage.setItem('savedInvoices', JSON.stringify(this.savedInvoices));
      
      // If we're deleting the invoice currently being edited, reset the form
      if (this.isEditMode && this.editingInvoiceId === id) {
        this.resetForm();
      }
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
  
  printInvoice(): void {
    window.print();
  }
  
    closeModal(): void {
    this.router.navigate(['/dashboard']);
  }


  //   saveInvoice(): void {
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
  //       const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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
  //       alert('Error saving invoice. Please try again.');
  //     }
  //   });
  // }
  saveInvoice(): void {
  // Prepare invoice items excluding `sno`
  const cleanedItems = this.invoiceItems.map(item => ({
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
    unitPrice: item.unitPrice,
    taxRate: item.taxRate,
    subTotal: item.subTotal,
    total: item.total
  }));

  this.invoiceService.generateBill({
    invoiceNo: this.invoiceNo,
    invoiceDate: this.invoiceDate,
    billingName: this.billingName,
    totalAmount: this.getBalanceDue(),
    items: cleanedItems,
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
      alert('Error saving invoice. Please try again.');
    }
  });
}

}

