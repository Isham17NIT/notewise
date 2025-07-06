import { Divider, IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {useReducer, useState} from 'react'
import {v4 as uuid} from 'uuid'
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { toggleArchive, addToBin, editNote } from "../../slices/notesSlice";
const Archive = ()=>{
    const dispatch = useDispatch();
    const archivedContents = useSelector(state=>{
       return state.notes.allNotes.filter((content)=>!content.isDeleted && content.isArchived)
    })
    const initialState = {
        editId: '',
        editTitle: '',
        editDesc: ''
    }
    const editReducer=(state,action)=>{
        if(action.type==="ID_EDIT"){
            return {
                ...state,
                editId: action.payload
            }
        }
        else if(action.type==="TITLE_EDIT"){
            return {
                ...state,
                editTitle: action.payload
            }
        }
        else if(action.type==="DESC_EDIT"){
            return {
                ...state,
                editDesc: action.payload
            }
        }
        else if(action.type==="RESET"){
            return initialState;
        }
        else{
            return state;
        }
    }
    const [state,editDispatch] = useReducer(editReducer,initialState);

    const [isEditing, setIsEditing] = useState(false);

    const saveEdit = ()=>{
        dispatch(editNote({id:state.editId, title:state.editTitle, desc:state.editDesc}))
        editDispatch({type:"RESET"})
        setIsEditing(false)
    }
    const cancelEdit = ()=>{
        editDispatch({type:"RESET"})
        setIsEditing(false)
    }
    const startEditNote = (content)=>{
        editDispatch({type:"TITLE_EDIT",payload:content.title})
        editDispatch({type:"DESC_EDIT",payload:content.desc})
        editDispatch({type:"ID_EDIT",payload:content.id})
        setIsEditing(true)
    }

    return (
        <div className="mt-[80px] w-full min-h-screen flex flex-col items-center">
            <div className="font-bold text-3xl text-center text-wrap">Archived Notes</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-full max-w-7xl">
                {
                    archivedContents.map((content,idx)=>{
                        return (
                            <div key={content.id} className="flex flex-col p-4 min-h-52 max-h-52 rounded-2xl border-1 border-gray-200 w-full">
                                {
                                    state.editId===content.id && (
                                        <textarea rows="1" value={state.editTitle}
                                            className='p-1 w-full resize-none focus:outline-none focus:border-gray-200 
                                                focus:border-[1px]' onChange={(e)=>editDispatch({type:"TITLE_EDIT",payload:e.target.value})}>
                                        </textarea>
                                    )
                                }
                                {
                                    state.editId!==content.id && (
                                        <div className="truncate overflow-hidden whitespace-nowrap">{content.title}</div>
                                    )
                                }

                                <Divider/>

                                {
                                    state.editId!==content.id && (
                                        <div className="overflow-y-auto max-h-30 break-words pre-wrap w-full">{content.desc}</div>
                                    )
                                }
                                {
                                    state.editId===content.id && (
                                        <textarea rows="4" value={state.editDesc}
                                            className='p-1 w-full resize-none focus:outline-none focus:border-gray-200 
                                                focus:border-[1px]' onChange={(e)=>editDispatch({type:"DESC_EDIT",payload:e.target.value})}>
                                        </textarea>
                                    )
                                }
                                <div className="flex-grow"></div>     
                                <div className="flex">
                                    <div className="flex-grow"></div> 
                                    {
                                        state.editId==content.id && (
                                            <div className="flex gap-1 justify-center items-center p-0.5">
                                                <div className="p-1 hover:cursor-pointer hover:bg-gray-200 rounded-xl active:scale-95 text-center" onClick={saveEdit}>Save</div>
                                                <div className="p-1 hover:cursor-pointer hover:bg-gray-200 rounded-xl active:scale-95 text-center" onClick={cancelEdit}>Cancel</div>
                                            </div>
                                        )
                                    }
                                    {
                                        state.editId!==content.id && (
                                            <div className="flex gap-1 justify-center items-center p-0.5">
                                                <IconButton onClick={()=>dispatch(toggleArchive(content))}><UnarchiveIcon/></IconButton>  
                                                <IconButton onClick={()=>dispatch(addToBin(content))}><DeleteOutlineIcon/></IconButton>   
                                                <IconButton onClick={()=>startEditNote(content)}><EditOutlinedIcon/></IconButton> 
                                            </div>
                                        )
                                    }
                                                                                        
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Archive