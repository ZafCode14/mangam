export interface Branch {
  inStock: number;
  address: string;
  phoneNumbers: string[];
}
export interface VendorBranch {
  active: boolean;
  maps: string;
  name: string;
  numbers: string[];
  address: string;
}
export interface Product {
  docID: string;
  brandDocID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  branches: {[key: string]: Branch};
}