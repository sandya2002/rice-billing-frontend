export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  id: number;
  invoiceNo: string;
  invoiceDate: string;
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
