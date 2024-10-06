export interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  photos: string[];
  stock: number;
}

export interface ProductFormData extends Omit<Product, "photos"> {
  photos: Array<{ file?: File; preview: string }>;
}
