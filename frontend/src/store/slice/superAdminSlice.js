import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllAuctionItems } from "./auctionSlice";

const superAdminSlice = createSlice({
    name: "superAdmin",
    initialState : {
        loading : false,
        monthlyRevenue : [],
        totalAuctioneers: [],
        totalBidders : [],
        paymentProofs: [],
        singlePaymentProof: {},
    },
    reducers : {
        requestForMonthlyRevenue(state, action) {
            state.loading = true;
            state.monthlyRevenue = [];
        },
        successForMonthlyRevenue(state, action) {
            state.loading = false;
            state.monthlyRevenue = action.payload;
        },
        failedForMonthlyRevenue(state, action) {
            state.loading = false;
            state.monthlyRevenue = [];
        },
        requestForAllUsers(state, action) {
            state.loading = true;
            state.totalAuctioneers = [];
            state.totalBidders = [];
        },
        succsssForAllUsers(state, action){
            state.loading = false;
            state.totalAuctioneers = action.payload.auctioneerArray;
            state.totalBidders = action.payload.bidderArray;
        },
        failedForAllUsers(state,action){
            state.loading = false;
            state.totalAuctioneers = [];
            state.bidderArray = [];
        },
        requestForPaymentProof(state,action) {
            state.loading = true;
            state.paymentProofs = [];
        },
        successForPaymentProof(state,action){
            state.loading = false;
            state.paymentProofs = action.payload;
        },
        failedForPaymentProof(state,action){
            state.loading = false;
            state.paymentProofs = [];

        },
        requestDeletePaymentProof(state,action) {
            state.loading = true;
        },
        successDeletePaymentProof(state,action) {
            state.loading = false;
        },
        failedDeletePaymentProof(state,action){
            state.loading = false;
        },
        requestForPaymentProofDetail(state,action){
            state.loading = true;
            state.singlePaymentProof = []
        },
        successForPaymentProofDetail(state,action) {
            state.loading = false;
            state.singlePaymentProof = action.payload
        },
        failedForPaymentProofDetail(state,action) {
            state.loading = false;
            state.singlePaymentProof = [];
        },
        requestForUpdatePaymentProof(state,action){
            state.loading = true;
        },
        successForUpdatePaymentProof(state,action) {
            state.loading = false;
        },
        failedForUpdatePaymentProof(state,action){
            state.loading = false;
        },
        requestForDeleteAuctionItem(state,action) {
            state.loading = true;
        },
        successForDeleteAuctionItem(state,action){
            state.loading = false;
        },
        failedForDeleteAuctionItem(state,action){
            state.loading = false;
        },
        requestForSinglePaymentProofDetail(state,action){
            state.loading = true;
            state.singlePaymentProof = [];
        },
        successForSinglePaymentProofDetail(state,action) {
            state.loading = false;
            state.singlePaymentProof = action.payload;
        },
        failureForSinglePaymentProofDetail(state,action) {
            state.loading = false;
            state.singlePaymentProof = [];
        },
        clearAllErrors(state,action) {
            state.loading = false;
            state.monthlyRevenue = state.monthlyRevenue;
            state.paymentProofs = state.paymentProofs;
            state.totalAuctioneers = state.totalAuctioneers;
            state.singlePaymentProof = state.singlePaymentProof;
            state.totalBidders = state.totalBidders;
        }

    }
})


export const getMonthlyRevenue = () => async (dispatch) => {
    dispatch(superAdminSlice.actions.requestForMonthlyRevenue());
    try {
        const response = await axios.get("http://localhost:8000/api/v1/superadmin/monthlyincome",{
            withCredentials: true,
        })

        console.log(response.data.totalMonthlyRevenue);

        dispatch(superAdmin.actions.successForMonthlyRevenue(response.data.totalMonthlyRevenue));
        toast.success("Monthly revenue data fetched successfully.");

    } catch (error) {
        dispatch(superAdminSlice.actions.failedForMonthlyRevenue());
        toast.error("Failed to fetch monthly revenue data.");
        
    }
}


