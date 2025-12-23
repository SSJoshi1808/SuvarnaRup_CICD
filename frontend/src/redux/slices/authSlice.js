// // import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
// // import generateCalendar from "antd/es/calendar/generateCalendar";
// // import axios from "axios";
// // // retrive user info and token from localstorage if available
// // const userFromStorage = localStorage.getItem("userInfo")
// // ?JSON.parse(localStorage.getItem("userInfo")
// // ):null;
// // // check for an existing guest ID in the localStorage or generate a new one
// // const initialGuestId = 
// // localStorage.getItem("guestId") || `guest_${new Date().getItem()}`;
// // localStorage.setItem("guestId", initialGuestId);
// // // initial state
// // const initialState={
// //     user:userFromStorage,
// //     guestId:initialGuestId,
// //     loading:false,
// //     error:null
// // };

// // export const loginUser = createAsyncThunk("auth/loginUser",async(userData,{rejectWithValue})=>{
// //     try{
// //         const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData)
// //         localStorage.setItem("userInfo", JSON.stringify(response.data.user));
// //         localStorage.setItem("userToken", response.data.token);

// //         return response.data.user;
// //     }catch(err){
// //         return rejectWithValue(err.response.data);
// //     }
// // })

// // export const registerUser = createAsyncThunk("auth/registerUser",async(userData,{rejectWithValue})=>{
// //     try{
// //         const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData)
// //         localStorage.setItem("userInfo", JSON.stringify(response.data.user));
// //         localStorage.setItem("userToken", response.data.token);

// //         return response.data.user;
// //     }catch(err){
// //         return rejectWithValue(err.response.data);
// //     }
// // })

// // const authSlice = createSlice({
// //     name:"auth",
// //     initialState,
// //     reducers:{
// //         logout:(state)=>{
// //             state.user=null,
// //             state.guestId=`guest_${new Date().getTime()}`
// //             localStorage.removeItem("userInfo")
// //             localStorage.removeItem("userToken")
// //             localStorage.setItem("guestId",state.guestId)
// //         },
// //         generateNewGuestId :(state)=>{
// //             state.guestId=`guest_${new Date().getTime()}`;
// //             localStorage.setItem("guestId",state.guestId);
// //         }
// //     },
// //     extraReducers:(builder)=>{
// //         builder
// //             .addCase(loginUser.pending,(state)=>{
// //                 state.loading=true;
// //                 state.error =null
// //             })
// //             .addCase(loginUser.fulfilled,(state,action)=>{
// //                 state.loading=false;
// //                 state.error =action.payload;
// //             })
// //             .addCase(loginUser.rejected,(state,action)=>{
// //                 state.loading=false;
// //                 state.error =action.payload.message;
// //             })
// //             .addCase(registerUser.pending,(state)=>{
// //                 state.loading=true;
// //                 state.error =null
// //             })
// //             .addCase(registerUser.fulfiled,(state,action)=>{
// //                 state.loading=false;
// //                 state.error =action.payload;
// //             })
// //             .addCase(registerUser.rejected,(state,action)=>{
// //                 state.loading=false;
// //                 state.error =action.payload.message;
// //             });
// //     },
// // });

// // export const {logout , generateNewGuestId} =authSlice.actions;
// // export default authSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Retrieve user info and token from localStorage if available
// const userFromStorage = localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null;

// // Check for an existing guest ID in localStorage or generate a new one
// const initialGuestId = 
//     localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
// localStorage.setItem("guestId", initialGuestId);

// // Initial state
// const initialState = {
//     user: userFromStorage,
//     guestId: initialGuestId,
//     loading: false,
//     error: null
// };

// export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
//         localStorage.setItem("userInfo", JSON.stringify(response.data.user));
//         localStorage.setItem("userToken", response.data.token);

//         return response.data.user;
//     } catch (err) {
//         return rejectWithValue(err.response?.data || "Login failed");
//     }
// });

// export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
//         localStorage.setItem("userInfo", JSON.stringify(response.data.user));
//         localStorage.setItem("userToken", response.data.token);

//         return response.data.user;
//     } catch (err) {
//         return rejectWithValue(err.response?.data || "Registration failed");
//     }
// });

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         logout: (state) => {
//             state.user = null;
//             state.guestId = `guest_${new Date().getTime()}`;
//             localStorage.removeItem("userInfo");
//             localStorage.removeItem("userToken");
//             localStorage.setItem("guestId", state.guestId);
//         },
//         generateNewGuestId: (state) => {
//             state.guestId = `guest_${new Date().getTime()}`;
//             localStorage.setItem("guestId", state.guestId);
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.error = null;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload?.message || "Login failed";
//             })
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // state.user = action.payload;
//                 state.error = action.payload;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload?.message || "Registration failed";
//             });
//     },
// });

// export const { logout, generateNewGuestId } = authSlice.actions;
// export default authSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Retrieve user info and token from localStorage if available
// const userFromStorage = localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null;

// // Check for an existing guest ID in localStorage or generate a new one
// const initialGuestId = 
//     localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
// localStorage.setItem("guestId", initialGuestId);

// // Initial state
// const initialState = {
//     user: userFromStorage,
//     guestId: initialGuestId,
//     loading: false,
//     error: null
// };

// // Async Thunks for Authentication
// export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post('http://localhost:9000/api/users/login', userData);
        
//         if (response.data.success) { // Ensure API returns a success flag
//             localStorage.setItem("userInfo", JSON.stringify(response.data.user));
//             localStorage.setItem("userToken", response.data.token);
//             console.log("Login successful!");
//         } else {
//             console.error("Login failed:", response.data.message);
//         }
//     } catch (error) {
//         console.error("Error during login:", error.response ? error.response.data : error.message);
//     }
    
// });

// export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
//         localStorage.setItem("userInfo", JSON.stringify(response.data.user));
//         localStorage.setItem("userToken", response.data.token);

//         return response.data.user;
//     } catch (err) {
//         return rejectWithValue(err.response?.data || "Registration failed");
//     }
// });

// // Create Slice
// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         logout: (state) => {
//             state.user = null;
//             state.guestId = `guest_${new Date().getTime()}`;
//             localStorage.removeItem("userInfo");
//             localStorage.removeItem("userToken");
//             localStorage.setItem("guestId", state.guestId);
//         },
//         generateNewGuestId: (state) => {
//             state.guestId = `guest_${new Date().getTime()}`;
//             localStorage.setItem("guestId", state.guestId);
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.error = null;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload?.message || "Login failed";
//             })
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;  // Fixed: setting user after registration
//                 state.error = null;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload?.message || "Registration failed";
//             });
//     },
// });

// export const { logout, generateNewGuestId } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// Check for an existing guest ID in localStorage or generate a new one
const initialGuestId = 
    localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
    isAuthenticated: !!userFromStorage
};

// **Async Thunks for Authentication**
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
                userData
            );
            
            if (response.data.user && response.data.token) {
                localStorage.setItem("userInfo", JSON.stringify(response.data.user));
                localStorage.setItem("userToken", response.data.token);
                return response.data.user;
            } else {
                return rejectWithValue("Invalid response from server");
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            return rejectWithValue(errorMessage);
        }
    }
);

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);

        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("userToken", data.token);

        return data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
});

// **Redux Slice**
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId);
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
