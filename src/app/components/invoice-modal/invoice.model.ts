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
  receiverName: string;
  totalAmount: number;
  products: Product[];
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

export interface Product {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: string;
  taxRate: string;
}

// export interface InvoiceRequest {
//   receivernamecloumncell: string;
//   adderssrow1: string;
//   adderssrow2: string;
//   phonenumberrow: string;
//   gstrow: string;

//   shippingnamecloumncell: string;
//   shippingadderssrow1: string;
//   shippingadderssrow2: string;
//   shippingphonenumberrow: string;
//   shippinggstrow: string;

//   transportmoderow: string;
//   vechilenorow: string;
//   referencenorow: string;
//   specialDiscount: number;
//   finaltaxvalue: number;

//   products: Product[];
  
// }