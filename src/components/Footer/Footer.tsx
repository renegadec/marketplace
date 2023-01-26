import { 
    whitelogo,
} from "../../assets";
import { socialLinks, menuLinks } from "../../constants";
import { Button } from "../index";
import { Link } from "react-router-dom"


const Footer = () => {
    return (
    <footer className="p-4 bg-primary sm:p-6">
        {/* logo and socials */}
        <div className="lg:flex lg:justify-center lg:relative lg:space-x-64 md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
                <Link to="/" className="flex items-center">
                    <img src={whitelogo} className="h-8 mr-3" alt="Tswaanda Logo" />
                </Link>
                <div className="flex flex-row w-full justify-between">
                    {socialLinks.map((social) => (
                        <a 
                            key={social.name}
                            className="bg-white hover:bg-gray-200 rounded-[5px] p-2 mt-6" 
                            href={social.link}>
                            <img 
                                src={social.logo} 
                                alt={`${social.name} logo`} />
                        </a>
                    ))}
                </div>
                <div className="w-full mt-6">
                    <Button 
                        text="Contact Us" 
                        variant="outline"
                        width="full"
                        handler={() => console.log("")}/>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Product</h2>
                    <ul className="text-white ">
                        {menuLinks['Product'].map((menuItem) => (
                            <li className="mb-4" key={menuItem.name}>
                                <a href={menuItem.link} className="hover:underline">    {menuItem.name}
                                </a>
                            </li>
                        ))}
                        
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Market</h2>
                    <ul className="text-white">
                        {menuLinks['Markets'].map((menuItem) => (
                            <li className="mb-4" key={menuItem.name}>
                                <a href={menuItem.link} className="hover:underline">    {menuItem.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                    <ul className="text-white">
                        {menuLinks['Resources'].map((menuItem) => (
                            <li className="mb-4" key={menuItem.name}>
                                <a href={menuItem.link} className="hover:underline">    {menuItem.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                    <ul className="text-white">
                        {menuLinks['Company'].map((menuItem) => (
                            <li className="mb-4" key={menuItem.name}>
                                <a href={menuItem.link} className="hover:underline" key={menuItem.index}>    {menuItem.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        <hr className="my-6 border-white sm:mx-auto dark:border-white lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-white sm:text-center dark:text-white">
                © 2023 <a href="/" className="hover:underline">Tswaanda</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                        {menuLinks['Bottom'].map((menuItem) => (
                            <a 
                                key={menuItem.name}
                                href={menuItem.link} 
                                className="text-sm text-white hover:text-gray-200">
                                {menuItem.name}
                            </a>
                        ))}
            </div>
        </div>
    </footer>
    )
}

export default Footer