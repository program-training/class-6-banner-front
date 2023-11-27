import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../interface/interface";
import ProductCard from "../../Templates/CardProduct";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
const store = import.meta.env.VITE_STORE_SERVER;

export default function AllProduct() {
  const Navigate = useNavigate();
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`  ${store}/api/products`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <Box>
      <Typography sx={{ textAlign: "center", margin: "30px" }} variant="h3">
        {" "}
        select product
      </Typography>
      <Stack
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {data.map((product: Product) => (
          <ProductCard
            onClick={() => {
              Navigate(`/addBanner/${product.id}`);
            }}
            key={product.id}
            product={product}
          />
        ))}
      </Stack>
    </Box>
  );
}
