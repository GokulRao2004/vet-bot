import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mode:'light',
    isSidebarOpen : true
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers:{
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setIsSidebarOpen: (state) =>{
            state.isSidebarOpen = (!state.isSidebarOpen)
        }
    }
    })

    export const {setMode, setIsSidebarOpen} = globalSlice.actions;
export default globalSlice.reducer