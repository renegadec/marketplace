
import {
  Apples,
  Apple1,
  Apple2,
  Apple3,
  Apple4,
  Avocados,
  Avocado1,
  Avocado2,
  Avocado3,
  Avocado4,
  Bananas,
  Banana1,
  Banana2,
  Banana3,
  Banana4,
  Blueberries,
  Blueberry1,
  Blueberry2,
  Blueberry3,
  Blueberry4,
  Cucumbers,
  Cucumber1,
  Cucumber2,
  Cucumber3,
  Cucumber4,
  Macadamia,
  Macadamia1,
  Macadamia2,
  Macadamia3,
  Macadamia4,
  Paprika,
  Paprika1,
  Paprika2,
  Paprika3,
  Paprika4,
  Peas,
  Peas1,
  Peas2,
  Peas3,
  Peas4,
  Pepper,
  Pepper1,
  Pepper2,
  Pepper3,
  Pepper4,
  Potatoes,
  Potatoes1,
  Potatoes2,
  Potatoes3,
  Potatoes4,
  Raspberries,
  Raspberry1,
  Raspberry2,
  Raspberry3,
  Raspberry4,
  Roundnuts,
  Roundnuts1,
  Roundnuts2,
  Roundnuts3,
  Roundnuts4,
  Strawberries,
  Strawberry1,
  Strawberry2,
  Strawberry3,
  Strawberry4,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Confidence,
  Selestine,
  Jane,
  Admin,
  Nigel
  } from "../assets";


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
      image: Avocados,
      images: [
              Avocado1,
              Avocado2,
              Avocado3,
              Avocado4,
      ]
    },
    {
      id: 2,
      type: "Apples",
      desc: "Sweet apples from eastern Zimbabwe.",
      image: Apples,
      images: [
              Apple1,
              Apple2,
              Apple3,
              Apple4,
      ]
    },
    {
      id: 3,
      type: "Bananas",
      desc: "Sweet bananas from eastern Zimbabwe.",
      image: Bananas,
      images: [
              Banana1,
              Banana2,
              Banana3,
              Banana4,
      ]
    },
    {
      id: 4,
      type: "Cucumber",
      desc: "Cucumbers from the western region.",
      image: Cucumbers,
      images: [
              Cucumber1,
              Cucumber2,
              Cucumber3,
              Cucumber4,
      ]
    },
    {
      id: 5,
      type: "Pepper",
      desc: "Colorful pepper from the northern region.",
      image: Pepper,
      images: [
              Pepper1,
              Pepper2,
              Pepper3,
              Pepper4,
      ]
    },
    {
      id: 6,
      type: "Potatoes",
      desc: "Potatoes from the southern region.",
      image: Potatoes,
      images: [
              Potatoes1,
              Potatoes2,
              Potatoes3,
              Potatoes4,
      ]
    },
    {
      id: 7,
      type: "Round Nuts",
      desc: "Round Nuts from the eastern region.",
      image: Roundnuts,
      images: [
              Roundnuts1,
              Roundnuts2,
              Roundnuts3,
              Roundnuts4,
      ]
    },
    {
      id: 8,
      type: "Peas",
      desc: "Firm peas from the western region.",
      image: Peas,
      images: [
              Peas1,
              Peas2,
              Peas3,
              Peas4,
      ]
    },
    {
      id: 9,
      type: "Raspberry",
      desc: "Juicy Raspberry from the southern region.",
      image: Raspberries,
      images: [
              Raspberry1,
              Raspberry2,
              Raspberry3,
              Raspberry4,
      ]
    },
    {
      id: 10,
      type: "Macadamia",
      desc: "Tasty macadamia nuts from the northern region.",
      image: Macadamia,
      images: [
              Macadamia1,
              Macadamia2,
              Macadamia3,
              Macadamia4,
      ]
    },
    {
      id: 11,
      type: "Strawberries",
      desc: "Sweet strawberries from the western region.",
      image: Strawberries,
      images: [
              Strawberry1,
              Strawberry2,
              Strawberry3,
              Strawberry4,
      ]
    },
    {
      id: 12,
      type: "Paprika",
      desc: "Dark sweet blue berries from Zimbabwe",
      image: Paprika,
      images: [
              Paprika1,
              Paprika2,
              Paprika3,
              Paprika4,
      ]
    },
  ],
};


export const socialLinks = [
  {
    name: "Facebook",
    logo: Facebook,
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
    position: "Co-Founder & CTO",
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


