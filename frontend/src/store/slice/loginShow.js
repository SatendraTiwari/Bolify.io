import { createSlice } from "@reduxjs/toolkit";


const loginShowPage = createSlice({
    name: "logShow",
    initialState: {
        loginShow: true,
        sidebarShow : true,
    },
    reducers: {
        setShowLogin(state, action) {
            state.loginShow = action.payload.loginShow;
        
        },
        setSideBarShow(state,action){
            state.sidebarShow = action.payload.sidebarShow;
        }
    },
});

// export const setShowPage = (data) => (dispatch) => {
//     console.log(data);
//     console.log(dispatch)
//     dispatch(loginShowPage.actions.setShowLogin(!data)); // Dispatch the action
// };

export const { setShowLogin, setSideBarShow } = loginShowPage.actions;

export default loginShowPage.reducer;

