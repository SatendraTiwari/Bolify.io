import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {toast} from 'react-toastify'


const commissionSlice = createSlice({
    name: "commission",
    initialState:{
        loading : false,
    },
    reducers: {
        postCommissionProofRequest(state,action){
            state.loading = true;
        },
        postCommissionProofSuccess(state,action){
            state.loading = false;
        },

        postCommissionProofFailed(state,action){
            state.loading = false;
        },
    },
});


export const postCommissionProof = (data) => async (dispatch) => {
    dispatch(commissionSlice.actions.postCommissionProofRequest());
    console.log()
    try {
        const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/commission/proof`, data,{
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        })

        dispatch(commissionSlice.actions.postCommissionProofSuccess());
        toast.success(response.data.message);
    } catch (error) {
        dispatch(commissionSlice.actions.postCommissionProofFailed());
        toast.error(error.response.data.message);
        console.error(error.response.data.message);
    }
}


export default commissionSlice.reducer;
