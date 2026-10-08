import { useState } from 'react'
import { books } from '../data/books'

function Book() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter buku untuk halaman Book
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
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
          <div className="btn-group flex-wrap" role="group">
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
  )
}

export default Book
