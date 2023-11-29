import { useEffect } from "react";
import { Product } from "../../interface/interface";
import ProductCard from "../../Templates/CardProduct";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../rtk/hooks";
import { fetchProduct } from "../../../rtk/productslice";

export default function AllProduct() {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products);
  const Navigate = useNavigate();

  async function getProduct(){
      await dispatch(fetchProduct())
    }

  useEffect(() => {
     getProduct();
  }, []);

  if (status === "loading") {
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

  if (status === 'failed') {
    return <div>Error: {error}</div>;
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
              Navigate(`/banner/addBanner/${product.id}`);
            }}
            key={product.id}
            product={product}
          />
        ))}
      </Stack>
    </Box>
  );
}
