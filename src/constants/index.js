
import { Facebook, Github, Instagram, Linkedin, Mail, } from "../assets";


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
      image: "../src/assets/avocados/avocados.png",
      images: [
              "../src/assets/avocados/1.png",
              "../src/assets/avocados/2.png",
              "../src/assets/avocados/3.png",
              "../src/assets/avocados/4.png"
      ]
    },
    {
      id: 2,
      type: "Apples",
      desc: "Sweet apples from eastern Zimbabwe.",
      image: "../src/assets/apples/apples.png",
      images: [
        "../src/assets/apples/1.png",
        "../src/assets/apples/2.png",
        "../src/assets/apples/3.png",
        "../src/assets/apples/4.png"
      ]
    },
    {
      id: 3,
      type: "Bananas",
      desc: "Sweet bananas from eastern Zimbabwe.",
      image: "../src/assets/bananas/bananas.png",
      images: [
        "../src/assets/bananas/1.png",
        "../src/assets/bananas/2.png",
        "../src/assets/bananas/3.png",
        "../src/assets/bananas/4.png"
      ]
    },
    {
      id: 4,
      type: "Cucumber",
      desc: "Cucumbers from the western region.",
      image: "../src/assets/cucumbers/cucumbers.png",
      images: [
        "../src/assets/cucumbers/1.png",
        "../src/assets/cucumbers/2.png",
        "../src/assets/cucumbers/3.png",
        "../src/assets/cucumbers/4.png"
      ]
    },
    {
      id: 5,
      type: "Pepper",
      desc: "Colorful pepper from the northern region.",
      image: "../src/assets/pepper/pepper.png",
      images: [
        "../src/assets/pepper/1.png",
        "../src/assets/pepper/2.png",
        "../src/assets/pepper/3.png",
        "../src/assets/pepper/4.png"
      ]
    },
    {
      id: 6,
      type: "Potatoes",
      desc: "Potatoes from the southern region.",
      image: "../src/assets/potatoes/potato.png",
      images: [
        "../src/assets/potatoes/1.png",
        "../src/assets/potatoes/2.png",
        "../src/assets/potatoes/3.png",
        "../src/assets/potatoes/4.png"
      ]
    },
    {
      id: 7,
      type: "Round Nuts",
      desc: "Round Nuts from the eastern region.",
      image: "../src/assets/roundnuts/roundnuts.png",
      images: [
        "../src/assets/roundnuts/1.png",
        "../src/assets/roundnuts/2.png",
        "../src/assets/roundnuts/3.png",
        "../src/assets/roundnuts/4.png"
      ]
    },
    {
      id: 8,
      type: "Peas",
      desc: "Firm peas from the western region.",
      image: "../src/assets/peas/peas.png",
      images: [
        "../src/assets/peas/1.png",
        "../src/assets/peas/2.png",
        "../src/assets/peas/3.png",
        "../src/assets/peas/4.png"
      ]
    },
    {
      id: 9,
      type: "Raspberry",
      desc: "Juicy Raspberry from the southern region.",
      image: "../src/assets/rasberry/rasberry.png",
      images: [
        "../src/assets/rasberry/1.png",
        "../src/assets/rasberry/2.png",
        "../src/assets/rasberry/3.png",
        "../src/assets/rasberry/4.png"
      ]
    },
    {
      id: 10,
      type: "Macadamia",
      desc: "Tasty macadamia nuts from the northern region.",
      image: "../src/assets/macadamia/macadamia.png",
      images: [
        "../src/assets/macadamia/1.png",
        "../src/assets/macadamia/2.png",
        "../src/assets/macadamia/3.png",
        "../src/assets/macadamia/4.png"
      ]
    },
    {
      id: 11,
      type: "Strawberries",
      desc: "Sweet strawberries from the western region.",
      image: "../src/assets/strawberry/strawberries.png",
      images: [
        "../src/assets/strawberry/1.png",
        "../src/assets/strawberry/2.png",
        "../src/assets/strawberry/3.png",
        "../src/assets/strawberry/4.png"
      ]
    },
    {
      id: 12,
      type: "Paprika",
      desc: "Dark sweet blue berries from Zimbabwe",
      image: "../src/assets/paprika/paprika.png",
      images: [
        "../src/assets/paprika/1.png",
        "../src/assets/paprika/2.png",
        "../src/assets/paprika/3.png",
        "../src/assets/paprika/4.png"
      ]
    },
  ],
};


export const socialLinks = [
  {
    name: "Facebook",
    logo: Facebook,
    link: "#",
  },
  {
    name: "Instagram",
    logo: Instagram,
    link: "#",
  },
  {
    name: "Github",
    logo: Github,
    link: "#",
  },
  {
    name: "Linkedin",
    logo: Linkedin,
    link: "#",
  },
  {
    name: "Mail",
    logo: Mail,
    link: "#",
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
    image: "../src/assets/team/confidence.png",
    facebook: "https://www.facebook.com/africoiner",
    twitter: "https://twitter.com/crnyirenda",
    github: "https://github.com/renegadec"
  },
  {
    name: "Selestine Mabhunuh",
    position: "Co-Founder & COO",
    desc: "Selestine drives the operations strategy of the Tswaanda ecosystem and brand.",
    image: "../src/assets/team/selestine.png",
    facebook: "https://www.facebook.com/selestine.rutendo",
    twitter: "https://twitter.com/selestine_tendo",
    github: "#"
  },
  {
    name: "Isheanesu N. Misi",
    position: "Lead Developer",
    desc: "Nigel is a seasoned full-stack developer with 5 years of experience in web development .",
    image: "../src/assets/team/nigel.png",
    facebook: "https://www.facebook.com/isheanesumisi",
    twitter: "https://twitter.com/thisisisheanesu",
    github: "https://github.com/thisisisheanesu"
  },
]

export const notifications = [
  {
    image: '../src/assets/team/admin.png',
    subject: 'New message',
    username: 'Admin',
    message: 'Cargo dispatched from Zimbabwe, check account for details.',
    time: 'few minutes ago...'
  },
  {
    image: '../src/assets/team/jane.png',
    subject: 'Reminder',
    username: 'Jane Smith',
    message: 'Documentation uploaded. Waiting for approval.',
    time: '2022-01-19 T 09:00:00'
  },
  {
    image: '../src/assets/team/admin.png',
    subject: 'Reminder',
    username: 'Tswaanda Sales',
    message: 'Funds secured with custodial wallet.',
    time: '2022-01-19T09:00:00'
  },
  {
    image: '../src/assets/team/admin.png',
    subject: 'Reminder',
    username: 'Admin',
    message: 'Update billing address.',
    time: '2022-01-19T09:00:00'
  },

];


