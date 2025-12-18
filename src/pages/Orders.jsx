

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserOrdersQuery, useCancelOrderMutation } from "../services/orderApi";
import { formatDate } from "../utils/helpers";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";

const Orders = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const { data: orders = [], isLoading, isError } = useGetUserOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleOpenDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrderId(null);
  };

  const handleConfirmCancel = async () => {
    try {
      await cancelOrder(selectedOrderId).unwrap();
      setSnackbar({ open: true, message: "Order cancelled successfully", severity: "success" });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.data?.message || "Failed to cancel order",
        severity: "error",
      });
    } finally {
      handleCloseDialog();
    }
  };

  if (isLoading) return <Typography align="center" mt={8}>Loading your orders...</Typography>;
  if (isError) return <Typography align="center" mt={8} color="error">Failed to load orders</Typography>;
  if (!orders.length)
    return (
      <Box maxWidth={600} mx="auto" mt={8} p={4} textAlign="center">
        <Typography variant="h5" fontWeight="bold" mb={2}>No Orders Yet</Typography>
        <Typography color="error">Place an order to see it here.</Typography>
      </Box>
    );

  return (
    <Box maxWidth={900} mx="auto" mt={8} p={2}>
      <Typography variant="h4" fontWeight="bold" mb={4}>My Orders</Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card elevation={3} sx={{ width: "100%", minHeight: 200, borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Order #{order.id}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {formatDate(order.createdAt || order.date)}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="medium" mt={1}>
                      Total: ₹{order.totalPrice}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDialog(order.id)}
                    sx={{ mt: { xs: 2, md: 0 } }}
                  >
                    Cancel Order
                  </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  {order.items?.length ? (
                    order.items.map((item, idx) => (
                      <Grid item xs={12} md={6} key={idx}>
                        <Card variant="outlined" sx={{ display: "flex", p: 1, alignItems: "center", gap: 2, minHeight: 100 }}>
                          <CardMedia
                            component="img"
                            image={`http://localhost:5000/uploads/${item.image}`}
                            alt={item.name}
                            sx={{ width: 80, height: 80, borderRadius: 1, objectFit: "cover" }}
                          />
                          <Box>
                            <Typography fontWeight="bold">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ₹{item.price} × {item.quantity}
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              Subtotal: ₹{item.total}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography color="text.secondary">No items found</Typography>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this order? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button color="error" onClick={handleConfirmCancel}>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Orders;
