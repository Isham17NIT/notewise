import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from '../slices/darkModeSlice';
import notesReducer from '../slices/notesSlice'
import sidebarReducer from '../slices/sidebarSlice'
const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    notes: notesReducer,
    isSidebarOpen: sidebarReducer,
  },
});

export default store;