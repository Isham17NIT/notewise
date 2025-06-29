import * as React from 'react';
import { Box,Drawer,List,Divider,ListItem,ListItemButton,ListItemText,ListItemIcon  }from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import LabelImportantOutlineIcon from '@mui/icons-material/LabelImportantOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../slices/sidebarSlice';

export default function Sidebar() {
  const listContents = [
    { title: 'Home', icon: <HomeIcon />, path: '/' },
    { title: 'Archive', icon: <InboxIcon />, path: '/archive' },
    { title: 'Important', icon: <LabelImportantOutlineIcon />, path: '/important' },
    { title: 'Bin', icon: <DeleteOutlineIcon />, path: '/bin' }
  ];
  const list = (
    <Box
      sx={{ width: 180 }}
      role="presentation"
    >
      <List>
        {listContents.map((listElement) => (
          <ListItem key={listElement.title} disablePadding sx={{ marginBottom: '8px' }}>
            <ListItemButton component={NavLink} to={listElement.path}>
              <ListItemIcon sx={{ maxWidth: 20 }}>
                {listElement.icon}
              </ListItemIcon>
              <ListItemText primary={listElement.title} sx={{ marginLeft: '-16px' }} />
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const dispatch = useDispatch()
  const isOpen = useSelector(state=>state.isSidebarOpen.isOpen)
  return (
    <Drawer
      variant="temporary"
      anchor="left" open={isOpen} onClick={()=>dispatch(toggleSidebar())}
      sx={{
      '& .MuiDrawer-paper': {
        width: {xs: '100vw', sm:180},
        marginTop: '64px', // Offset below the navbar
        height: { xs: 'fit-content', sm: 'calc(100% - 64px)' }, // Only take up space below navbar
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }
    }}
    >
      {list}
    </Drawer>
  );
}
