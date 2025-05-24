import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {toast} from 'react-toastify'


const bidSlice = createSlice({
    name : 'bid',
    initialState : {
        loading : false,
        message : null,
    },
    reducers : {
        bidRequest(state,action) {
            state.loading = true;
            state.message = "";
        },
        bidSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
            console.log(action.payload.message);
        },
        bidFailed(state, action){
            state.loading = false;
            state.message = "";
        },
        clearAllBidErrors(state,action){
            state.loading = false;
            state.message = "";
        }
    },
})



export const placeBid = (id, data) => async(dispatch) => {
    dispatch(bidSlice.actions.bidRequest());

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/bid/place/${id}`, data, {
            withCredentials: true,
            headers : {'Content-Type' : "application/json"} 
        })

        dispatch(bidSlice.actions.bidSuccess(response.data));
        console.log(response.data);
        toast.success(response.data.message);
        dispatch(bidSlice.actions.clearAllBidErrors());
    } catch (error) {
        dispatch(bidSlice.actions.bidFailed());
        toast.error(error.response.data.message);
        dispatch(bidSlice.actions.clearAllBidErrors());
    }
}


export default bidSlice.reducer