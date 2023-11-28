import { useEffect, useState } from "react";
import { Product } from "../../interface/interface";
import ProductCard from "../../Templates/CardProduct";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { fetchProducts } from "../../../services/products.service";

export default function AllProduct() {
  const Navigate = useNavigate();
  const [products, setProduct] = useState<Product[]>();

  async function getProduct(){
    const data = await fetchProducts() 
    if (data)
    setProduct (data)}

  useEffect(() => {
     getProduct();
  }, []);

  if (!products) {
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
        {products.map((product: Product) => (
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
