
// Router
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";

// Components
import { Navbar, Footer } from "./components";
import { Login } from "./components"

// Pages
import { 
  Account,
  Company,
  Home,
  Market, 
  NotFound,
  Product,
  Services
} from "./pages"

const App = () => {
    return (
      <main className="font-mont">
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="market" element={<Market />} />
            <Route path="account" element={<Account />} />
            <Route path="services" element={<Services />} />
            <Route path="company" element={<Company />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>

    )
  }

export default App
