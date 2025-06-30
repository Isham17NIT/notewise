import { Divider } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {v4 as uuid} from 'uuid'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { restoreFromBin, deleteFromBin } from "../../slices/notesSlice";
const Bin = ()=>{
    const dispatch = useDispatch();
    const binContents = useSelector(state=>{
        return state.notes.allNotes.filter((content)=>content.isDeleted===true)
    })
    return (
        <div className="mt-[80px] w-full min-h-screen flex flex-col items-center">
            <div className="font-bold text-3xl text-center text-wrap">Deleted Notes</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-full max-w-7xl">
                {
                    binContents.map((content,idx)=>{
                        return (
                            <div key={content.id} className="flex flex-col p-4 min-h-52 max-h-52 rounded-2xl border-1 border-gray-200">
                                <div className="flex">
                                    <div className="truncate overflow-hidden whitespace-nowrap">{content.title}</div>
                                    <div className="flex-grow"></div> 
                                    <RestoreFromTrashIcon className="mr-4" onClick={()=>dispatch(restoreFromBin(content))}/>
                                </div>
                                <Divider/>
                                <div className="overflow-y-auto max-h-30 break-words pre-wrap">{content.desc}</div>
                                <div className="flex-grow"></div>     
                                <div className="flex">
                                    <div className="flex-grow"></div>       
                                    <DeleteOutlineIcon className="mr-4" onClick={()=>dispatch(deleteFromBin(content))}/>                                                  
                                </div>
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    )
}
export default Bin