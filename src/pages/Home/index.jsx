import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState,useReducer } from 'react';
import { Typography, Divider, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToHome,addToBin, addToImportant, togglePin, toggleArchive,editNote } from '../../slices/notesSlice';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {v4 as uuid} from 'uuid'
const Home = ()=>{
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const initialEditState = {
        editId: '',
        editTitle: '',
        editDesc: ''
    };
    function editReducer(state,action){
        if(action.type==="TITLE_EDIT"){
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
        else if(action.type==="ID_EDIT"){
            return {
                ...state,
                editId: action.payload
            }
        }
        else if(action.type==="RESET"){
            return initialEditState;
        }
        else
            return state;
    }
    const [state, editDispatch] = useReducer(editReducer,initialEditState);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const homeContents = useSelector(state=>{
        return state.notes.allNotes.filter((content)=>!content.isDeleted && !content.isImportant && !content.isPinned && !content.isArchived)
    })
    const pinnedContents = useSelector(state=>{
        return state.notes.allNotes.filter((content)=>!content.isDeleted && !content.isArchived && content.isPinned) //isImportant will never be together true--->so no need to check isImportant here
    })

    const createNote = ()=>{
        if(title!=='' || desc!==''){
            dispatch(addToHome({id: uuid(), title: title, desc: desc}))
            setTitle('')
            setDesc('')
        }
        else{
            alert("Empty note can't be created")
        }
    }
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
        setIsEditing(prev=>!prev)
    }
    return (
        <div className="mt-[64px] w-full min-h-screen flex flex-col gap-4 items-center">
            <div className="flex flex-col mt-[10px] items-center justify-center p-2 border-1
             border-gray-200 rounded-2xl max-w-80 min-w-80 mx-2 mb-8">
                <textarea rows="1" placeholder="Enter title" value={title}
                    className='p-1 w-full resize-none focus:outline-none focus:border-gray-200 
                        focus:border-[1px]' onChange={(e)=>setTitle(e.target.value)}>
                </textarea>

                <Divider className='w-full my-1'/>

                <textarea rows="4" placeholder="Enter text" value={desc}
                    className='p-1 w-full resize-none focus:outline-none focus:border-gray-200 
                        focus:border-[1px]' onChange={(e)=>setDesc(e.target.value)}>
                </textarea>

                <div className="flex w-full mt-1">

                    <div className="flex-grow"></div>
                    <div className="flex justify-center items-center hover:bg-gray-100 
                        hover: cursor-pointer active:scale-95 p-1 rounded-2xl" 
                        onClick={createNote}
                    >
                        <AddCircleOutlineIcon/>
                    </div>

                </div>
            </div>
            {
                homeContents.length===0 && pinnedContents.length===0 &&
                (
                    <div className="p-10 text-center text-wrap mb-10 flex flex-col w-full max-w-7xl">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-2">No Notes Yet!</h2>
                    <p className="text-gray-500 mb-6">Start organizing your thoughts. Add your first note above.</p>
                    </div>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl items-start">
                {
                    pinnedContents?.length>0 && 
                    <div className="flex flex-col gap-4 items-center mb-8 mx-4">
                        <div className="font-bold text-xl text-center text-wrap">Pinned Notes</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {
                                pinnedContents.map((content,idx)=>{
                                    return (
                                        <div className="flex flex-col gap-0.5 items-center p-2 border-1
                                            border-gray-200 rounded-2xl w-full min-h-52 max-h-52" key={content.id}>
                                            <div className="flex w-full">
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
                                                <div className="flex-grow"></div>
                                                <div className="flex justify-center items-center hover:bg-gray-100 hover: cursor-pointer 
                                                    active:scale-95 p-0.5 rounded-full" onClick={()=>dispatch(togglePin(content))}>
                                                    <PushPinIcon/>
                                                </div>
                                            </div>

                                            
                                            <Divider className='w-full my-1'/>
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

                                            <div className="flex w-full">
                                                <div className="flex-grow"></div>
                                                {
                                                    state.editId!==content.id && (
                                                        <div className="flex gap-1 justify-center items-center p-0.5">
                                                            <IconButton onClick={()=>dispatch(toggleArchive(content))}><ArchiveIcon/></IconButton>
                                                            <IconButton onClick={()=>dispatch(addToBin(content))}><DeleteOutlineOutlinedIcon/></IconButton>
                                                            <IconButton onClick={()=>startEditNote(content)} disabled={isEditing}><EditOutlinedIcon/></IconButton>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    state.editId==content.id && (
                                                        <div className="flex gap-1 justify-center items-center p-0.5">
                                                            <div className="p-1 hover:cursor-pointer hover:bg-gray-200 rounded-xl active:scale-95 text-center" onClick={saveEdit}>Save</div>
                                                            <div className="p-1 hover:cursor-pointer hover:bg-gray-200 rounded-xl active:scale-95 text-center" onClick={cancelEdit}>Cancel</div>
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
                }
                {
                    homeContents?.length>0 && 
                    <div className="flex flex-col gap-4 items-center mb-8 mx-4">
                        <div className="font-bold text-xl text-center text-wrap">Other Notes</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {
                                homeContents.map((content,idx)=>{
                                    return (
                                        <div key={content.id} className="flex flex-col gap-0.5 items-center p-2 border-1
                                            border-gray-200 rounded-2xl w-full min-h-52 max-h-52">
                                            <div className="flex w-full">
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
                                                <div className="flex-grow"></div>
                                                <div className="flex justify-center items-center hover:bg-gray-100 
                                                    hover: cursor-pointer active:scale-95 p-0.5 rounded-full" 
                                                    onClick={()=>dispatch(togglePin(content))}>
                                                    <PushPinOutlinedIcon/>
                                                </div>
                                            </div>

                                            <Divider className='w-full my-1'/>

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
                                            <div className="flex w-full">
                                                <div className="flex-grow"></div>
                                                {
                                                    state.editId!==content.id && (
                                                        <div className="flex gap-1 justify-center items-center p-0.5">
                                                            <IconButton onClick={()=>dispatch(toggleArchive(content))}><ArchiveIcon/></IconButton>
                                                            <IconButton onClick={()=>dispatch(addToBin(content))}><DeleteOutlineOutlinedIcon/></IconButton>
                                                            <IconButton onClick={()=>startEditNote(content)} disabled={isEditing}><EditOutlinedIcon/></IconButton>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    state.editId===content.id && (
                                                        <div className="flex gap-1 justify-center items-center p-0.5">
                                                            <div className="p-1 hover:cursor-pointer hover:bg-gray-200 rounded-xl active:scale-95 text-center" onClick={saveEdit}>Save</div>
                                                            <div className="p-1 hover:cursor-pointer hover:bg-gray-200 rounded-xl active:scale-95 text-center" onClick={cancelEdit}>Cancel</div>
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
                }
            </div>
        </div>
    )
}
export default Home