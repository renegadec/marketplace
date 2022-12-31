import React from 'react';
import {Farmer} from '../assets';
import { styled } from '@mui/material/styles';

// const Frame51 = styled('div')({
//   display: `flex`,
//   position: `relative`,
//   isolation: `isolate`,
//   flexDirection: `row`,
//   width: '100%',
//   height: `564px`,
//   justifyContent: `flex-start`,
//   alignItems: `flex-start`,
//   padding: `0px`,
//   boxSizing: `border-box`,
// });

// const Image = styled('div')({
//   display: `flex`,
//   position: `absolute`,
//   isolation: `isolate`,
//   flexDirection: `column`,
//   justifyContent: `flex-start`,
//   alignItems: `flex-start`,
//   padding: `0px`,
//   boxSizing: `border-box`,
//   left: `0px`,
//   top: `0px`,
// });

// const Rectangle19 = styled('img')({
//   height: `564px`,
//   width: `819px`,
//   objectFit: `cover`,
//   margin: `0px`,
// });

// const AboutText = styled('div')({
//   display: `flex`,
//   position: `absolute`,
//   isolation: `isolate`,
//   flexDirection: `column`,
//   justifyContent: `center`,
//   alignItems: `center`,
//   padding: `0px`,
//   boxSizing: `border-box`,
//   width: `511px`,
//   height: `246px`,
//   left: `876px`,
//   top: `93px`,
// });

// const Group4 = styled('div')({
//   display: `flex`,
//   position: `relative`,
//   isolation: `isolate`,
//   flexDirection: `row`,
//   justifyContent: `flex-start`,
//   alignItems: `flex-start`,
//   padding: `0px`,
//   boxSizing: `border-box`,
//   height: `246px`,
//   width: `511px`,
//   margin: `0px`,
// });

// const AboutUs = styled('div')(({ theme }) => ({
//   textAlign: `center`,
//   whiteSpace: `pre-wrap`,
//   color: `rgba(55, 176, 104, 1)`,
//   fontStyle: `normal`,
//   fontFamily: `Montserrat`,
//   fontWeight: `600`,
//   fontSize: `36px`,
//   letterSpacing: `0px`,
//   textDecoration: `none`,
//   textTransform: `none`,
//   position: `absolute`,
//   left: `0px`,
//   top: `0px`,
// }));

// const WeAlwaysPrioritizeEf = styled('div')({
//   textAlign: `left`,
//   whiteSpace: `pre-wrap`,
//   color: `rgba(0, 0, 0, 1)`,
//   fontStyle: `normal`,
//   fontFamily: `Montserrat`,
//   fontWeight: `600`,
//   fontSize: `24px`,
//   letterSpacing: `0px`,
//   textDecoration: `none`,
//   textTransform: `none`,
//   position: `absolute`,
//   left: `0px`,
//   top: `66px`,
// });

// const TswaandaIsDedicatedT = styled('div')(({ theme }) => ({
//   textAlign: `left`,
//   whiteSpace: `pre-wrap`,
//   color: `rgba(132, 132, 132, 1)`,
//   fontStyle: `normal`,
//   fontFamily: `Montserrat`,
//   fontWeight: `500`,
//   fontSize: `16px`,
//   letterSpacing: `0px`,
//   textDecoration: `none`,
//   textTransform: `none`,
//   position: `absolute`,
//   left: `0px`,
//   top: `146px`,
// }));

// const ExploreButton = styled('div')({
//   display: `flex`,
//   position: `absolute`,
//   isolation: `isolate`,
//   flexDirection: `column`,
//   justifyContent: `center`,
//   alignItems: `flex-start`,
//   padding: `0px`,
//   boxSizing: `border-box`,
//   width: `227px`,
//   left: `1128px`,
//   top: `378px`,
// });

const Group5 = styled('div')({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  height: `53px`,
  width: `227px`,
  margin: `0px`,
});

const Rectangle21 = styled('div')({
  backgroundColor: `rgba(217, 217, 217, 0)`,
  border: `2px solid rgba(55, 176, 104, 1)`,
  boxSizing: `border-box`,
  borderRadius: `12px`,
  width: `227px`,
  height: `53px`,
  position: `absolute`,
  left: `0px`,
  top: `0px`,
});

