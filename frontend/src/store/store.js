import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./slice/userSlice";
import commissionReducer from './slice/commissionSlice'
import logShowReducer from  './slice/loginShow'
import auctionReducer from "./slice/auctionSlice";
import bidReducer from "./slice/bidSlice"
import superAdminResucer from './slice/superAdminSlice'
import contactReducer from './slice/contactSlice'
export const store = configureStore({
    reducer: {
        user: useReducer,
        commission: commissionReducer,
        logShow: logShowReducer,
        auction : auctionReducer,
        bid : bidReducer,
        superAdmin : superAdminResucer,
        contact: contactReducer,
    },
})