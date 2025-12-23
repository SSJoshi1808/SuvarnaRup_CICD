import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to featch users order 
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders",
    async(_,{rejectWithValue})=>{
        try {
         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`, 
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    
                }
            });
        return response.data;

            
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
)

// Async thunk to featch the details  by ID
export const fetchOrdersDetails = createAsyncThunk("orders/fetchOrderDetails",
    async(orderId,{rejectWithValue})=>{
        try {
         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    
                }
            });
        return response.data;

            
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
)

const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserOrders.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
            state.error = null;
        })
        .addCase(fetchUserOrders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })

        .addCase(fetchOrdersDetails.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrdersDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.orderDetails = action.payload;
            state.error = null;
        })
        .addCase(fetchOrdersDetails.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})
export default orderSlice.reducer;