import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";



const auctionSlice  =  createSlice({
    name: "auction",
    initialState : {
        loading : false,
        itemDetail : {},
        auctionDetail : {},
        auctionBidders : {},
        myAuctions : [],
        allAuctions : [],
    },
    reducers : {

        createAuctionRequest(state,action) {
            state.loading = true;
        },
        createAuctionSuccess(state,action) {
            state.loading = false;
        },
        createAuctionFailed(state,action) {
            state.loading = false;
        },


        getAllAuctionItemRequest(state,action) {
            state.loading = true;
        },
        getAllAuctionItemSuccess(state,action){
            state.loading = false;
            state.allAuctions = action.payload
        },
        getAllAuctionItemFailed(state,action){
            state.loading = false;
        },

        getAuctionDetailRequest(state,action) {
            state.loading = true;
            state.auctionDetail =  [];
            state.auctionBidders = [];
        },
        getAuctionDetailSuccess(state,action){
            state.loading = false;
            state.auctionDetail = action.payload.auctionItem;
            state.auctionBidders = action.payload.bidders;
        },
        getAuctionDetailFailed(state,action){
            state.loading = false;
            state.auctionDetail = [];
            state.auctionBidders = [];
        },


        getMyAuctionsRequest(state,action){
            state.loading = false;
            state.myAuctions = [];
        },
        getMyAuctionsSuccess(state,action){
            state.loading = true;
            state.myAuctions = action.payload
        },
        getMyAuctionsFailed(state,action){
            state.loading = false;
            state.myAuctions = [];
        },

        deleteAuctionItemRequest(state,action){
            state.action = false;

        },
        deleteAuctionItemSuccess(state,action){
            state.action = true;
        },
        deleteAuctionItemFailed(state,action){
            state.action = false;
        },
        republishItemRequest(state,action){
            state.action = false;

        },
        republishItemSuccess(state,action){
            state.action = true;
        },
        republishItemFailed(state,action){
            state.action = false;
        },

        resetSlice(state,action){
            state.loading = false;
            state.allAuctions = state.allAuctions;
            state.auctionDetail = state.auctionDetail;
            state.myAuctions = state.myAuctions;
            state.itemDetail = state.itemDetail;
        }
    }
})


export const createAuction = (formData) =>  async (dispatch) => {
    dispatch(auctionSlice.actions.createAuctionRequest());

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auctionitem/create`, formData, {
            withCredentials: true,
            headers: {"Content-Type" : "multipart/form-data"}
        })
        

        dispatch(auctionSlice.actions.createAuctionSuccess());
        toast.success(response.data.message);
        dispatch(getAllAuctionItems())
        alert("Auction Created Successfully");
        dispatch(auctionSlice.actions.resetSlice());
    } catch (error) {
        dispatch(auctionSlice.actions.createAuctionFailed());
        toast.error(error.response.data.message);
        dispatch(auctionSlice.actions.resetSlice());
    }
}



export const getAllAuctionItems = () =>  async (dispatch) => {
    dispatch(auctionSlice.actions.getAllAuctionItemRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auctionitem/allitems`,{withCredentials : true});
        dispatch(auctionSlice.actions.getAllAuctionItemSuccess(response.data.items));
        dispatch(auctionSlice.actions.resetSlice());
    } catch (error) {
        dispatch(auctionSlice.actions.getAllAuctionItemFailed());
        console.log(error)
        dispatch(auctionSlice.actions.resetSlice());
    }
}




export const getAuctionDetail = (id) =>  async (dispatch) => {
    dispatch(auctionSlice.actions.getAuctionDetailRequest());
    try { 
        // detail API
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auctionitem/auction/${id}`,{withCredentials : true});

        dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));
        dispatch(auctionSlice.actions.resetSlice());
    } catch (error) {
        dispatch(auctionSlice.actions.getAuctionDetailFailed());
        console.log(error)
        dispatch(auctionSlice.actions.resetSlice());
    }
}



export const getMyAuctionItems = () =>  async (dispatch) => {
    dispatch(auctionSlice.actions.getMyAuctionsRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auctionitem/myitems`,{withCredentials : true});
        dispatch(auctionSlice.actions.getMyAuctionsSuccess(response.data.items));

        dispatch(auctionSlice.actions.resetSlice());
    } catch (error) {
        dispatch(auctionSlice.actions.getMyAuctionsFailed());
        console.log(error)
        dispatch(auctionSlice.actions.resetSlice());
    }
}



export const republishAuction = (id,data) =>async(dispatch) => {
    dispatch(auctionSlice.actions.republishItemRequest());
    try {

        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auctionitem/item/republish/${id}`,data,{
            withCredentials: true,
            headers: {"Content-Type":"application/json"}
        })

        dispatch(auctionSlice.actions.republishItemSuccess());
        toast.success(response.data.message);
        dispatch(getMyAuctionItems());
        dispatch(getAllAuctionItems());
        dispatch(auctionSlice.actions.resetSlice());
        
    } catch (error) {
        dispatch(auctionSlice.actions.republishItemFailed());
        toast.error(response.data.message);
        dispatch(auctionSlice.actions.resetSlice());
    }
}

export const deleteAuction = (id) => async(dispatch) => {
    dispatch(auctionSlice.actions.deleteAuctionItemRequest());

    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auctionitem/delete/${id}`,{
            withCredentials: true,
        })
        
        dispatch(auctionSlice.actions.deleteAuctionItemSuccess());
        toast.success(response.data.message);
        dispatch(getMyAuctionItems());
        dispatch(getAllAuctionItems());
        dispatch(auctionSlice.actions.resetSlice());
    } catch (error) {
        dispatch(auctionSlice.actions.deleteAuctionItemFailed());
        toast.error(response.data.message);
        dispatch(auctionSlice.actions.resetSlice());
    }
}

export default auctionSlice.reducer;