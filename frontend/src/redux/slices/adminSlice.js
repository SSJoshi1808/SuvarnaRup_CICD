import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  featch all users(admin Only)
export const featchUsers = createAsyncThunk("admin/featchUsers",async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            }
        }
    );
   return response.data;
});

// add the create user action 
export const addUsers = createAsyncThunk("admin/addUsers",async(userData,{rejectWithValue})=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/create`,userData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
       return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
})

// update user
export const updateUser = createAsyncThunk("admin/updateUser",async({id,name,email,role}, {rejectWithValue})=>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/${id}`,
            {name,email,role},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
       return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
})

export const deleteUser = createAsyncThunk("admin/deleteUser",async(id, {rejectWithValue})=>{
    try {
         await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                }
            }
        )
       return id;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response.data);
    }
})

const adminSlice = createSlice({
    name: "admin",
    initialState:{
        users:[],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(featchUsers.pending,(state) => {
            state.loading=true
        }) 
        .addCase(featchUsers.fulfilled,(state,action) => {
            state.loading=false
            state.users = action.payload
        }) 
        .addCase(featchUsers.rejected,(state,action) => {
            state.loading=false
            state.error=action.error.message

        }) 


        .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUser.fulfilled,(state,action) => {
            state.loading = false;
            const updateUser = action.payload;
            const userIndex = state.users.findIndex((user) => user._id === updateUser._id);
            if(userIndex !== -1){
                state.users[userIndex]=updateUser
            }
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled,(state,action) => {
            state.loading = false;
            state.users=state.users.filter((user) => user._id!==action.payload)
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(addUsers.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addUsers.fulfilled,(state,action) => {
            state.loading=false
            state.users.push(action.payload.user)
        })
        .addCase(addUsers.rejected,(state,action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
});
export default adminSlice.reducer;