import { 
    whitelogo,
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Mail
} from "../../assets";

import { Button } from "../index";

const socialLinks = [
    {
        name: "Facebook",
        logo: Facebook,
        link: "#"
    },
    {
        name: "Instagram",
        logo: Instagram,
        link: "#"
    },   
    {
        name: "Github",
        logo: Github,
        link: "#"
    },
    {
        name: "Linkedin",
        logo: Linkedin,
        link: "#"
    },
    {
        name: "Mail",
        logo: Mail,
        link: "#"
    },
]

const menuLinks = {
    Product: [
        {
            name: "Fruits",
            link: "#"
        },
        {
            name: "Vegetables",
            link: "#"
        },
        {
            name: "Spice Products",
            link: "#"
        },
        {
            name: "Frozen Products",
            link: "#"
        }
    ],
    Markets: [
        {
            name: "Europe",
            link: "#"
        },
        {
            name: "East Africa",
            link: "#"
        },
        {
            name: "West Africa",
            link: "#"
        }
    ],
    Resources: [
        {
            name: "Tswaanda Home",
            link: "#"
        },
        {
            name: "Blog",
            link: "#"
        },
        {
            name: "Getting Started",
            link: "#"
        },
        {
            name: "Supplying",
            link: "#"
        },
        {
            name: "Developers",
            link: "#"
        },
        {
            name: "Support",
            link: "#"
        }
    ],
    Company: [
        {
            name: "About Us",
            link: "#"
        },
        {
            name: "Careers",
            link: "#"
        },    
        {
            name: "FAQs",
            link: "#"
        },
        {
            name: "Teams",
            link: "#"
        }, 
        {
            name: "Contact Us",
            link: "#"
        }, 
    ],
    Bottom: [
        {
            name: "Privacy Policy",
            link: "#"
        }, 
        {
            name: "Terms of Use",
            link: "#"
        },   
        {
            name: "Sales and Documentation",
            link: "#"
        }, 
        {
            name: "Legal",
            link: "#"
        },   
        {
            name: "Sitemap",
            link: "#"
        },    
    ]
}

const Footer = () => {
    return (
        <footer className="flex flex-col bg-primary h-fit pt-4 w-full overflow-hidden">
            <div className="flex flex-row h-full">
                <div className="flex flex-col place-items-end h-full w-1/3 p-8 pt-14">
                    <div className="flex flex-col h-fit w-fit">
                        <img 
                            className="h-12 w-auto"
                            src={whitelogo} 
                            alt="Logo" />
                        <div className="flex flex-row w-full justify-between">
                            {socialLinks.map((social) => (
                                <a className="bg-white hover:bg-gray-200 rounded-[5px] p-2 mt-6" 
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
                </div>
                <div className="place-items-start h-full w-2/3 grid grid-cols-3 p-8 px-20 text-white">
                    <div className="flex flex-col">
                        <h3 className="font-semibold mb-4 text-3xl">
                            Product
                        </h3>
                        {menuLinks['Product'].map((menuItem) => (
                            <a href={menuItem.link} 
                                className="font-normal text-xl hover:text-gray-200">
                                {menuItem.name}
                            </a>
                        ))}
                        <h3 className="font-semibold mt-8 mb-4 text-3xl">
                            Markets
                        </h3>
                        {menuLinks['Markets'].map((menuItem) => (
                            <a href={menuItem.link} 
                                className="font-normal text-xl hover:text-gray-200">
                                {menuItem.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold mb-4 text-3xl">
                            Resources
                        </h3>
                        {menuLinks['Resources'].map((menuItem) => (
                            <a href={menuItem.link} 
                                className="font-normal text-xl hover:text-gray-200">
                                {menuItem.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold mb-4 text-3xl">
                            Company
                        </h3>
                        {menuLinks['Company'].map((menuItem) => (
                            <a href={menuItem.link} 
                                className="font-normal text-xl hover:text-gray-200">
                                {menuItem.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full border-t-[1px] border-gray-300 p-4">
                <div className="w-1/3 flex justify-center items-center text-white font-light">
                    <p>© 2023 All Rights Reserved</p>
                </div>
                <div className="w-2/3 flex flex-row justify-between px-28">
                    {menuLinks['Bottom'].map((menuItem) => (
                        <a href={menuItem.link} 
                            className="font-light text-white hover:text-gray-200">
                            {menuItem.name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer