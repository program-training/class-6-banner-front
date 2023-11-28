export interface Banner {
  _id: string;
  id:number
  image: {
      url: string;
      alt: string;
  };
  text: string;
  createdAt: Date;
  author: string;
  category: string;
  rating: number;
  sale?: number;
  productID: number;
}


export interface BannerFormData {

  id?: number;
  image: {
      url: File | null;
      alt: string;
  };
  text: string;
  createAt: Date;
  author: string;
  rating: number;
  sale: number;
  category: string;
  productID?: number;
}

export interface User {
    _id:string
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface Product {
  [x: string]: any;
  id: number;
  title: string;
  image:string;
  price: number;
  description: string;
  category: string;
  clickCount:number;
  quantity: number;
  attributes: Attributes[];
}
export interface Attributes {
  key: string;
  value: number | string;
}

export interface SearchResult {
  label: string;
  id: string;
}

export interface EditRequestData {
  id: number | undefined;
  image: { 
    url: string;
    alt: string;
  };
  text: string;
  createAt: Date;
  author: string;
  rating: number;
  sale: number;
  category: string;
  productID: number | undefined
}

export interface AddRequestData {
  id: number | undefined;
  image: {
    url: string | ArrayBuffer | null;
    alt: string;
  };
  text: string;
  createAt: Date;
  author: string;
  rating: number;
  sale: number;
  category: string;
  productID: string | undefined;
}