import { useEffect } from "react"
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Subscribe from "../components/Subscribe";

const Home = () => {

    useEffect(() => {
        const element = document.getElementById(`main`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [])

    return (
        <div>
            <div id="main"></div>
            <Hero />
            <Features />
            <About />
            <Subscribe />
        </div>
    )
}

export default Home