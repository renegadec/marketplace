
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
  Account,
  Home,
  Market, 
  NotFound,
  Product
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
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>

    )
  }

export default App
