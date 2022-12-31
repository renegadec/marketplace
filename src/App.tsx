import React from "react"

// Router
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";

// Components
import { Navbar, Footer } from "./components";

// Pages
import { 
  Market, 
  NotFound 
} from "./pages"

const App = () => {
    return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Market />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    )
  }

export default App
