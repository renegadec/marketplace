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
  Account,
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
            <Route index element={<Market />} />
            <Route path="*" element={<NotFound />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="account" element={<Account />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>
    )
  }

export default App
