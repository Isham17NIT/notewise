import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Important from "./pages/Important";
import Bin from "./pages/Bin";
import { Box } from '@mui/material';
import { Routes, Route } from "react-router-dom";
function App() {
  return(
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home/>}>Home</Route>
        <Route path="/archive" element={<Archive/>}>Archive</Route>
        <Route path="/important" element={<Important/>}>Important</Route>
        <Route path="/bin" element={<Bin/>}>Bin</Route>
      </Routes>
      <Footer/> 
    </Box>
  )
}

export default App;
