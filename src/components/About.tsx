import { Farmer } from "../assets";

const About = (props) => {
    return (
        <section className="flex relative flex-row sm:grid-cols-1 w-full h-[564px] justify-start items-center p-0 mb-6">
            <div className="flex relative flex-col justify-center items-center p-0 h-full w-1/2">
                <img
                src={Farmer}
                loading="lazy"
                alt="farmer"
                className="m-0 w-full rounded-r-[12px]"
                />
            </div>
            <div className="w-1/2 p-20">
                <div className="flex relative isolate flex-col justify-center items-center p-0 box-border">
                <div className="flex relative isolate flex-col justify-start items-start p-0 box-border m-0">
                    <h1 className="text-center text-primary font-bold text-4xl mb-4">
                        About Us
                    </h1>

                    <h3 className="text-left text-black font-bold text-lg mb-4">
                        We always prioritize efficiency without compromising quality
                    </h3>

                    <p className="text-left text-gray-600 ">
                        Tswaanda is dedicated to providing our customers with professional
                        services for economic utilisation of the major markets for
                        agriculture. We speak directly to the farmers’ pains by being a
                        complete commercial platform that helps farmers grow and manage
                        their farming business.
                    </p>
                </div>
                </div>

                <div className="flex relative flex-row justify-start items-start p-0 box-border w-full mt-8">
                <a
                    href="#"
                    className="inline-block rounded-lg bg-primary px-4 py-1.5 mr-4 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-primary hover:bg-green-400 hover:ring-primary"
                >
                    Learn more
                    <span className="text-indigo-200" aria-hidden="true">
                    &rarr;
                    </span>
                </a>
                <a
                    href="#"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-primary hover:ring-gray-900/20"
                >
                    Explore Products
                    <span className="text-gray-400" aria-hidden="true">
                    &rarr;
                    </span>
                </a>
                </div>
            </div>
        </section>
        
    );
};

export default About;
