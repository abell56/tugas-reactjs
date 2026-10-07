import { useState } from 'react'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Pertanyaan Buku',
    message: '',
  })

  // Data 9 Buku Best Seller
  const books = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Self-Help',
      price: 'Rp 98.000',
      rating: 4.9,
      reviews: '1.2k',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=700&auto=format&fit=crop',
      description: 'Perubahan kecil yang memberikan hasil luar biasa dalam membangun kebiasaan baik.',
    },
    {
      id: 2,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      category: 'Keuangan',
      price: 'Rp 85.000',
      rating: 4.8,
      reviews: '980',
      image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=700&auto=format&fit=crop',
      description: 'Pelajaran abadi mengenai kekayaan, ketamakan, dan kebiasaan finansial yang bijak.',
    },
    {
      id: 3,
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      category: 'Filsafat',
      price: 'Rp 95.000',
      rating: 4.9,
      reviews: '850',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=700&auto=format&fit=crop',
      description: 'Penerapan filsafat Stoa kuno untuk mental yang tangguh menghadapi emosi negatif.',
    },
    {
      id: 4,
      title: 'Sebuah Seni untuk Bersikap Bodo Amat',
      author: 'Mark Manson',
      category: 'Self-Help',
      price: 'Rp 79.000',
      rating: 4.7,
      reviews: '1.5k',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=700&auto=format&fit=crop',
      description: 'Pendekatan realistis dan tanpa basa-basi untuk menjalani kehidupan yang bahagia.',
    },
    {
      id: 5,
      title: 'Laut Bercerita',
      author: 'Leila S. Chudori',
      category: 'Sastra',
      price: 'Rp 115.000',
      rating: 4.9,
      reviews: '2.1k',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=700&auto=format&fit=crop',
      description: 'Kisah haru persahabatan, cinta, keluarga, dan perjuangan aktivis mahasiswa era 98.',
    },
    {
      id: 6,
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      category: 'Sastra',
      price: 'Rp 125.000',
      rating: 5.0,
      reviews: '3.4k',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=700&auto=format&fit=crop',
      description: 'Karya agung sastra Indonesia tentang pergulatan pemikiran Minke di masa kolonial.',
    },
    {
      id: 7,
      title: 'Rich Dad Poor Dad',
      author: 'Robert T. Kiyosaki',
      category: 'Keuangan',
      price: 'Rp 88.000',
      rating: 4.8,
      reviews: '890',
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=700&auto=format&fit=crop',
      description: 'Mengajarkan pola pikir melek finansial dan cara mengelola aset sejak usia muda.',
    },
    {
      id: 8,
      title: 'Ikigai: Rahasia Hidup Bahagia',
      author: 'Héctor García & Francesc Miralles',
      category: 'Self-Help',
      price: 'Rp 75.000',
      rating: 4.6,
      reviews: '670',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=700&auto=format&fit=crop',
      description: 'Konsep filosofi Jepang untuk menemukan tujuan hidup, kedamaian, dan umur panjang.',
    },
    {
      id: 9,
      title: 'Sapiens: Riwayat Singkat Manusia',
      author: 'Yuval Noah Harari',
      category: 'Filsafat',
      price: 'Rp 145.000',
      rating: 4.9,
      reviews: '1.8k',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=700&auto=format&fit=crop',
      description: 'Penelusuran sejarah evolusi umat manusia dari zaman batu hingga era teknologi modern.',
    },
  ]

  // Data Anggota Tim
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Anindya, M.Hum',
      role: 'Founder & Head Curator',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
      bio: 'Memiliki pengalaman lebih dari 10 tahun di kurasi literatur dan industri penerbitan buku nasional.',
    },
    {
      id: 2,
      name: 'Ahmad Rizky Pratama',
      role: 'Co-Founder & Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop',
      bio: 'Mengelola rantai logistik dan pengiriman agar setiap buku sampai dengan cepat dan aman ke tangan pembaca.',
    },
    {
      id: 3,
      name: 'Dian Lestari',
      role: 'Community & Event Lead',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop',
      bio: 'Menginisiasi book club bulanan, bedah karya penulis, dan membangun interaksi erat antar pembaca.',
    },
    {
      id: 4,
      name: 'Budi Santoso',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
      bio: 'Merancang platform digital Bookstore agar menghadirkan pengalaman belanja buku yang cepat dan mudah.',
    },
  ]

  // Filter buku untuk halaman Book
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setContactForm({ name: '', email: '', subject: 'Pertanyaan Buku', message: '' })
    setTimeout(() => {
      setContactSubmitted(false)
    }, 5000)
  }

  return (
    <>
      {/* ================= HEADER NAVBAR ================= */}
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setActivePage('home')
              }}
              className="d-inline-flex align-items-center gap-2 text-dark text-decoration-none"
            >
              <i
                className="fa-solid fa-book fa-2xl"
                style={{ color: 'rgb(116, 192, 252)' }}
              ></i>
              <span className="fs-4 fw-bold">bookstore</span>
            </a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage('home')
                }}
                className={`nav-link px-3 ${
                  activePage === 'home' ? 'text-primary fw-bold active-nav' : 'text-primary'
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage('book')
                }}
                className={`nav-link px-3 ${
                  activePage === 'book' ? 'text-primary fw-bold active-nav' : 'text-primary'
                }`}
              >
                Book
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage('team')
                }}
                className={`nav-link px-3 ${
                  activePage === 'team' ? 'text-primary fw-bold active-nav' : 'text-primary'
                }`}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage('contact')
                }}
                className={`nav-link px-3 ${
                  activePage === 'contact' ? 'text-primary fw-bold active-nav' : 'text-primary'
                }`}
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={() => alert('Fitur Login akan segera hadir!')}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => alert('Fitur Register akan segera hadir!')}
            >
              Register
            </button>
          </div>
        </header>
      </div>

      {/* ================= HALAMAN HOME ================= */}
      {activePage === 'home' && (
        <>
          {/* Hero Section */}
          <div className="container my-5">
            <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg bg-white">
              <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill mb-3 fw-semibold">
                  <i className="fa-solid fa-award me-1"></i> #1 Best Seller of the Month
                </span>
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                  Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa
                </h1>
                <p className="lead text-secondary mb-4">
                  Cara termudah dan terbukti untuk membangun kebiasaan baik dan melepaskan kebiasaan buruk karya <strong>James Clear</strong>. Mulai transformasi hidup Anda cukup 1% setiap hari.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg px-4 me-md-2 fw-semibold"
                    onClick={() => alert('Buku Atomic Habits berhasil ditambahkan ke keranjang belanja!')}
                  >
                    <i className="fa-solid fa-cart-shopping me-2"></i>Beli Sekarang (Rp 98.000)
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={() => setActivePage('book')}
                  >
                    <i className="fa-solid fa-book-open me-2"></i>Lihat Koleksi Lain
                  </button>
                </div>
                <div className="d-flex align-items-center gap-3 pt-2 text-muted small">
                  <span><i className="fa-solid fa-star text-warning"></i> 4.9 (1.200+ Ulasan)</span>
                  <span>•</span>
                  <span><i className="fa-solid fa-check text-success"></i> 100% Original</span>
                  <span>•</span>
                  <span><i className="fa-solid fa-truck-fast text-primary"></i> Gratis Ongkir</span>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg rounded-3">
                <img
                  className="rounded-3 hero-book-img"
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
                  alt="Atomic Habits Book Cover"
                />
              </div>
            </div>
          </div>

          {/* Product List Intro */}
          <section className="py-4 text-center container">
            <div className="row py-lg-4">
              <div className="col-lg-7 col-md-8 mx-auto">
                <span className="badge bg-secondary-subtle text-secondary px-3 py-1 rounded-pill mb-2">Koleksi Terpopuler</span>
                <h1 className="fw-bold text-dark">Best Selling Books</h1>
                <p className="lead text-body-secondary">
                  Jelajahi buku-buku terlaris pilihan pembaca bookstore. Dari pengembangan diri, finansial, hingga sastra klasik untuk menemani waktu luang Anda.
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    onClick={() => setActivePage('book')}
                    className="btn btn-primary px-4"
                  >
                    <i className="fa-solid fa-grid-2 me-2"></i>Semua Buku
                  </button>
                  <button
                    onClick={() => setActivePage('contact')}
                    className="btn btn-outline-secondary px-4"
                  >
                    <i className="fa-solid fa-envelope me-2"></i>Hubungi Kami
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Product Grid / Album (9 Cards) */}
          <div className="album py-5 bg-body-tertiary">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {books.map((book) => (
                  <div className="col" key={book.id}>
                    <div className="card h-100 shadow-sm border-0 book-card">
                      <div className="position-relative overflow-hidden">
                        <img
                          src={book.image}
                          className="card-img-top book-cover-img"
                          alt={book.title}
                        />
                        <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                          {book.category}
                        </span>
                      </div>
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">{book.author}</small>
                          <small className="text-warning fw-semibold">
                            <i className="fa-solid fa-star me-1"></i>
                            {book.rating} ({book.reviews})
                          </small>
                        </div>
                        <h5 className="card-title fw-bold text-dark mb-2 text-truncate" title={book.title}>
                          {book.title}
                        </h5>
                        <p className="card-text text-secondary small flex-grow-1">
                          {book.description}
                        </p>
                        <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-2">
                          <span className="text-primary fw-bold fs-5">{book.price}</span>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => alert(`Detail buku: ${book.title} karya ${book.author}`)}
                            >
                              Detail
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={() => alert(`Berhasil menambahkan "${book.title}" ke keranjang!`)}
                            >
                              <i className="fa-solid fa-cart-shopping me-1"></i>Beli
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= HALAMAN BOOK (KATALOG) ================= */}
      {activePage === 'book' && (
        <div className="container my-5">
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill mb-2">Katalog Lengkap</span>
            <h1 className="fw-bold">Koleksi Buku Bookstore</h1>
            <p className="lead text-secondary">
              Temukan berbagai buku pilihan dari berbagai kategori terbaik untuk memenuhi kebutuhan bacaan Anda.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="row g-3 justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="fa-solid fa-magnifying-glass text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari berdasarkan judul atau penulis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchQuery('')}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="btn-group" role="group">
                {['Semua', 'Self-Help', 'Keuangan', 'Sastra', 'Filsafat'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`btn btn-sm ${
                      selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Book Catalog Grid */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div className="col" key={book.id}>
                  <div className="card h-100 shadow-sm border-0 book-card">
                    <div className="position-relative overflow-hidden">
                      <img
                        src={book.image}
                        className="card-img-top book-cover-img"
                        alt={book.title}
                      />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                        {book.category}
                      </span>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted">{book.author}</small>
                        <small className="text-warning fw-semibold">
                          <i className="fa-solid fa-star me-1"></i>
                          {book.rating}
                        </small>
                      </div>
                      <h5 className="card-title fw-bold text-dark mb-2 text-truncate">
                        {book.title}
                      </h5>
                      <p className="card-text text-secondary small flex-grow-1">
                        {book.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-2">
                        <span className="text-primary fw-bold fs-5">{book.price}</span>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => alert(`Detail buku: ${book.title}`)}
                          >
                            Detail
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => alert(`Buku ${book.title} ditambahkan ke keranjang!`)}
                          >
                            <i className="fa-solid fa-cart-shopping me-1"></i>Beli
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="fa-solid fa-book-open fa-3x text-muted mb-3"></i>
                <h4 className="text-secondary">Tidak ada buku yang cocok dengan pencarian</h4>
                <p className="text-muted">Coba gunakan kata kunci lain atau ubah kategori pilihan.</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('Semua')
                  }}
                >
                  Tampilkan Semua Buku
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= HALAMAN TEAM ================= */}
      {activePage === 'team' && (
        <div className="container my-5">
          {/* Header Team */}
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill mb-2">Tim Kami</span>
            <h1 className="fw-bold">Kenali Tim di Balik Bookstore</h1>
            <p className="lead text-secondary col-lg-7 mx-auto">
              Dedikasi kami adalah menghadirkan bacaan berkualitas, memperluas wawasan, dan mempermudah akses buku bermutu bagi seluruh masyarakat Indonesia.
            </p>
          </div>

          {/* Grid Anggota Tim */}
          <div className="row g-4 mb-5">
            {teamMembers.map((member) => (
              <div className="col-lg-3 col-md-6" key={member.id}>
                <div className="card h-100 border-0 shadow-sm text-center p-4 team-card">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-avatar mb-3"
                  />
                  <h5 className="fw-bold text-dark mb-1">{member.name}</h5>
                  <p className="text-primary small fw-semibold mb-3">{member.role}</p>
                  <p className="text-secondary small mb-4">{member.bio}</p>
                  <div className="d-flex justify-content-center gap-2 mt-auto">
                    <a href="#" className="social-icon-btn" title="LinkedIn">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="social-icon-btn" title="Twitter / X">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="#" className="social-icon-btn" title="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="social-icon-btn" title="GitHub">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nilai / Values Section (Template Bootstrap Features) */}
          <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 border-top mt-4">
            <div className="feature col text-center p-3">
              <div className="d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-circle" style={{ width: '64px', height: '64px' }}>
                <i className="fa-solid fa-book-open-reader"></i>
              </div>
              <h3 className="fs-4 fw-bold text-body-emphasis">Kurasi Pilihan</h3>
              <p className="text-secondary">
                Setiap judul buku yang hadir di katalog kami telah melewati kurasi ketat agar memberikan wawasan berbobot dan menginspirasi hidup Anda.
              </p>
            </div>
            <div className="feature col text-center p-3">
              <div className="d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-circle" style={{ width: '64px', height: '64px' }}>
                <i className="fa-solid fa-certificate"></i>
              </div>
              <h3 className="fs-4 fw-bold text-body-emphasis">100% Asli & Bergaransi</h3>
              <p className="text-secondary">
                Kami bekerjasama langsung dengan para penerbit terkemuka untuk memastikan setiap eksemplar buku asli, bebas bajakan, dan berkualitas tinggi.
              </p>
            </div>
            <div className="feature col text-center p-3">
              <div className="d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-circle" style={{ width: '64px', height: '64px' }}>
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3 className="fs-4 fw-bold text-body-emphasis">Layanan Ramah</h3>
              <p className="text-secondary">
                Tim dukungan pelanggan kami selalu siap mendengarkan kebutuhan, memberikan rekomendasi buku, dan membantu proses pemesanan Anda.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= HALAMAN CONTACT ================= */}
      {activePage === 'contact' && (
        <div className="container my-5">
          {/* Header Contact */}
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill mb-2">Hubungi Kami</span>
            <h1 className="fw-bold">Kami Siap Membantu Anda</h1>
            <p className="lead text-secondary col-lg-7 mx-auto">
              Punya pertanyaan seputar ketersediaan buku, status pengiriman, atau ingin merekomendasikan judul baru? Kirimkan pesan Anda melalui formulir di bawah ini.
            </p>
          </div>

          <div className="row g-5">
            {/* Kolom Kiri: Informasi Kontak */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm p-4 bg-body-tertiary h-100">
                <h4 className="fw-bold text-dark mb-4">Informasi Kontak</h4>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="text-primary fs-4 mt-1">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Alamat Toko & Kantor</h6>
                    <p className="text-secondary mb-0 small">
                      Jl. Lenteng Agung Raya No. 20, Jagakarsa, Jakarta Selatan, DKI Jakarta 12610
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="text-primary fs-4 mt-1">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email Resmi</h6>
                    <p className="text-secondary mb-0 small">
                      support@bookstore.id<br />
                      kerjasama@bookstore.id
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="text-primary fs-4 mt-1">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Telepon & WhatsApp</h6>
                    <p className="text-secondary mb-0 small">
                      +62 (021) 7890-1234<br />
                      +62 812-3456-7890 (WhatsApp CS)
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="text-primary fs-4 mt-1">
                    <i className="fa-regular fa-clock"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Jam Operasional</h6>
                    <p className="text-secondary mb-0 small">
                      Senin - Jumat: 08.00 - 20.00 WIB<br />
                      Sabtu - Minggu: 09.00 - 17.00 WIB
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-top mt-auto">
                  <h6 className="fw-bold mb-2">Ikuti Media Sosial Kami:</h6>
                  <div className="d-flex gap-2">
                    <a href="#" className="social-icon-btn"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#" className="social-icon-btn"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="social-icon-btn"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="#" className="social-icon-btn"><i className="fa-brands fa-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Form Kontak Bootstrap */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm p-4 p-md-5">
                <h4 className="fw-bold text-dark mb-2">Kirim Pesan</h4>
                <p className="text-secondary small mb-4">
                  Isi formulir di bawah ini dan tim customer service kami akan merespon dalam waktu maksimal 1x24 jam kerja.
                </p>

                {contactSubmitted && (
                  <div className="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                    <i className="fa-solid fa-circle-check fs-4 me-3"></i>
                    <div>
                      <strong>Pesan Terkirim!</strong> Terima kasih telah menghubungi Bookstore. Tim kami akan segera membalas ke email Anda.
                    </div>
                  </div>
                )}

                <form onSubmit={handleContactSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Nama Lengkap</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contoh: Budi Santoso"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Alamat Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="email@contoh.com"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Kategori Pesan</label>
                      <select
                        className="form-select"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      >
                        <option value="Pertanyaan Buku">Pertanyaan Ketersediaan Buku</option>
                        <option value="Status Pesanan">Status Pemesanan & Pengiriman</option>
                        <option value="Rekomendasi Judul">Rekomendasi Judul / Request Buku</option>
                        <option value="Kerjasama">Kerjasama Penerbit & Bisnis</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Isi Pesan</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Tuliskan pertanyaan atau pesan Anda secara lengkap di sini..."
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary px-4 py-2 fw-semibold">
                        <i className="fa-solid fa-paper-plane me-2"></i>Kirim Pesan Sekarang
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="container">
        <footer className="py-4 my-4 border-top">
          <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-3 border-bottom">
            <div className="d-flex align-items-center gap-2 mb-3 mb-md-0">
              <i
                className="fa-solid fa-book fa-xl"
                style={{ color: 'rgb(116, 192, 252)' }}
              ></i>
              <span className="fw-bold fs-5 text-dark">bookstore</span>
              <span className="text-muted ms-2 small d-none d-md-inline">| Rumah Buku & Inspirasi Terpercaya</span>
            </div>

            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setActivePage('home')
                  }}
                  className={`nav-link px-2 ${activePage === 'home' ? 'text-primary fw-bold' : 'text-body-secondary'}`}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setActivePage('book')
                  }}
                  className={`nav-link px-2 ${activePage === 'book' ? 'text-primary fw-bold' : 'text-body-secondary'}`}
                >
                  Book
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setActivePage('team')
                  }}
                  className={`nav-link px-2 ${activePage === 'team' ? 'text-primary fw-bold' : 'text-body-secondary'}`}
                >
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setActivePage('contact')
                  }}
                  className={`nav-link px-2 ${activePage === 'contact' ? 'text-primary fw-bold' : 'text-body-secondary'}`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center text-body-secondary small">
            <p className="mb-0">&copy; 2026 bookstore - NF Academy. All rights reserved.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-decoration-none text-muted">Syarat & Ketentuan</a>
              <span>•</span>
              <a href="#" className="text-decoration-none text-muted">Kebijakan Privasi</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
