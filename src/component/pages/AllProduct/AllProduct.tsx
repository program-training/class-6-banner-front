import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../interface";
import ProductCard from "../../mui/CardProduct";
import { Stack } from "@mui/material";

export default function  AllProduct(){


    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/products"
          );
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
    
    return (
        <Stack sx={{display:'flex',flexWrap:'wrap',flexDirection:'row',justifyContent:'center'}}>
          {data.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Stack>
      );
}