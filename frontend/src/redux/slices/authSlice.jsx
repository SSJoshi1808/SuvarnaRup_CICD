export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);

        if (data.success) {
            localStorage.setItem("userInfo", JSON.stringify(data.user));
            localStorage.setItem("userToken", data.token);
            return data.user; 
        } else {
            return rejectWithValue(data.message || "Login failed");
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "An error occurred during login");
    }
});

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


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId);
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        },

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