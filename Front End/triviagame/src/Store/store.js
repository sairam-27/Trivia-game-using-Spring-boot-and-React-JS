import { configureStore } from "@reduxjs/toolkit";
import authStore from "./auth-store";
import quizStore from "./quiz-store";

const store = configureStore({
    reducer : {
        auth : authStore,
        quiz : quizStore,
    }
})

export default store;