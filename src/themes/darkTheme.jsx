import { createTheme } from "@mui/material";
const darkTheme =  createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0f172a', // slate-900
            paper: '#334155',   // slate-700
        },
        primary: {
            main: '#3b82f6',    // blue-500
        },
        text: {
            primary: '#f1f5f9', // slate-100
            secondary: '#94a3b8', // slate-400
        },
        divider: '#1e293b',   // slate-800
    }})
export default darkTheme
