import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    homeContents: [],
    pinnedContents: [],
    binContents: [],
    impContents: [],
    archivedContents: [],
}
const removeById = (arr,content)=>{
    return arr.filter((item)=>item.id!==content.id)
}
const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
        addToBin: (state,action)=>{
            state.binContents.push(action.payload)
        },
        deleteFromBin: (state,action)=>{
            state.binContents = removeById(state.binContents, action.payload);
        }, 
        addToHome: (state,action)=>{
            state.homeContents.push(action.payload)
        },    
        deleteFromHome: (state,action)=>{
            state.homeContents = removeById(state.homeContents, action.payload);
        },
        addToImportant: (state,action)=>{
            state.impContents.push(action.payload)
        },
        deleteFromImportant: (state,action)=>{
            state.impContents = removeById(state.impContents, action.payload);
        },
        addToArchive: (state,action)=>{
            state.archivedContents.push(action.payload)
        },
        deleteFromArchive: (state,action)=>{
            state.archivedContents = removeById(state.archivedContents, action.payload);
        },        
        pinNote: (state,action)=>{
            state.pinnedContents.push(action.payload)
        },
        unpinNote: (state,action)=>{
            state.pinnedContents = removeById(state.pinnedContents, action.payload);
        }
    }
})
export const { addToBin, deleteFromBin, addToHome, deleteFromHome, addToImportant, 
    deleteFromImportant,addToArchive,deleteFromArchive, pinNote, unpinNote } = notesSlice.actions;
export default notesSlice.reducer