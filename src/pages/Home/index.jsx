import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToArchive, addToHome, addToImportant, deleteFromHome, pinNote } from '../../slices/notesSlice';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import LabelImportantOutlineIcon from '@mui/icons-material/LabelImportantOutline';
import {v4 as uuid} from 'uuid'
const Home = ()=>{
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch();
    const homeContents = useSelector(state=>{
        return state.notes.allNotes.filter((content)=>!content.isDeleted && !content.isImportant && !content.isPinned && !content.isArchived)
    })
    const pinnedContents = useSelector(state=>{
        return state.notes.allNotes.filter((content)=>!content.isDeleted && !content.isArchived && content.isPinned) //isImportant will never be together true--->so no need to check isImportant here
    })

    const getContent = ()=>{
        return { title: title, desc: desc }
    }
    const addNewNote = ()=>{
        const content = getContent()
        dispatch(addToHome(content))
    }
    const archiveNote = ()=>{
        const content = getContent()
        dispatch(addToArchive(content))
        dispatch(deleteFromHome(content))
    }
    const markImportant = ()=>{
        const content = getContent()
        dispatch(addToImportant(content))
        dispatch(deleteFromHome(content))
    }
    const pinTheNote = ()=>{
        const content = getContent()
        dispatch(pinNote(content))
        dispatch(deleteFromHome(content))
    }
    return (
        <div className="mt-[64px] w-full min-h-screen flex flex-col gap-4">
            <div className="flex flex-col mt-[10px] items-center justify-center p-2 border-1 border-gray-200 rounded-2xl max-w-96 mx-2">
                <textarea rows="1" placeholder="Enter title" 
                    className='p-1 w-full resize-none focus:outline-none focus:border-gray-200 focus:border-[1px]' onChange={(e)=>setTitle(e.target.value)}>
                </textarea>
                <Divider className='w-full my-1'/>
                <textarea rows="4" placeholder="Enter text" 
                    className='p-1 w-full resize-none focus:outline-none focus:border-gray-200 focus:border-[1px]' onChange={(e)=>setDesc(e.target.value)}>
                </textarea>
                <div className="flex w-full mt-1">
                    <div className="flex-grow"></div>
                    <div className="flex justify-center items-center hover:bg-gray-100 hover: cursor-pointer active:scale-95 p-1 rounded-2xl" onClick={addNewNote}>
                        <AddCircleOutlineIcon/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl">
                {/* {
                    pinnedContents?.length>0 && 
                    <div className="flex flex-col items-start justify-center">
                        <div className="font-bold text-xl text-center text-wrap">Pinned Notes</div>
                        <div className="">
                            {
                                pinnedContents.map((content,idx)=>{
                                    <div className="flex flex-col gap-2 mt-[10px] items-center justify-center p-2 border-1 border-gray-200 rounded-2xl max-w-96 mx-2">
                                        <div className="flex w-full">
                                            <div className="flex-grow"></div>
                                            <div className="flex justify-center items-center hover:bg-gray-100 hover: cursor-pointer active:scale-95 p-0.5 rounded-full" onClick={unpinNote}>
                                                <PushPinIcon/>
                                            </div>
                                        </div>
                                        <Typography variant="subtitle1" component="div" className='w-full p-1'>{content.title}</Typography>
                                        <Divider/>
                                        <Typography variant="subtitle1" component="div" className='w-full p-1'>{content.desc}</Typography>
                                        <div className="flex w-full">
                                            <div className="flex-grow"></div>
                                            <div className="flex justify-center items-center hover:bg-gray-100 hover: cursor-pointer active:scale-95 p-0.5 rounded-2xl" onClick={addNewNote}>
                                                <div>New Note</div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                } */}
                {
                    homeContents?.length>0 && 
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <div className="font-bold text-xl text-center text-wrap">Other Notes</div>
                        <div className="flex flex-wrap gap-2 items-start justify-center">
                            {
                                homeContents.map((content,idx)=>{
                                    return (
                                        <div key={uuid()} className="flex flex-col gap-2 mt-[10px] items-center justify-center p-2 border-1 border-gray-200 rounded-2xl max-w-96 mx-2">
                                            <div className="flex w-full">
                                                <div className="flex-grow"></div>
                                                <div className="flex justify-center items-center hover:bg-gray-100 hover: cursor-pointer active:scale-95 p-0.5 rounded-full" onClick={pinTheNote}>
                                                    <PushPinOutlinedIcon/>
                                                </div>
                                            </div>
                                            <Typography variant="body1" component="div" className='w-full p-1 truncate h-[1rem]'>{content.title}</Typography>
                                            <Divider className='w-full my-1'/>
                                            <Typography variant="body1" component="div" className='w-full p-1'>{content.desc}</Typography>
                                            <div className="flex w-full">
                                                <div className="flex-grow"></div>
                                                <div className="flex gap-1 justify-center items-center p-0.5">
                                                    <IconButton onClick={archiveNote}><ArchiveIcon/></IconButton>
                                                    <IconButton onClick={markImportant}><LabelImportantOutlineIcon/></IconButton>
                                                    <IconButton onClick={deleteNoteFromHome}><DeleteOutlineOutlinedIcon/></IconButton>
                                                </div>
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