import { createSlice } from "@reduxjs/toolkit"

const initialState = {category : '',difficulty : '',selectedOptions:[]}

const quizSlice = createSlice({
    name : "Quiz",
    initialState,
    reducers : {
        setCategory(state,action){
            state.category = action.payload.category;
        },
        setDifficulty(state,action){
            state.difficulty = action.payload.difficulty;
        },
        setOptionSelectedForQuestion(state,action){
            state.selectedOptions.push(action.payload.data);
        },
        clearSelectedOptions(state){
            state.selectedOptions = [];
        }
    }
})

export const quizActions = quizSlice.actions; 

export default quizSlice.reducer;

