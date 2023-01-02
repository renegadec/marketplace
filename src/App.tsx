import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import SubscribeForm from "./components/Subscribe";

const App = () => {

    return (
        <div className="font-mont">
          <Navbar />
          <Hero />
          <Features />
          <About />
          <SubscribeForm />
        </div>
    )
  }

export default App
