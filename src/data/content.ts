export const business = {
  name: "SIM PODIUM",
  tagline: "The Ultimate Sim Racing Experience in Bangalore",
  addressLines: [
    "#1133, 3rd Floor,",
    "100 Feet Rd,",
    "HAL 2nd Stage, Indiranagar,",
    "Bengaluru, Karnataka 560038",
    "India",
  ],
  addressOneLine:
    "#1133, 3rd Floor, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
  email: "hello@simpodium.in",
  phone: "+91 99000 86633",
  mapEmbed:
    "https://www.google.com/maps?q=1133%203rd%20Floor%20100%20Feet%20Rd%20HAL%202nd%20Stage%20Indiranagar%20Bengaluru%20560038&output=embed",
};

export const services = [
  "Racing Simulator Experience",
  "Gaming Cafe",
  "Food & Beverages",
  "Racing Events",
  "Multiplayer Racing",
  "Esports Practice",
  "Simulator Training",
] as const;

export const experienceCards = [
  {
    title: "Professional Racing Simulators",
    desc: "Rig geometry tuned for comfort, endurance, and control—race-ready.",
    icon: "cockpit",
  },
  {
    title: "Ultra Wide Displays",
    desc: "High refresh immersion with crisp detail and real track depth.",
    icon: "display",
  },
  {
    title: "Force Feedback Steering",
    desc: "Feel kerbs, grip, weight transfer—precision feedback on every turn.",
    icon: "wheel",
  },
  {
    title: "Motion Platforms",
    desc: "Subtle motion cues for braking, acceleration, and apex commitment.",
    icon: "motion",
  },
  {
    title: "Real Racing Physics",
    desc: "Authentic handling and consistency so you improve lap after lap.",
    icon: "physics",
  },
] as const;

export const gallery = [
  {
    title: "Cockpit Rig • Neon Arena",
    img: "https://images.unsplash.com/photo-1526397751294-331021109fbd?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Esports Lounge • Focus Mode",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Ultra Wide Immersion",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Night Club Lighting • Racing Vibe",
    img: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export const packages = [
  {
    name: "Single Race",
    price: "₹299",
    note: "Quick session • Perfect for first-timers",
    features: ["Race-ready setup", "Assisted onboarding", "Best laps saved"],
    accent: "primary",
  },
  {
    name: "Hourly Session",
    price: "₹999",
    note: "Practice • Progress • Consistency",
    features: ["Full hour", "Car/track switching", "Telemetry tips"],
    accent: "secondary",
  },
  {
    name: "Group Racing",
    price: "₹2499",
    note: "Friends • Rivalries • Podium moments",
    features: ["Multiplayer slots", "Mini tournament", "Photo moments"],
    accent: "secondary",
  },
] as const;

export const cafeItems = [
  { name: "Coffee", desc: "Espresso / Latte / Mocha", price: "₹149+" },
  { name: "Cold Drinks", desc: "Iced tea / Cola / Lemonades", price: "₹99+" },
  { name: "Snacks", desc: "Fries / Nachos / Wings", price: "₹179+" },
  { name: "Burgers", desc: "Classic / Chicken / Double", price: "₹249+" },
  { name: "Pizza", desc: "Thin crust • Loaded toppings", price: "₹299+" },
] as const;

export const owners = [
  {
    name: "Nithin HT",
    title: "Co-Founder",
    img: "/Nithin HT.jpg",
    bio: "Passionate about sim racing and creating spaces where gamers and racing enthusiasts can experience pro-grade immersion. Focused on making SIM PODIUM the go-to destination for competitive and casual racers in Bangalore.",
    tagline: "Racing first. Experience everything.",
  },
  {
    name: "Nisargh T",
    title: "Co-Founder",
    img: "/Nisargh T.jpg",
    bio: "Believes in the power of community and cutting-edge tech. Driven to build a lounge that feels like a night race—neon-lit, high-energy, and built for memorable sessions with friends and rivals.",
    tagline: "Where the track meets the lounge.",
  },
] as const;

export const testimonials = [
  {
    name: "Arjun",
    role: "F1 Fan",
    quote:
      "The lighting + rig feel is unreal. I forgot I wasn't on track. Cleanest sim lounge vibe in Bangalore.",
  },
  {
    name: "Sahana",
    role: "Casual Racer",
    quote:
      "Staff helped me set everything up quickly. The experience is premium and super immersive.",
  },
  {
    name: "Karthik",
    role: "Esports Practice",
    quote:
      "Great hardware, consistent feedback, and a vibe that keeps you locked in. Perfect for practice sessions.",
  },
] as const;

export const shopProducts = [
  {
    name: "Steering Wheels",
    desc: "GT / Formula styles",
    price: "₹7,999+",
    img: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Pedals",
    desc: "Load-cell realism",
    price: "₹9,999+",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Racing Gloves",
    desc: "Grip + comfort",
    price: "₹1,499+",
    img: "https://images.unsplash.com/photo-1612810436541-336d6663e041?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Gaming Headsets",
    desc: "Immersive audio",
    price: "₹2,999+",
    img: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Sim Racing Seats",
    desc: "Ergo + stability",
    price: "₹12,999+",
    img: "https://images.unsplash.com/photo-1611891487122-207579d67d98?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

export const booking = {
  simulators: [
    "Podium Pro (Motion)",
    "Podium UltraWide",
    "Podium Duo (Multiplayer)",
    "Podium Trainer",
  ] as const,
  slots: [
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
    "00:00",
    "00:15",
    "00:30",
    "00:45"
  ] as const,
};

