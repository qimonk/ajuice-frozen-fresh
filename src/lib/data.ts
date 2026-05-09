export interface Product {
  id: string;
  name: string;
  category: "fruit" | "vegetable";
  image: string;
  description: string;
  prices: { label: string; price: string }[];
  color: string;
  gradient: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  product: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const WHATSAPP_NUMBER = "6285520913524";
export const BRAND_NAME = "Ajuice Frozen & Fresh";
export const BRAND_ADDRESS = "Jl Hj Alpi No 116/80";

export const products: Product[] = [
  {
    id: "terong-belanda",
    name: "Terong Belanda",
    category: "vegetable",
    image: "/terong-belanda.png",
    description: "Jus terong belanda segar kaya antioksidan dan vitamin C untuk menjaga daya tahan tubuh.",
    prices: [{ label: "250ml", price: "Rp12.500" }],
    color: "#e74c3c",
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: "wortel",
    name: "Wortel",
    category: "vegetable",
    image: "/wortel.png",
    description: "Jus wortel premium kaya beta-karoten untuk kesehatan mata dan kulit yang cerah.",
    prices: [{ label: "250ml", price: "Rp12.500" }],
    color: "#f39c12",
    gradient: "from-orange-400 to-amber-500",
  },
  {
    id: "sosin",
    name: "Sosin",
    category: "vegetable",
    image: "/sosin.png",
    description: "Jus selada air segar yang kaya nutrisi, sempurna untuk detox dan hidup sehat.",
    prices: [{ label: "250ml", price: "Rp12.500" }],
    color: "#27ae60",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    id: "brokoli",
    name: "Brukoli",
    category: "vegetable",
    image: "/brokoli.png",
    description: "Jus brokoli penuh vitamin K dan serat, pilihan sehat untuk diet seimbang.",
    prices: [{ label: "250ml", price: "Rp12.500" }],
    color: "#2ecc71",
    gradient: "from-green-500 to-lime-600",
  },
  {
    id: "jambu-merah",
    name: "Jambu Merah",
    category: "fruit",
    image: "/guava.png",
    description: "Jus jambu merah segar dengan rasa manis alami, kaya vitamin C untuk imunitas.",
    prices: [
      { label: "Jerigen 5L", price: "Rp180.000" },
      { label: "250ml", price: "Rp8.000" },
      { label: "500ml", price: "Rp20.000" },
      { label: "1000ml", price: "Rp25.000" },
    ],
    color: "#e74c3c",
    gradient: "from-rose-400 to-red-500",
  },
  {
    id: "sirsak",
    name: "Sirsak",
    category: "fruit",
    image: "/sirsak.png",
    description: "Jus sirsak segar dengan rasa asam manis yang menyegarkan, khasiat untuk kesehatan.",
    prices: [
      { label: "Jerigen 5L", price: "Rp180.000" },
      { label: "250ml", price: "Rp8.000" },
      { label: "500ml", price: "Rp20.000" },
      { label: "1000ml", price: "Rp25.000" },
    ],
    color: "#8e44ad",
    gradient: "from-green-300 to-emerald-400",
  },
  {
    id: "mangga",
    name: "Mangga",
    category: "fruit",
    image: "/mangga.png",
    description: "Jus mangga harum manis khas tropis, segar dan kaya vitamin A untuk tubuh sehat.",
    prices: [
      { label: "Jerigen 5L", price: "Rp180.000" },
      { label: "250ml", price: "Rp8.000" },
      { label: "500ml", price: "Rp20.000" },
      { label: "1000ml", price: "Rp25.000" },
    ],
    color: "#f39c12",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    id: "buah-naga",
    name: "Buah Naga",
    category: "fruit",
    image: "/dragonfruit.png",
    description: "Jus buah naga merah yang cantik dan menyegarkan, kaya antioksidan premium.",
    prices: [
      { label: "Jerigen 5L", price: "Rp180.000" },
      { label: "250ml", price: "Rp8.000" },
      { label: "500ml", price: "Rp20.000" },
      { label: "1000ml", price: "Rp25.000" },
    ],
    color: "#c0392b",
    gradient: "from-pink-400 to-fuchsia-500",
  },
  {
    id: "stroberi",
    name: "Stroberi",
    category: "fruit",
    image: "/strawberry.png",
    description: "Jus stroberi segar manis, kaya vitamin C dan antioksidan untuk kulit cantik alami.",
    prices: [
      { label: "Jerigen 5L", price: "Rp180.000" },
      { label: "250ml", price: "Rp8.000" },
      { label: "500ml", price: "Rp20.000" },
      { label: "1000ml", price: "Rp25.000" },
    ],
    color: "#e74c3c",
    gradient: "from-red-400 to-pink-500",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Anisa Rahma",
    avatar: "AR",
    rating: 5,
    text: "Jusnya benar-benar segar dan enak! Rasanya alami tanpa tambahan gula berlebihan. Keluarga saya sangat suka, terutama jus mangga dan jambu merah. Pasti order lagi!",
    product: "Jus Mangga & Jambu Merah",
  },
  {
    id: "2",
    name: "Budi Santoso",
    avatar: "BS",
    rating: 5,
    text: "Kualitas premium dengan harga terjangkau. Saya rutin order jerigen 5 liter untuk konsumsi keluarga sebulan. Pelayanan cepat dan ramah. Sangat recommended!",
    product: "Jerigen Jus Fruit",
  },
  {
    id: "3",
    name: "Dewi Lestari",
    avatar: "DL",
    rating: 5,
    text: "Sudah 3 bulan langganan jus wortel dan brokoli untuk program diet saya. Hasilnya luar biasa! Tubuh lebih fit dan berat badan turun bertahap. Terima kasih Ajuice!",
    product: "Jus Vegetable Diet",
  },
  {
    id: "4",
    name: "Rizky Pratama",
    avatar: "RP",
    rating: 4,
    text: "Jus buah naga dan stroberi favorit anak-anak. Warnanya cantik dan rasanya enak. Packagingnya juga rapi dan higienis. Worth every penny!",
    product: "Jus Buah Naga & Stroberi",
  },
  {
    id: "5",
    name: "Sari Wulandari",
    avatar: "SW",
    rating: 5,
    text: "Untuk program detox saya minum jus terong belanda dan sosin setiap hari. Badan terasa lebih ringan dan kulit lebih cerah. Truly fresh and healthy!",
    product: "Detox Juice Vegetable",
  },
  {
    id: "6",
    name: "Ahmad Fauzi",
    avatar: "AF",
    rating: 5,
    text: "Setiap minggu selalu order untuk kantor. Semua kolega suka! Varian rasa lengkap dan semuanya enak. Ajuice memang juara untuk jus segar berkualitas.",
    product: "Mixed Variety Pack",
  },
];

export const benefits: Benefit[] = [
  {
    id: "1",
    title: "Fresh Harian",
    description:
      "Semua jus dibuat fresh setiap hari dari buah dan sayuran pilihan berkualitas tinggi. Kami menjamin kesegaran dari kebun langsung ke gelas Anda, tanpa proses penyimpanan berkepanjangan yang mengurangi nutrisi.",
    icon: "Leaf",
  },
  {
    id: "2",
    title: "Tanpa Pengawet",
    description:
      "100% alami tanpa bahan pengawet, pewarna buatan, atau pemanis sintetis. Kealamian adalah janji kami, karena kesehatan Anda adalah prioritas utama dalam setiap tetes jus yang kami produksi.",
    icon: "ShieldCheck",
  },
  {
    id: "3",
    title: "Vitamin Alami",
    description:
      "Kaya vitamin dan mineral alami yang dibutuhkan tubuh untuk menjaga imunitas dan energi sepanjang hari. Satu gelas jus kami mengandung nutrisi setara dengan beberapa porsi buah segar.",
    icon: "Sparkles",
  },
  {
    id: "4",
    title: "Sehat untuk Tubuh",
    description:
      "Diproduksi dengan standar hygiene tinggi untuk menjaga kualitas dan kesehatan Anda. Proses cold-pressed kami mempertahankan enzim dan nutrisi penting yang biasanya hilang pada proses biasa.",
    icon: "Heart",
  },
  {
    id: "5",
    title: "Cocok untuk Detox",
    description:
      "Pilihan tepat untuk program detoxifikasi tubuh secara alami. Kombinasi serat dan antioksidan dalam jus kami membantu membersihkan racun dan memperbaiki sistem pencernaan Anda.",
    icon: "Zap",
  },
  {
    id: "6",
    title: "Cocok untuk Diet",
    description:
      "Rendah kalori dan tinggi nutrisi, mendukung program diet sehat Anda tanpa mengorbankan rasa. Nikmati kelezatan jus segar sambil menjaga berat badan ideal dengan cara yang menyenangkan.",
    icon: "TrendingDown",
  },
];

export const fruitEmojis = [
  { emoji: "🍎", x: "10%", y: "20%", delay: 0, size: 40 },
  { emoji: "🍊", x: "85%", y: "15%", delay: 0.5, size: 36 },
  { emoji: "🍋", x: "75%", y: "70%", delay: 1, size: 32 },
  { emoji: "🍇", x: "15%", y: "75%", delay: 1.5, size: 38 },
  { emoji: "🍓", x: "90%", y: "45%", delay: 0.8, size: 30 },
  { emoji: "🥝", x: "5%", y: "50%", delay: 1.2, size: 34 },
  { emoji: "🥭", x: "45%", y: "10%", delay: 0.3, size: 42 },
  { emoji: "🍍", x: "60%", y: "85%", delay: 1.8, size: 36 },
  { emoji: "🫐", x: "30%", y: "85%", delay: 0.7, size: 28 },
  { emoji: "🍒", x: "70%", y: "30%", delay: 1.4, size: 30 },
];
