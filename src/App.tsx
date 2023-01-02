// Router
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";

// Navbar
import Navbar from "./components/Navbar";

// Pages
import { 
  Market, 
  NotFound 
} from "./pages"

const App = () => {
    return (
      <main className="font-mont">
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Market />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </main> 
    )
  }

export default App
