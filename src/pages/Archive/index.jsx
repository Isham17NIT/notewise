import { Divider, IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {v4 as uuid} from 'uuid'
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteFromArchive, addToHome, addToBin } from "../../slices/notesSlice";
const Archive = ()=>{
    const archivedContents = useSelector(state=>state.notes.archivedContents)
    const dispatch = useDispatch();
    const onUnarchiveClick = (content)=>{
        dispatch(deleteFromArchive(content));
        dispatch(addToHome(content));
    }
    const onDeleteClick = ()=>{
        dispatch(deleteFromArchive(content));
        dispatch(addToBin(content));
    }
    return (
        <div className="mt-[80px] w-full flex flex-col items-center">
            <div className="font-bold text-3xl text-center text-wrap">Archived Notes</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-full max-w-7xl">
                {
                    archivedContents.map((content,idx)=>{
                        return (
                            <div key={uuid()} className="flex flex-col p-4 min-h-52 max-h-52 rounded-2xl border-1 border-gray-200 w-full">
                                <div className="truncate overflow-hidden whitespace-nowrap">{content.title}</div>
                                <Divider/>
                                <div className="overflow-y-auto max-h-30 break-words pre-wrap">{content.desc}</div>
                                <div className="flex-grow"></div>     
                                <div className="flex">
                                    <div className="flex-grow"></div> 
                                    <UnarchiveIcon className="mr-2" onClick={()=>onUnarchiveClick(content)}/>
                                    <DeleteOutlineIcon className="mr-4" onClick={()=>onDeleteClick(content)}/>                                                      
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