export const getAllUsers = () => async(dispatch) => {
    dispatch(superAdminSlice.actions.requestForAllUsers());
    try {
        const respones = await axios.get(`http://localhost:8000/api/v1/superadmin/users/getall`,{
            withCredentials : true,
        })

        dispatch(superAdminSlice.actions.succsssForAllUsers(respones.data));
    } catch (error) {
        dispatch(superAdminSlice.actions.failedForAllUsers())
        console.error(error.respones.data.message)
    }
}



export const getAllPaymentProofs = () => async(dispatch) => {
    dispatch(superAdminSlice.actions.requestForPaymentProof());
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/superadmin/paymentproofs/getall`,{withCredentials : true,})
        dispatch(superAdminSlice.actions.successForPaymentProof(response.data));

    } catch (error) {
        dispatch(superAdminSlice.actions.failedForPaymentProof());
        console.error(error.respones.data.message);        
    }
}


export const paymentProofsDetail = (id) => async(dispatch) => {
    dispatch(superAdminSlice.actions.requestForPaymentProofDetail());

    try {
        const respones = await axios.get(`http://localhost:8000/api/v1/superadmin/paymentproof/${id}`,{withCredentials : true});

        dispatch(superAdminSlice.actions.successForPaymentProofDetail(respones.data));

    } catch (error) {
        dispatch(superAdminSlice.actions.failedForPaymentProofDetail());
        toast.error(error.respones.data.message);
    }
}


export const deletePaymentProof = (id) => async(dispatch) => {
    dispatch(superAdminSlice.actions.requestDeletePaymentProof());
    try {
        const response = await axios.delete(``,{withCredentials : true});
        
        dispatch(superAdminSlice.actions.successDeletePaymentProof());
        dispatch(getAllPaymentProofs());
        toast.success("Payment Proof is Delete")
    } catch (error) {
        dispatch(superAdminSlice.actions.failedDeletePaymentProof());
        toast.error(error.respones.data.message);
        console.error(error.respones.data.message);
    }

} 

export const updatePaymentProof = (id,status,amount) => async(dispatch) => {

    dispatch(superAdminSlice.actions.requestForUpdatePaymentProof());

    try {
        const response = await axios.put(`http://localhost:8000/api/v1/superadmin/paymentproof/status/update/${id}`,{status,amount},{
            withCredentials : true,
            headers : {"Content-Type" : "application/json"}
        })

        dispatch(superAdminSlice.actions.successForUpdatePaymentProof())
        toast.success(response.data.message);
        
    } catch (error) {
        dispatch(superAdminSlice.actions.failedForUpdatePaymentProof());
        toast.error(error.respones.data.message);

    }
}







export const deleteAuctionItem = (id) => async(dispatch) => {
    dispatch(superAdminSlice.actions.requestForDeleteAuctionItem());

    try {

        const response = await axios.delete(`http://localhost:8000/api/v1/superadmin/auctionitem/delete/${id}`,{
            withCredentials : true,
        })

        dispatch(superAdminSlice.actions.successForDeleteAuctionItem());
        dispatch(getAllAuctionItems())
        toast.success(response.data.message);
        
    } catch (error) {
        dispatch(superAdminSlice.actions.failedForDeleteAuctionItem());
        toast.error(error.respones.dataa.message);
    }
}


export const clearAllSuperAdminSliceErrors = () => async(dispatch) => {
    dispatch(superAdminSlice.actions.clearAllErrors());
}

export const getSinglePaymentProofDetail = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForSinglePaymentProofDetail());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/superadmin/paymentproof/${id}`,
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.successForSinglePaymentProofDetail(
        response.data.paymentProofDetail
      )
    );
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForSinglePaymentProofDetail());
    console.error(error.response.data.message);
  }
};


export default superAdminSlice.reducer;
