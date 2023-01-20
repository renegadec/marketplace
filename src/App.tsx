import { useState, useEffect } from "react";

// Router
import { 
  BrowserRouter, 
  Routes, 
  Route,
  Navigate
} from "react-router-dom";

// Components
import { Navbar, Footer, SignUp, Login } from "./components";

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

import { supabase } from "./config/supabase";
import { UserContext } from "./UserContext";

const useAuth = async() => {
  let user = await supabase.auth.getSession()
  return user.data.session
}

const ProtectedRoute = ({ children }) => {
  
  const isLoggedIn = useAuth()

  console.log(isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Account />;
};

const App = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    return (
      <main className="font-mont">
        <UserContext.Provider value={session}>
          <BrowserRouter>
            <Navbar/>         
            <Routes>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="account" element={<Account />} />
              <Route path="services" element={<Services />} />
              <Route path="company" element={<Company />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="market" element={<Market />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </UserContext.Provider>
      </main>

    )
  }

export default App
