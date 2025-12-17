

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   useGetUserOrdersQuery,
//   useCancelOrderMutation,
// } from "../services/orderApi";
// import { formatDate } from "../utils/helpers";

// const Orders = () => {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);

//   React.useEffect(() => {
//     if (!user) navigate("/login");
//   }, [user, navigate]);

//   const { data: orders = [], isLoading, isError } = useGetUserOrdersQuery();
//   const [cancelOrder] = useCancelOrderMutation();

//   const handleCancel = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       await cancelOrder(orderId).unwrap();
//       alert("Order cancelled successfully");
//     } catch (err) {
//       alert(err?.data?.message || "Failed to cancel order");
//     }
//   };

//   if (isLoading) return <p className="text-center mt-8">Loading your orders...</p>;
//   if (isError) return <p className="text-center mt-8 text-red-500">Failed to load orders</p>;
//   if (!orders.length)
//     return (
//       <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
//         <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
//         <p className="text-red-400">Place an order to see it here.</p>
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto mt-8 p-4 flex flex-col gap-6">
//       <h2 className="text-2xl font-bold mb-4">My Orders</h2>

//       {orders.map((order) => (
//         <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div>
//               <h3 className="font-semibold text-lg">Order #{order.id}</h3>
//               <p className="text-gray-600 text-sm">
//                 Date: {formatDate(order.createdAt || order.date)}
//               </p>
//               <p className="font-semibold text-gray-900 mt-1 text-lg">
//                 Total: ₹{order.totalPrice}
//               </p>
//             </div>

//             <button
//               onClick={() => handleCancel(order.id)}
//               className="mt-3 md:mt-0 bg-white text-red-400 border border-gray-300 px-4 py-1 rounded hover:bg-gray-100 transition"
//             >
//               Cancel Order
//             </button>
//           </div>

//           <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {order.items?.length ? (
//               order.items.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-4 border p-3 rounded bg-gray-50"
//                 >
//                   {item.image && (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded"
//                     />
//                   )}
//                   <div className="flex-1 flex flex-col gap-1">
//                     <p className="font-semibold text-gray-900">{item.name}</p>
//                     <p className="text-gray-700 text-sm">
//                       ₹{item.price} × {item.quantity}
//                     </p>
//                     <p className="text-gray-900 font-medium">
//                       Subtotal: ₹{item.total}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No items found</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Orders;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserOrdersQuery, useCancelOrderMutation } from "../services/orderApi";
import { formatDate } from "../utils/helpers";
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

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

  if (isLoading) return <p className="text-center mt-8">Loading your orders...</p>;
  if (isError) return <p className="text-center mt-8 text-red-500">Failed to load orders</p>;
  if (!orders.length)
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-red-400">Place an order to see it here.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              <p className="text-gray-600 text-sm">
                Date: {formatDate(order.createdAt || order.date)}
              </p>
              <p className="font-semibold text-gray-900 mt-1 text-lg">
                Total: ₹{order.totalPrice}
              </p>
            </div>

            <Button
              variant="outlined"
              color="error"
              onClick={() => handleOpenDialog(order.id)}
              className="mt-3 md:mt-0"
            >
              Cancel Order
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.items?.length ? (
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border p-3 rounded bg-gray-50"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-gray-700 text-sm">
                      ₹{item.price} × {item.quantity}
                    </p>
                    <p className="text-gray-900 font-medium">
                      Subtotal: ₹{item.total}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items found</p>
            )}
          </div>
        </div>
      ))}

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
    </div>
  );
};

export default Orders;
