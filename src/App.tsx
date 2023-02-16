import { useState, useEffect } from "react";
import styles from "./style";

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

function Alert({message}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {setShow(false)}, 7000);
    return () => clearTimeout(timer);
  }, []);

  return show ? (
    <div className="alert alert-warning shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>{message}</span>
      </div>
    </div>
  ) : null;
}

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
      <main className="font-mont" >
        <UserContext.Provider value={session}>
          <BrowserRouter>
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <div>
                <Alert message="This is a MVP, to be used for testing purposes only." />
              </div>
              <Navbar/> 
            </div>
          </div>        
            <Routes>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="account" element={
                <div className={`${styles.paddingX} ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Account />
                  </div>
                </div>
                  
                } />
              <Route path="services" element={
                <div className={`${styles.paddingX} ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Services />
                  </div>
                </div>
                  
                } 
              />
              <Route path="company" element={
                <div className={`${styles.paddingX} ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Company />
                  </div>
                </div>
                
              } />
              <Route path="/login" element={
                <div className={`${styles.paddingX} ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Login />
                  </div>
                </div>
                
                } />
              <Route path="/signup" element={
                <div className={`${styles.paddingX} ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <SignUp />
                  </div>
                </div>
              
              } />
              <Route path="product/:id" element={
                <div className={`${styles.paddingX} ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Product />
                  </div>
                </div>
              } />
              <Route path="market" element={
              <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                  <Market />
                </div>
              </div>
              } />
            </Routes>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Footer/> 
              </div>
          </div>
          </BrowserRouter>
        </UserContext.Provider>
      </main>

    )
  }

export default App
