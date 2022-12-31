import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";

const App = () => {

    return (
        <div className="font-mont">
          <Navbar />
          <Hero />
          <Features />
          <About />
        </div>
    )
  }

export default App
