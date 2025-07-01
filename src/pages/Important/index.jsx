import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, IconButton } from '@mui/material';
import { addToBin, addToImportant } from '../../slices/notesSlice';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
                        <AddCircleOutlineIcon/>
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
                                    <div className="flex w-full">
                                        <div className="truncate overflow-hidden whitespace-nowrap">{content.title}</div>
                                    </div>

                                    <Divider className='w-full my-1'/>

                                    <div className="overflow-y-auto max-h-30 break-words pre-wrap w-full">{content.desc}</div>
                                    <div className="flex-grow"></div>
                                    <div className="flex w-full">
                                        <div>Important</div>
                                        <div className="flex-grow"></div>
                                        <IconButton onClick={()=>dispatch(addToBin(content))}><DeleteOutlineOutlinedIcon/></IconButton>
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