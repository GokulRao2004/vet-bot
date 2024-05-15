import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false
}

const addPetRecordSlice = createSlice({
    name: 'addPetRecord',
    initialState,
    reducers:{
        setModalStatus: (state) => {
            state.isOpen = (!state.isOpen)
        },
        
    }
    })

    export const {setModalStatus} =addPetRecordSlice.actions;
export default addPetRecordSlice.reducer