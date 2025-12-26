
import React, { useState } from "react";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "../../services/adminApi";

const Products = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.category ||
      newProduct.stock === "" ||
      !newProduct.description ||
      !newProduct.image
    ) {
      setError("Please fill all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("stock", newProduct.stock);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image);

    try {
      await addProduct(formData).unwrap();
      setSuccess("Product added successfully!");
      setNewProduct({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: null,
      });
    } catch (err) {
      setError(err?.data?.message || "Failed to add product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err) {
        alert(err?.data?.message || "Failed to delete product");
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-4">Loading products...</p>;
  if (isError)
    return (
      <p className="text-center mt-4 text-red-500">
        Error loading products
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Admin Products</h2>

      <form
        onSubmit={handleAddProduct}
        className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6 p-4 bg-white shadow rounded"
      >
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Stock"
          min="0"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border p-2 rounded md:col-span-2"
          rows={2}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.files[0] })
          }
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-7"
        >
          Add Product
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Stock</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="py-2 px-4 border">{p.id}</td>
                <td className="py-2 px-4 border">{p.name}</td>
                <td className="py-2 px-4 border">{p.category}</td>
                <td className="py-2 px-4 border">₹{p.price}</td>
                <td className="py-2 px-4 border">{p.stock}</td>
                <td className="py-2 px-4 border max-w-xs text-sm text-gray-700">
                  {p.description}
                </td>
                <td className="py-2 px-4 border">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
