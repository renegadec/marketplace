import { useState, useEffect, lazy, Suspense } from "react";
import styles from "./style";

// Router
import { 
  BrowserRouter, 
  Routes, 
  Route,
} from "react-router-dom";

// Components
import { Navbar, Footer } from "./components";
import { useSelector, useDispatch } from 'react-redux'

// Pages
const Home = lazy(() => import('./pages/Home'));
const Account = lazy(() => import('./pages/Account'));
const Company = lazy(() => import('./pages/Company'));
const Market = lazy(() => import('./pages/Market')); 
const NotFound = lazy(() => import('./pages/NotFound'));
const Product = lazy(() => import('./pages/Product'));
const Services = lazy(() => import('./pages/Services'));

import { UserContext } from "./UserContext";
import { useAuth } from "./hooks";


import ShoppingCart from "./pages/ShoppingCart";

import Orders from "./pages/Orders";
import { setInit } from "./state/globalSlice";
import { initActors } from "./storage-config/functions";



const App = () => {
  const dispatch = useDispatch()
    const [session, setSession] = useState<boolean>(false)

    const { login, isLoggedIn } = useAuth(session, setSession);

    const checkAuth = async () => {
      if(await isLoggedIn()) setSession(true)
    }

    const init = async () => {
      const res = await initActors();
      if (res) {
        dispatch(setInit());
      }
    };

    useEffect(() => {
      init()
      checkAuth()
    }, [])

    return (
      <main className="font-mont" >
        <UserContext.Provider value={{session, setSession}}>
          <BrowserRouter>
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar/> 
            </div>
          </div>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="account" element={
                        <div className={`${styles.paddingX} ${styles.flexStart}`}>
                          <div className={`${styles.boxWidth}`}>
                            <Account />
                          </div>
                        </div>
                      } 
                    />
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
                    } 
                  />
                  <Route path="orders" element={
                      <div className={`${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <Orders />
                        </div>
                      </div>
                    } 
                  />

                  <Route path="support" element={
                      <div className={`${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <Support />
                        </div>
                      </div>
                    } 
                  />

                  <Route path="shopping-cart" element={
                      <div className={`${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <ShoppingCart />
                        </div>
                      </div>
                    } 
                  />

                  <Route path="orders" element={
                      <div className={`${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <Orders />
                        </div>
                      </div>
                    } 
                  />

                  <Route path="shopping-cart" element={
                      <div className={`${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <ShoppingCart />
                        </div>
                      </div>
                    } 
                  />
                          
                  <Route path="market" element={
                      <div className={`${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <Market />
                        </div>
                      </div>
                    } 
                  />
                  <Route path="product/:id" element={
                      <div className={`${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <Product />
                        </div>
                      </div>
                    } 
                  />
                </Routes>
            </Suspense>
                    
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
