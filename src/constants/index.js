import * as Apples from '../assets/apples/apples.js';
import * as Avocados from '../assets/avocados/avocados.js';
import * as Bananas from '../assets/bananas/bananas.js';
import * as Blueberries from '../assets/blueberries/blueberries.js';
import * as Cucumbers from '../assets/cucumbers/cucumbers.js';
import * as Macadamia from '../assets/macadamia/macadamia.js';
import * as Paprika from '../assets/paprika/paprika.js';
import * as Peas from '../assets/peas/peas.js';
import * as Pepper from '../assets/pepper/pepper.js';
import * as Potatoes from '../assets/potatoes/potatoes.js';
import * as Raspberry from '../assets/raspberry/raspberry.js';
import * as Roundnuts from '../assets/roundnuts/roundnuts.js';
import * as Social from '../assets/social/socials.js';
import * as Strawberry from '../assets/strawberry/strawberry.js';
import * as Team from '../assets/team/team.js';

const AvocadoImg1 = Avocados.Avocado1;
const AvocadoImg2 = Avocados.Avocado2;
const AvocadoImg3 = Avocados.Avocado3;
const AvocadoImg4 = Avocados.Avocado4;
const AvocadosImg = Avocados.Avocados;

const AppleImg1 = Apples.Apple1;
const AppleImg2 = Apples.Apple2;
const AppleImg3 = Apples.Apple3;
const AppleImg4 = Apples.Apple4;
const ApplesImg = Apples.Apples;

const BananaImg1 = Bananas.Banana1;
const BananaImg2 = Bananas.Banana2;
const BananaImg3 = Bananas.Banana3;
const BananaImg4 = Bananas.Banana4;
const BananasImg = Bananas.Bananas;

const StrawberryImg1 = Strawberry.Strawberry1;
const StrawberryImg2 = Strawberry.Strawberry2;
const StrawberryImg3 = Strawberry.Strawberry3;
const StrawberryImg4 = Strawberry.Strawberry4;
const StrawberryImg = Strawberry.Strawberry;

const CucumberImg1 = Cucumbers.Cucumber1;
const CucumberImg2 = Cucumbers.Cucumber2;
const CucumberImg3 = Cucumbers.Cucumber3;
const CucumberImg4 = Cucumbers.Cucumber4;
const CucumbersImg = Cucumbers.Cucumbers;

const MacadamiaImg1 = Macadamia.Macadamia1;
const MacadamiaImg2 = Macadamia.Macadamia2;
const MacadamiaImg3 = Macadamia.Macadamia3;
const MacadamiaImg4 = Macadamia.Macadamia4;
const MacadamiaImg = Macadamia.Macadamia;

const PaprikaImg1 = Paprika.Paprika1;
const PaprikaImg2 = Paprika.Paprika2;
const PaprikaImg3 = Paprika.Paprika3;
const PaprikaImg4 = Paprika.Paprika4;
const PaprikaImg = Paprika.Paprika;

const PeaImg1 = Peas.Pea1;
const PeaImg2 = Peas.Pea2;
const PeaImg3 = Peas.Pea3;
const PeaImg4 = Peas.Pea4;
const PeasImg = Peas.Peas;

const PepperImg1 = Pepper.Pepper1;
const PepperImg2 = Pepper.Pepper2;
const PepperImg3 = Pepper.Pepper3;
const PepperImg4 = Pepper.Pepper4;
const PepperImg = Pepper.Pepper;

const RaspberryImg1 = Raspberry.Raspberry1;
const RaspberryImg2 = Raspberry.Raspberry2;
const RaspberryImg3 = Raspberry.Raspberry3;
const RaspberryImg4 = Raspberry.Raspberry4;
const RaspberryImg = Raspberry.Raspberry;

const RoundnutsImg1 = Roundnuts.Roundnuts1;
const RoundnutsImg2 = Roundnuts.Roundnuts2;
const RoundnutsImg3 = Roundnuts.Roundnuts3;
const RoundnutsImg4 = Roundnuts.Roundnuts4;
const RoundnutsImg = Roundnuts.Roundnuts;

const PotatoImg1 =  Potatoes.Potato1;
const PotatoImg2 =  Potatoes.Potato2;
const PotatoImg3 =  Potatoes.Potato3;
const PotatoImg4 =  Potatoes.Potato4;
const PotatoesImg = Potatoes.Potatoes;

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

export const productsData = {
  product: [
    {
      id: 1,
      type: "Avocados",
      desc: "Southern Africa green-skin variety.",
      image: AvocadosImg,
      images: [
          AvocadoImg1,
          AvocadoImg2,
          AvocadoImg3,
          AvocadoImg4,
      ]
    },
    {
      id: 2,
      type: "Apples",
      desc: "Sweet apples from eastern Zimbabwe.",
      image: ApplesImg,
      images: [
        AppleImg1,
        AppleImg2,
        AppleImg3,
        AppleImg4
      ]
    },
    {
      id: 3,
      type: "Bananas",
      desc: "Sweet bananas from eastern Zimbabwe.",
      image: BananasImg,
      images: [
              BananaImg1,
              BananaImg2,
              BananaImg3,
              BananaImg4,
      ]
    },
    {
      id: 4,
      type: "Cucumber",
      desc: "Cucumbers from the western region.",
      image: CucumbersImg,
      images: [
              CucumberImg1,
              CucumberImg2,
              CucumberImg3,
              CucumberImg4,
      ]
    },
    {
      id: 5,
      type: "Pepper",
      desc: "Colorful pepper from the northern region.",
      image: PepperImg,
      images: [
              PepperImg1,
              PepperImg2,
              PepperImg3,
              PepperImg4,
      ]
    },
    {
      id: 6,
      type: "Potatoes",
      desc: "Potatoes from the southern region.",
      image: PotatoesImg,
      images: [
              PotatoImg1,
              PotatoImg2,
              PotatoImg3,
              PotatoImg4,
      ]
    },
    {
      id: 7,
      type: "Round Nuts",
      desc: "Round Nuts from the eastern region.",
      image: RoundnutsImg,
      images: [
              RoundnutsImg1,
              RoundnutsImg2,
              RoundnutsImg3,
              RoundnutsImg4,
      ]
    },
    {
      id: 8,
      type: "Somerwood Peas",
      desc: "A heavy cropping pea with excellent taste and texture.",
      image: PeasImg,
      images: [
              PeaImg1,
              PeaImg2,
              PeaImg3,
              PeaImg4,
      ]
    },
    {
      id: 9,
      type: "Raspberry",
      desc: "Juicy Raspberry from the southern region.",
      image: RaspberryImg,
      images: [
              RaspberryImg1,
              RaspberryImg2,
              RaspberryImg3,
              RaspberryImg4,
      ]
    },
    {
      id: 10,
      type: "Macadamia",
      desc: "Tasty macadamia nuts from the northern region.",
      image: MacadamiaImg,
      images: [
              MacadamiaImg1,
              MacadamiaImg2,
              MacadamiaImg3,
              MacadamiaImg4,
      ]
    },
    {
      id: 11,
      type: "Strawberries",
      desc: "Sweet strawberries from the western region.",
      image: StrawberryImg,
      images: [
              StrawberryImg1,
              StrawberryImg2,
              StrawberryImg3,
              StrawberryImg4,
      ]
    },
    {
      id: 12,
      type: "Paprika",
      desc: "Organically farmed paprika from Zimbabwe",
      image: PaprikaImg,
      images: [
              PaprikaImg1,
              PaprikaImg2,
              PaprikaImg3,
              PaprikaImg4,
      ]
    },
  ],
};


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


