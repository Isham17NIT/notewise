import { createSlice } from '@reduxjs/toolkit'

const getInitialState = ()=>{
    const allNotes = localStorage.getItem('allNotes');
    return allNotes ? JSON.parse(allNotes) : [];
}

const initialState = {
    allNotes: getInitialState()
}
const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
        addToBin: (state,action)=>{
            const content = state.allNotes.find((content)=>content.id===action.payload.id)
            content.isDeleted = true;
        },
        deleteFromBin: (state,action)=>{
            state.allNotes = state.allNotes.filter((content)=>content.id!==action.payload.id)
        },
        restoreFromBin: (state,action)=>{ //after restoring from bin--->it should go to other notes section of Home page
            const content = state.allNotes.find((content)=>content.id===action.payload.id)
            content.isDeleted = false;
            content.isImportant = false;
            content.isArchived = false;
            content.isPinned = false;
        },
        addToHome: (state,action)=>{
            const content = {
                ...action.payload,
                isDeleted: false,
                isImportant: false,
                isArchived: false,
                isPinned: false
            }
            state.allNotes.push(content)
        },  
        addToImportant: (state,action)=>{
            const content = {
                ...action.payload,
                isDeleted: false,
                isImportant: true,
                isArchived: false,
                isPinned: false
            }
            state.allNotes.push(content)
        },
        toggleArchive: (state,action)=>{
            const content = state.allNotes.find((content)=>content.id===action.payload.id)
            if(content.isArchived){
                content.isArchived = false;
            }
            else{
                content.isArchived = true;
            }
        },
        togglePin: (state,action)=>{
            const content = state.allNotes.find((content)=>content.id===action.payload.id)
            if(content.isPinned){
                content.isPinned = false;
            }
            else{
                content.isPinned = true;
            }
        }
    }
})
export const { addToBin, deleteFromBin, restoreFromBin, addToHome, addToImportant, 
    toggleArchive,togglePin } = notesSlice.actions;
export default notesSlice.reducer