import React from "react"
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";
import { 
  Market, 
  NotFound 
} from "./pages"
import Navbar from "./components/Navbar";

const App = () => {
    return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Market />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    )
  }

export default App
