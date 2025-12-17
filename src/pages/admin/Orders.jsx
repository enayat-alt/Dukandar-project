

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   // ✅ Admin token from Redux
//   const adminToken = useSelector((state) => state.adminAuth.token);

//   // -------------------- FETCH ALL ORDERS FOR ADMIN --------------------
//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!adminToken) return;

//       try {
//         const res = await fetch("http://localhost:5000/orders", {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         });

//         const data = await res.json();
//         if (res.ok) {
//           setOrders(data);
//         } else {
//           console.error("Error:", data.message);
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };

//     fetchOrders();
//   }, [adminToken]);

//   // -------------------- DELETE ORDER --------------------
//   const deleteOrder = async (orderId) => {
//     if (!adminToken) return;

//     try {
//       const res = await fetch(
//         `http://localhost:5000/orders/${orderId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         setOrders((prev) => prev.filter((o) => o.id !== orderId));
//         alert("Order deleted and stock restored");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete order");
//     }
//   };

//   // -------------------- UI --------------------
//   if (orders.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
//         <h2 className="text-2xl font-bold mb-4">No Orders in Database</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-8 p-4">
//       <h2 className="text-2xl font-bold mb-6">All Orders</h2>

//       <div className="flex flex-col gap-4">
//         {orders.map((order) => (
//           <div key={order.id} className="border p-4 rounded shadow bg-white">
//             <div className="flex justify-between items-center">
//               <h3 className="font-semibold text-lg mb-2">Order #{order.id}</h3>

//               {/* DELETE BUTTON */}
//               <button
//                 onClick={() => deleteOrder(order.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Cancel Order
//               </button>
//             </div>

//             <p className="text-gray-600">
//               Date: {new Date(order.createdAt).toLocaleString()}
//             </p>

//             <p className="font-semibold text-pink-600 mt-2">
//               Total Price: ₹{order.totalPrice}
//             </p>

//             <div className="mt-3">
//               <h4 className="font-semibold mb-1">Items:</h4>
//               {order.items.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 mb-2 border p-3 rounded"
//                 >
//                   {item.image && (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   )}
//                   <div>
//                     <p className="font-semibold">{item.name}</p>
//                     <p>
//                       ₹{item.price} × {item.quantity}
//                     </p>
//                     <p>Total: ₹{item.total}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React from "react";
import { useGetAllOrdersQuery, useCancelOrderMutation } from "../../services/adminOrderApi";

const AdminOrders = () => {
  // ✅ Fetch all orders using RTK Query
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await cancelOrder(orderId).unwrap();
      alert("Order cancelled and stock restored");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Error fetching orders.</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow bg-white">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg mb-2">Order #{order.id}</h3>
              <button
                onClick={() => handleCancel(order.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            </div>
            <p className="text-gray-600">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="font-semibold text-pink-600 mt-2">
              Total Price: ₹{order.totalPrice}
            </p>
            <div className="mt-3">
              <h4 className="font-semibold mb-1">Items:</h4>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 mb-2 border p-3 rounded"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                    <p>Total: ₹{item.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
