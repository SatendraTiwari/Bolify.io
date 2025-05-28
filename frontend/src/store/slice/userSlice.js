import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setShowLogin } from "./loginShow";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        leaderboard: [],
        error: null,
    },
    reducers: {
        // Register Store
        
        registerRequest(state,action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
        },
        registerSuccess(state,action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        registerFailed(state,action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
        },

        // Login Store 

        loginRequest(state,action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
        },
        loginSuccess(state,action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailed(state,action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
        },

        // loginSuccess(state, action) {

        //     state.isAuthenticated = true;
        //     state.user = action.payload; // Assuming payload contains user data
        //     state.error = null;
        // },

        //User featch 

        fetchUserRequest(state,action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
        },
        fetchUserSuccess(state,action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        fetchUserFailed(state,action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
        },

        //Logout store 

        logoutSuccess(state, action) {
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
        },

        fetchLeaderboardRequest(state,action) {
            state.loading = true;
            state.leaderboard = [];
        },
        fetchLeaderboardSuccess(state,action) {
            state.loading = false;
            state.leaderboard = action.payload;
        },
        fetchLeaderboardFailed(state,action) {
            state.loading = false;
            state.leaderboard = [];
        },
        // Edit Profile
        editProfileRequest(state,action){
            state.loading = true;
            state.user = {};
        },
        editProfileSuccess(state,action){
            state.loading = false;
            state.user = action.payload;
        },
        editProfileFailed(state,action){
            state.loading = false;
            state.user = {};
        },

        clearAllErrors(state, action) {
            state.user = state.user;
            state.isAuthenticated = state.isAuthenticated;
            state.leaderboard = state.leaderboard;
            state.loading = false;
        },
    },
});


export const register = (data) => async(dispatch) => {
    dispatch(userSlice.actions.registerRequest());

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, data,
            {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
        
        dispatch(userSlice.actions.registerSuccess(response.data.user));
        toast.success(response.data.message);
        dispatch(userSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(userSlice.actions.registerFailed());
        toast.error(error.response.data.message);
        dispatch(userSlice.actions.clearAllErrors());
    }
}


export const login = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, userData, {
            withCredentials: true,
            headers:{"Content-Type" : "application/json"}
        }); // Adjust the endpoint as necessary
        
        dispatch(userSlice.actions.loginSuccess(response.data.user)); //Assuming response contains user data
        toast.success("Login successful!");
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loginFailed());
        toast.error("Login failed!");
        dispatch(userSlice.actions.clearAllErrors());
    }
};




export const logout = () => async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, { withCredentials: true });
        alert(response.data.message);
        dispatch(userSlice.actions.logoutSuccess());
        // dispatch(setShowLogin({ loginShow: false }));
        toast.success(response.data.message);
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed());
        toast.error(error.response.data.message);
        dispatch(userSlice.actions.clearAllErrors());
    }
};

export const fetchUser = () => async (dispatch) => {

    dispatch(userSlice.actions.fetchUserRequest());

    try {                             //profile url
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, { withCredentials: true });

        dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
        toast.success(response.data.message);
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.fetchUserFailed());
        toast.error(error.response?.data.message);
        dispatch(userSlice.actions.clearAllErrors());

    }
};

export const fetchLeaderboard = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchLeaderboardRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/leaderboard`,{
            withCredentials : true,
        })

        dispatch(userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard))
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.fetchLeaderboardFailed());
        dispatch(userSlice.actions.clearAllErrors());
    }
}


export const editProfile = (data) => async (dispatch) => {
    dispatch(userSlice.actions.editProfileRequest());

    try {
        const respones = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/edit-profile`, data, {
            withCredentials: true,
            headers: {"Content-Type": "multipart/form-data"}
        });
        dispatch(userSlice.actions.editProfileSuccess(respones.data.user));
        toast.success(respones.data.message);
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.editProfileFailed());
        toast.error(error.response.data.message);
        dispatch(userSlice.actions.clearAllErrors());
        
    }
}



export default userSlice.reducer;
