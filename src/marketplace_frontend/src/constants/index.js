import * as Social from '../../assets/social/socials.js';
import * as Team from '../../assets/team/team.js';

const Facebook = Social.Facebook;
const Github = Social.Github;
const Instagram = Social.Instagram;
const Linkedin = Social.Linkedin;
const Mail = Social.Mail;

const Confidence = Team.Confidence;
const Selestine = Team.Selestine;
const Nigel = Team.Nigel;
const Asif = Team.Asif;
const Admin = Team.Admin;
const Jane = Team.Jane;



export const navigation = [
  { name: "Marketplace", to: "/market" },
  { name: "Services", to: "/services" },
  { name: "Company", to: "/company" },
  
];


export const socialLinks = [
  {
    name: "Facebook",
    logo: Facebook ,
    link: "https://www.facebook.com/tswaanda/",
  },
  {
    name: "Instagram",
    logo: Instagram,
    link: "https://www.instagram.com/tswaanda/",
  },
  {
    name: "Github",
    logo: Github,
    link: "https://github.com/tswaanda",
  },
  {
    name: "Linkedin",
    logo: Linkedin,
    link: "https://www.linkedin.com/company/tswaanda/",
  },
  {
    name: "Telegram",
    logo: Mail,
    link: "https://t.me/+yApXyrnb5Cs1YmU0",
  },
];

export const menuLinks = {
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
          name: "Blog",
          link: "#"
      },
      {
        name: "Supplying",
        link: "#"
      },
      {
        name: "White Paper",
        link: "#"
      },
      
  ],
  Company: [
      {
        name: "FAQs",
        link: "#"
      },
      {
        name: "Team",
        link: "#"
      },
      {
          name: "Careers",
          link: "#"
      },
      {
        name: "About Us",
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
  ]
}

export const teamData = [
  {
    name: "Confidence Nyirenda",
    position: "Co-Founder & CEO",
    desc: "Confidence drives the technical strategy of the Tswaanda ecosystem and brand.",
    image: Confidence,
    facebook: "https://www.facebook.com/africoiner",
    twitter: "https://twitter.com/crnyirenda",
    github: "https://github.com/renegadec"
  },
  {
    name: "Selestine Mabhunuh",
    position: "Co-Founder & COO",
    desc: "Selestine drives the operations strategy of the Tswaanda ecosystem and brand.",
    image: Selestine,
    facebook: "https://www.facebook.com/selestine.rutendo",
    twitter: "https://twitter.com/selestine_tendo",
    github: "#"
  },
  {
    name: "Isheanesu N. Misi",
    position: "Lead Developer",
    desc: "Nigel is a seasoned full-stack developer with 5 years of experience in web development .",
    image: Nigel,
    facebook: "https://www.facebook.com/isheanesumisi",
    twitter: "https://twitter.com/thisisisheanesu",
    github: "https://github.com/thisisisheanesu"
  },
  {
    name: "Rakibul Hasan Asif",
    position: "Web Developer",
    desc: "Rakibul has vast experience in designing user interface and has 3 years experience working as developer",
    image: Asif,
    facebook: "https://www.facebook.com/",
    twitter: "https://twitter.com/asifrakibul",
    github: "https://github.com/asif2508"
  },
  
]

export const notifications = [
  {
    image: Admin,
    subject: 'New message',
    username: 'Admin',
    message: 'Cargo dispatched from Zimbabwe, check account for details.',
    time: 'few minutes ago...'
  },
  {
    image: Jane,
    subject: 'Reminder',
    username: 'Jane Smith',
    message: 'Documentation uploaded. Waiting for approval.',
    time: '2023-01-19 T 09:00:00'
  },
  {
    image: Admin,
    subject: 'Reminder',
    username: 'Tswaanda Sales',
    message: 'Funds secured with custodial wallet.',
    time: '2022-02-19 T 09:00:00'
  },
  {
    image: Admin,
    subject: 'Reminder',
    username: 'Admin',
    message: 'Update billing address.',
    time: '2022-05-19 T 09:00:00'
  },

];


