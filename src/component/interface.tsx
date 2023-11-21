export interface Banner {
        _id?: string;
        id: number;
        image: {
          url: string;
          alt: string;
        };
        text: string;
        createdAt: Date;
        author: string;
        category:string;
        rating: number;
        sale?:number
      }

export interface User {
    _id?:string
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
