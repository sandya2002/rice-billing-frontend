import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isInvoiceModalOpen = false;
constructor(private router: Router) {}
isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  goToInvoices() {
    this.router.navigate(['/invoices']);
  }

  closeModal() {
    this.isInvoiceModalOpen = false;
  }

  // Sample placeholder data to make the form work
  invoiceNo = '';
  transportMode = '';
  invoiceDate = '';
  vehicleNo = '';
  referenceNo = '';
  billingName = '';
  billingAddress = '';
  billingPhone = '';
  billingGst = '';
  shippingName = '';
  shippingAddress = '';
  shippingPhone = '';
  shippingGst = '';
  isEditMode = false;
  specialDiscount = 0;

  invoiceItems = [
    {
      sno: 1,
      description: '',
      qty: 0,
      unit: 0,
      unitPrice: 0,
      taxRate: 0,
      subTotal: 0,
      total: 0,
    },
  ];

  calculateRow(i: number) {
    const item = this.invoiceItems[i];
    item.subTotal = item.qty * item.unit * item.unitPrice;
    item.total = item.subTotal + (item.subTotal * item.taxRate) / 100;
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

  getTaxRate(): number {
    return this.invoiceItems.reduce((sum, item) => sum + ((item.subTotal * item.taxRate) / 100), 0);
  }

  addNewRow() {
    this.invoiceItems.push({
      sno: this.invoiceItems.length + 1,
      description: '',
      qty: 0,
      unit: 0,
      unitPrice: 0,
      taxRate: 0,
      subTotal: 0,
      total: 0,
    });
  }

  removeRow(index: number) {
    this.invoiceItems.splice(index, 1);
    this.invoiceItems.forEach((item, idx) => (item.sno = idx + 1)); // reindex
  }
}
