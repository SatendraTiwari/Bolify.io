import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {toast} from 'react-toastify'

const contactSlice = createSlice({
    name: "contact",
    initialState:{
        loading: false,
        error: null,
        contacts: [],
        contact: {}
    },

    reducers : {
        contactRequest(state, action){
            state.loading = true;
            state.error = null;
            state.contact = {};
        },
        contactSuccess(state, action){
            state.loading = false;
            state.contact = action.payload;
            state.error = null;
        },
        contactFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.contact = {};
        },
        contactListRequest(state, action){
            state.loading = true;
            state.error = null;
            state.contacts = [];
        },
        contactListSuccess(state, action){
            state.loading = false;
            state.contacts = action.payload;
            state.error = null;
        },
        contactListFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.contacts = [];
        },

    }

})


export const contact = (contactData) => async (dispatch) => {
    dispatch(contactSlice.actions.contactRequest());
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/contact/contact_message`, contactData);
        dispatch(contactSlice.actions.contactSuccess(response.data));
        toast.success("Contact added successfully");
    } catch (error) {
        dispatch(contactSlice.actions.contactFailed(error.response.data.message || error.message));
        toast.error(error.response.data.message || error.message);
    }
}


export default contactSlice.reducer;