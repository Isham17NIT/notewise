import { useState, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, IconButton } from '@mui/material';
import { addToBin, addToImportant,editNote } from '../../slices/notesSlice';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuid } from 'uuid'

const Important = ()=>{
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch()
    const importantContents = useSelector(state=>state.notes.allNotes.filter((content)=>!content.isDeleted && content.isImportant))
    const createNote = ()=>{
        if(title!=='' || desc!==''){
            dispatch(addToImportant({id: uuid(), title: title, desc: desc}))
            setTitle('')
            setDesc('')
        }
        else{
            alert("Empty note can't be created")
        }
    }

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
        setIsEditing(prev=>!prev)
    }
    
    

    return (
        <div className="mt-[64px] w-full min-h-screen flex flex-col gap-4 items-center">
            <div className="font-bold text-3xl text-center text-wrap mt-2">Important Notes</div>
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
                        <AddCircleIcon className="text-gray-500 dark:text-gray-200"/>
                    </div>

                </div>
            </div> 
            
            {
                importantContents?.length>0 && 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 w-full">
                    {
                        importantContents.map((content,idx)=>{
                            return (
                                <div key={content.id} className="flex flex-col gap-0.5 items-center p-2 border-1
                                    border-gray-200 rounded-2xl w-full min-h-52 max-h-52">
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
            }
            {
                importantContents.length===0 &&
                <div className="p-10 text-center text-wrap mb-10 flex flex-col w-full max-w-7xl">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-2">No Notes Yet!</h2>
                    <p className="text-gray-500 mb-6">Start organizing your thoughts. Add your first note above.</p>
                </div>
            }
        </div>
    )
}
export default Important