const ExploreProducts = styled('div')(({ theme }) => ({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  color: `rgba(55, 176, 104, 1)`,
  fontStyle: `normal`,
  fontFamily: `Montserrat`,
  fontWeight: `700`,
  fontSize: `20px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  position: `absolute`,
  left: `24px`,
  top: `15px`,
}));

const LearnButton = styled('div')({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `column`,
  justifyContent: `flex-end`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `227px`,
  left: `876px`,
  top: `378px`,
});

const LearnmoreButton = styled('div')({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  height: `53px`,
  width: `227px`,
  margin: `0px`,
});

const Rectangle20 = styled('div')(({ theme }) => ({
  backgroundColor: `rgba(55, 176, 104, 1)`,
  borderRadius: `12px`,
  width: `227px`,
  height: `53px`,
  position: `absolute`,
  left: `0px`,
  top: `0px`,
}));

const LearnMore = styled('div')({
  textAlign: `center`,
  whiteSpace: `pre-wrap`,
  color: `rgba(255, 255, 255, 1)`,
  fontStyle: `normal`,
  fontFamily: `Montserrat`,
  fontWeight: `700`,
  fontSize: `20px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  position: `absolute`,
  left: `54px`,
  top: `15px`,
});

const About = (props) => {
    return (
        <div className="flex relative isolate flex-row w-full h-[564px] justify-start items-start p-0 box-border">
            <div className='flex absolute isolate flex-col justify-start items-start p-0 box-border left-0 top-0'>
                <img
                    src={Farmer}
                    loading="lazy"
                    alt="farmer"
                    className='object-cover m-0'
                />
            </div>
            <div className='flex absolute isolate flex-col justify-center items-center p-0 box-border w-[511px] h-[246px] left-[876px] top-[93px]'>
                <div className='flex relative isolate flex-row justify-start items-start p-0 box-border w-[511px] h-[246px] m-0'>
                    <h1 className='text-center text-primary font-bold absolute text-4xl'>About Us</h1>

                    <h3 className='text-left text-black absolute top-[66px] font-bold text-xl'>
                        We always prioritize efficiency without compromising quality
                    </h3>

                    <p className='text-left text-gray-500 absolute top-[146px]'>
                        Tswaanda is dedicated to providing our customers with 
                        professional services for economic utilisation of the major 
                        markets for agriculture. We speak directly to the farmers’ pains
                        by being a complete commercial platform that helps farmers 
                        grow and manage their farming business.
                    </p>
                </div>
            </div>
            {/* <div className='flex absolute isolate flex-col justify-center items-start p-0 box-border w-[227px] left-[1128px] top-[378px]'>
                <div className='flex relative isolate flex-row justify-start items-start p-0 box-border h-[53px] w-[227px] m-0'>
                <Rectangle21></Rectangle21>
                <ExploreProducts>{`Explore Products`}</ExploreProducts>
                </div>
            </div>
            <LearnButton>
                <LearnmoreButton>
                <Rectangle20></Rectangle20>
                <LearnMore>{`Learn more`}</LearnMore>
                </LearnmoreButton>
            </LearnButton> */}

            <div className='flex absolute flex-row isolate justify-center items-start p-0 box-border  left-[1018px] top-[388px] gap-x-4'>
                        <a
                            href="#"
                            className="inline-block rounded-lg bg-primary px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-primary hover:bg-indigo-700 hover:ring-indigo-700"
                        >
                            Learnmore
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
    );
}

export default About;








// import React from 'react';
// import { Farmer } from '../assets';

// const About = () => {
//     return (
//         <section id="about" className='flex flex-row'>
//             <div className='absolute w-[819px] h-[564px]'>
//                 <img src={ Farmer } alt="Farmer" />
//             </div>
//             <div className='flex flex-col'>
//                 <div className=''>
//                     <h1>About Us</h1>

//                     <h3>We always prioritize efficiency without compromising quality</h3>

//                     <p>Tswaanda is dedicated to providing our customers with 
//                         professional services for economic utilisation of the major 
//                         markets for agriculture. We speak directly to the farmers’ pains
//                         by being a complete commercial platform that helps farmers 
//                         grow and manage their farming business.
//                     </p>
//                 </div>

//                 <div>
//                     <button>
//                         Learn more
//                     </button>
//                     <button>
//                         Explore Products
//                     </button>
//                 </div>
                
//             </div>
//         </section>
//     )
// }

// export default About