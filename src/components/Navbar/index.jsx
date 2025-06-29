import * as React from 'react';
import {Box, Toolbar, IconButton, Typography, Container, Menu, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch, useSelector } from 'react-redux';
import {toggleDarkMode} from '../../slices/darkModeSlice'
import Sidebar from '../Sidebar';
import { toggleSidebar } from '../../slices/sidebarSlice';

function Navbar() {
    const dispatch = useDispatch()
    const isDark = useSelector(state=>state.darkMode.isDark)
    const isOpen = useSelector(state=>state.isSidebarOpen.isOpen)

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: 64 }}>
                        <MenuIcon sx={{ mr: 4 }} onClick={()=>dispatch(toggleSidebar())}/>

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            NoteWise
                        </Typography>

                        {/* Dark mode toggle button */}
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton sx={{ ml: 1,color:'white' }} onClick={()=>dispatch(toggleDarkMode())} color="inherit">
                            {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            {
                isOpen && <Sidebar/>
            }
        </>
    );
}
export default Navbar;
