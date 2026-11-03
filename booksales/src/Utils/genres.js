// genres.js
// Master data awal kategori / genre buku untuk Bookstore
const genres = [
  {
    id: 1,
    name: "Pemrograman",
    slug: "pemrograman",
    description: "Buku-buku panduan coding, arsitektur software, algoritma, serta pengembangan web dan aplikasi modern.",
    icon: "fa-code",
    color: "primary",
    bookCount: 4,
    status: "Aktif",
    createdAt: "2026-01-10"
  },
  {
    id: 2,
    name: "Self-Help",
    slug: "self-help",
    description: "Panduan praktis pengembangan potensi diri, manajemen waktu, produktivitas, dan pembentukan kebiasaan positif.",
    icon: "fa-heart-circle-bolt",
    color: "success",
    bookCount: 3,
    status: "Aktif",
    createdAt: "2026-01-12"
  },
  {
    id: 3,
    name: "Keuangan",
    slug: "keuangan",
    description: "Edukasi literasi finansial, psikologi uang, manajemen kekayaan pribadi, serta strategi investasi cerdas.",
    icon: "fa-coins",
    color: "warning",
    bookCount: 2,
    status: "Aktif",
    createdAt: "2026-01-15"
  },
  {
    id: 4,
    name: "Filsafat",
    slug: "filsafat",
    description: "Kajian pemikiran mendalam, ajaran kebijaksanaan kuno seperti Stoisisme, dan refleksi esensi eksistensi manusia.",
    icon: "fa-brain",
    color: "info",
    bookCount: 3,
    status: "Aktif",
    createdAt: "2026-01-18"
  },
  {
    id: 5,
    name: "Sastra",
    slug: "sastra",
    description: "Karya prosa fiksi berkualitas tinggi, novel sejarah, drama kehidupan, dan sastra legendaris nusantara maupun dunia.",
    icon: "fa-feather-pointed",
    color: "danger",
    bookCount: 3,
    status: "Aktif",
    createdAt: "2026-01-20"
  },
  {
    id: 6,
    name: "Teknologi",
    slug: "teknologi",
    description: "Wawasan terkini seputar inovasi digital, kecerdasan buatan (AI), keamanan siber, dan transformasi komputasi.",
    icon: "fa-microchip",
    color: "dark",
    bookCount: 2,
    status: "Aktif",
    createdAt: "2026-01-25"
  },
  {
    id: 7,
    name: "Bisnis & Manajemen",
    slug: "bisnis-manajemen",
    description: "Strategi kewirausahaan rintisan (startup), kepemimpinan tim, pemasaran terapan, dan operasional bisnis global.",
    icon: "fa-briefcase",
    color: "secondary",
    bookCount: 1,
    status: "Aktif",
    createdAt: "2026-02-01"
  }
];

export { genres };
export default genres;
