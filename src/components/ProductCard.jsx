

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const inStock = product.stock && product.stock > 0;
  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": { boxShadow: 6 },
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          height: 200,
          objectFit: "contain",
          p: 2,
        }}
        onClick={handleCardClick}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Brand */}
        {product.brand && (
          <Typography variant="caption" fontWeight="bold">
            {product.brand}
          </Typography>
        )}

        {/* Title */}
        <Typography
          variant="subtitle1"
          fontWeight="600"
          sx={{
            mt: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </Typography>

        {/* Category */}
        {product.category && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            {product.category}
          </Typography>
        )}

        {/* Description
        {product.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description}
          </Typography>
        )} */}

        {/* Stock */}
        <Typography
          variant="caption"
          fontWeight="bold"
          sx={{
            mt: 1,
            color: inStock ? "success.main" : "error.main",
          }}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Typography>

        {/* Price */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            ₹{product.price}
          </Typography>

          {product.mrp && product.mrp > product.price && (
            <>
              <Typography
                variant="caption"
                sx={{ textDecoration: "line-through", color: "text.disabled" }}
              >
                ₹{product.mrp}
              </Typography>
              <Chip
                label={`${discount}% OFF`}
                size="small"
                color="error"
              />
            </>
          )}
        </Box>

        {/* Rating */}
        {product.rating && (
          <Typography variant="caption" sx={{ mt: 0.5 }}>
            ⭐ {product.rating}
          </Typography>
        )}

        {/* Details */}
        {product.details && (
          <Box component="ul" sx={{ mt: 1, pl: 2 }}>
            {product.details.slice(0, 3).map((detail, idx) => (
              <Typography key={idx} component="li" variant="caption">
                {detail}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>

      <Box sx={{ p: 2 }}>
  <Button
    fullWidth
    variant="outlined"
    disabled={!inStock}
    onClick={handleCardClick}
    sx={{
      backgroundColor: "#ffffff",
      color: "#6b7280",
      borderColor: "#d1d5db",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: "#f9fafb",
        borderColor: "#9ca3af",
      },
      "&.Mui-disabled": {
        backgroundColor: "#f3f4f6",
        color: "#9ca3af",
        borderColor: "#e5e7eb",
      },
    }}
  >
    {inStock ? "Buy Now" : "Out of Stock"}
  </Button>
</Box>

    </Card>
  );
};

export default ProductCard;
