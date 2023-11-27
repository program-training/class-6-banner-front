import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { Product } from "../interface/interface";
interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Card
      key={Date.now() * Math.random()}
      onClick={() => onClick()}
      sx={{
        margin: "15px",
        width: "100%",
        maxWidth: "230px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s, transform 0.3s",
        ":hover": {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          transform: "translateY(-10px)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          alt={`${product?.title}`}
          src={`${product?.image}`}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product?.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "3em",
            }}
          >
            {product.description}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">${product.price}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
