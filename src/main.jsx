import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'
import {ThemeProvider, CssBaseline, createTheme} from '@mui/material'
import darkTheme from './themes/darkTheme'
import './index.css'
import App from './App.jsx'

const ThemedApp = ()=>{
  const isDark = useSelector(state=>state.darkMode.isDark)
  return (
    <ThemeProvider theme={isDark ? darkTheme : createTheme()}>
      <CssBaseline/>
      <App/>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemedApp />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
