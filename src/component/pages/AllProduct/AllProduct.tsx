import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../interface";
import ProductCard from "../../mui/CardProduct";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function  AllProduct(){

    const Navigate = useNavigate()
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
          <Typography variant="h3" > select product</Typography>
          {data.map((product: Product) => (
            <ProductCard onClick={()=>{Navigate(`/addBanner/${product.id}`)}} key={product.id} product={product} />
          ))}
        </Stack>
      );
}