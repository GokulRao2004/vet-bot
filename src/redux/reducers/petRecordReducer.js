import { createSlice } from "@reduxjs/toolkit";
import PetData from '../../mockData/mockDataPR.json'


const initialState = {
    pets: PetData,
  };
const PRSlice = createSlice({
    name: 'petRecords',
    initialState,
    reducers:{
        addNewPet : (state,action) => {
            return {
                ...state,
                pets: [...state.pets, action.payload],
              };
        }
    }
    })

    export const {addNewPet} = PRSlice.actions;
export default PRSlice.reducer