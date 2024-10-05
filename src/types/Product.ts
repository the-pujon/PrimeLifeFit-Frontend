export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  description: string;
  photos: string[];
  stock: number;
}

//export const demoProducts: Product[] = [
//  {
//    id: "1",
//    name: "Laptop",
//    price: 999.99,
//    category: "Electronics",
//    description: "Powerful laptop",
//    images: ["https://picsum.photos/200/300"],
//    stock: 50,
//  },
//  {
//    id: "2",
//    name: "Smartphone",
//    price: 599.99,
//    category: "Electronics",
//    description: "Latest smartphone",
//    images: ["https://picsum.photos/200/301"],
//    stock: 100,
//  },
//  {
//    id: "3",
//    name: "Headphones",
//    price: 149.99,
//    category: "Audio",
//    description: "Noise-cancelling headphones",
//    images: ["https://picsum.photos/200/302"],
//    stock: 75,
//  },
//];
