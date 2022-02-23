import { createSlice } from "@reduxjs/toolkit"

const initialState = {isLoggedIn : false,username : ''}

const authSlice = createSlice({
    name : "Auth",
    initialState,
    reducers : {
        login(state,action){
            state.isLoggedIn = true;
            state.username = action.payload.username
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("username",action.payload.username)
            localStorage.setItem("cookie",action.payload.cookie)
        },
        logout(state){
            state.isLoggedIn = false;
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            localStorage.removeItem("cookie")
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;

