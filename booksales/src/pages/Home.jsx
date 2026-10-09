import { Link } from 'react-router'
import books from '../Utils/books'

function Home() {
  return (
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
              <Link
                to="/book"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                <i className="fa-solid fa-book-open me-2"></i>Lihat Koleksi Lengkap
              </Link>
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
              <Link
                to="/book"
                className="btn btn-primary px-4"
              >
                <i className="fa-solid fa-layer-group me-2"></i>Semua Buku
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline-secondary px-4"
              >
                <i className="fa-solid fa-envelope me-2"></i>Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid / Album Cards */}
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
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=700&auto=format&fit=crop'
                      }}
                    />
                    {book.category && (
                      <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                        {book.category}
                      </span>
                    )}
                    <span className="position-absolute top-0 start-0 m-2 badge bg-dark bg-opacity-75">
                      <i className="fa-regular fa-calendar me-1"></i>{book.year}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small className="text-muted fw-medium">
                        <i className="fa-solid fa-user-pen me-1"></i>{book.author}
                      </small>
                      <small className="text-warning fw-semibold">
                        <i className="fa-solid fa-star me-1"></i>
                        {book.rating || '4.8'} ({book.reviews || '500+'})
                      </small>
                    </div>
                    <h5 className="card-title fw-bold text-dark mb-2 text-truncate" title={book.title}>
                      {book.title}
                    </h5>
                    <p className="card-text text-secondary small flex-grow-1">
                      {book.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-2">
                      <span className="text-primary fw-bold fs-5">{book.price || 'Rp 85.000'}</span>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => alert(`Detail buku: ${book.title}\nPenulis: ${book.author}\nTahun: ${book.year}\nDeskripsi: ${book.description}`)}
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
  )
}

export default Home
