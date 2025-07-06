import { Divider, IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {v4 as uuid} from 'uuid'
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { toggleArchive, addToBin } from "../../slices/notesSlice";
const Archive = ()=>{
    const dispatch = useDispatch();
    const archivedContents = useSelector(state=>{
       return state.notes.allNotes.filter((content)=>!content.isDeleted && content.isArchived)
    })
    const editNote = ()=>{

    }
    return (
        <div className="mt-[80px] w-full min-h-screen flex flex-col items-center">
            <div className="font-bold text-3xl text-center text-wrap">Archived Notes</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-full max-w-7xl">
                {
                    archivedContents.map((content,idx)=>{
                        return (
                            <div key={content.id} className="flex flex-col p-4 min-h-52 max-h-52 rounded-2xl border-1 border-gray-200 w-full">
                                <div className="truncate overflow-hidden whitespace-nowrap">{content.title}</div>
                                <Divider/>
                                <div className="overflow-y-auto max-h-30 break-words pre-wrap">{content.desc}</div>
                                <div className="flex-grow"></div>     
                                <div className="flex">
                                    <div className="flex-grow"></div> 
                                    <IconButton onClick={()=>dispatch(toggleArchive(content))}><UnarchiveIcon/></IconButton>  
                                    <IconButton onClick={()=>dispatch(addToBin(content))}><DeleteOutlineIcon/></IconButton>   
                                    <IconButton onClick={editNote}><EditOutlinedIcon/></IconButton>                                                     
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