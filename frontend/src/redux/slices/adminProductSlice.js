import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const getAuthToken = () => `Bearer ${localStorage.getItem("userToken")}`;
// async thunk to featch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/featchProducts ",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/products`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch products" }
      );
    }
  }
);

// Async function to create a new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,
        {
          headers: {
            Authorization: getAuthToken(),
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to create product" }
      );
    }
  }
);

// Async to update an existsing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({
    id,
    name,
    description,
    price,
    discountPrice,
    countInStock,
    sku,
    category,
    collections,
    img,
    rating,
    numReviews,
    tags,
    dimension,
    weight,
  }) => {
    const productData = {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      collections,
      img,
      rating,
      numReviews,
      tags,
      dimension,
      weight,
    };
    const response = await axios.put(
      `${API_URL}/api/admin/products/${id}`,
      productData,
      {
        headers: {
          Authorization: getAuthToken(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

// Async thunk to delete the product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      });
      return id;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete product" }
      );
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload || [];
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.products)) {
          state.products.push(action.payload);
        } else {
          state.products = [action.payload];
        }
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create product";
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = Array.isArray(state.products)
          ? state.products.findIndex(
              (product) => product._id === action.payload._id
            )
          : -1;
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products = state.products.filter(
            (product) => product._id !== action.payload
          );
        }
      });
  },
});
export default adminProductSlice.reducer;
