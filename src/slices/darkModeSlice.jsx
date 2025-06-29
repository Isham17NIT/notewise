import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isDark : false
}
const darkModeSlice = createSlice({
    name:'darkMode',
    initialState,
    reducers:{
        toggleDarkMode: (state)=>{
            state.isDark = !state.isDark
        },
    }
})
export const {toggleDarkMode} = darkModeSlice.actions
export default darkModeSlice.reducer