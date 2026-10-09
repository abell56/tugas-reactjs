import { useState } from 'react'
import books from '../Utils/books'

function Book() {
  // State daftar buku menggunakan Hook useState
  const [bookList, setBookList] = useState(books)
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  // State untuk form tambah buku (Hooks)
  const [showForm, setShowForm] = useState(false)
  const [formInput, setFormInput] = useState({
    title: '',
    author: '',
    year: new Date().getFullYear(),
    category: 'Pemrograman',
    price: 'Rp 85.000',
    description: '',
    image: '',
  })
  const [alertMessage, setAlertMessage] = useState(null)

  // Handle perubahan nilai input form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle submit form penambahan data menggunakan Hook
  const handleAddBookSubmit = (e) => {
    e.preventDefault()
    if (!formInput.title.trim() || !formInput.author.trim()) {
      alert('Judul dan Penulis buku wajib diisi!')
      return
    }

    const newBookItem = {
      id: Date.now(),
      title: formInput.title.trim(),
      author: formInput.author.trim(),
      year: Number(formInput.year) || new Date().getFullYear(),
      category: formInput.category || 'Umum',
      price: formInput.price.trim() || 'Rp 85.000',
      rating: 5.0,
      reviews: 'Baru',
      description:
        formInput.description.trim() ||
        'Buku baru yang ditambahkan ke dalam katalog.',
      image:
        formInput.image.trim() ||
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=700&auto=format&fit=crop',
    }

    // Menambahkan data buku baru ke dalam state
    setBookList([newBookItem, ...bookList])
    setAlertMessage(`Buku "${newBookItem.title}" berhasil ditambahkan ke katalog!`)

    // Reset form
    setFormInput({
      title: '',
      author: '',
      year: new Date().getFullYear(),
      category: 'Pemrograman',
      price: 'Rp 85.000',
      description: '',
      image: '',
    })
    setShowForm(false)

    setTimeout(() => {
      setAlertMessage(null)
    }, 3500)
  }

  // Ambil daftar kategori unik secara dinamis
  const categories = [
    'Semua',
    ...Array.from(new Set(bookList.map((b) => b.category).filter(Boolean))),
  ]

  // Filter buku untuk pencarian dan kategori
  const filteredBooks = bookList.filter((book) => {
    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      String(book.year).includes(query)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container my-5">
      {/* Header Halaman */}
      <div className="text-center mb-4">
        <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill mb-2">
          Katalog Lengkap
        </span>
        <h1 className="fw-bold">Koleksi Buku Bookstore</h1>
        <p className="lead text-secondary">
          Temukan berbagai buku pilihan dari berbagai kategori terbaik untuk memenuhi kebutuhan bacaan Anda.
        </p>

        {/* Tombol Tambah Buku */}
        <div className="d-flex justify-content-center mt-3">
          <button
            type="button"
            className={`btn ${
              showForm ? 'btn-outline-secondary' : 'btn-primary'
            } px-4 py-2 rounded-pill fw-semibold shadow-sm`}
            onClick={() => setShowForm(!showForm)}
          >
            <i className={`fa-solid ${showForm ? 'fa-xmark' : 'fa-plus'} me-2`}></i>
            {showForm ? 'Tutup Formulir' : 'Tambah Buku'}
          </button>
        </div>
      </div>

      {/* Alert Notifikasi Sukses */}
      {alertMessage && (
        <div
          className="alert alert-success alert-dismissible fade show shadow-sm my-3"
          role="alert"
        >
          <i className="fa-solid fa-circle-check me-2"></i>
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlertMessage(null)}
          ></button>
        </div>
      )}

      {/* Formulir Tambah Buku */}
      {showForm && (
        <div className="card shadow-sm border-0 bg-white rounded-3 mb-5 p-2">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <h5 className="mb-0 fw-bold text-dark">
                <i className="fa-solid fa-square-plus text-primary me-2"></i>
                Formulir Tambah Buku
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowForm(false)}
              ></button>
            </div>

            <form onSubmit={handleAddBookSubmit}>
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label fw-semibold text-secondary small">
                    Judul Buku <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Masukkan judul buku..."
                    value={formInput.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold text-secondary small">
                    Tahun Terbit
                  </label>
                  <input
                    type="number"
                    name="year"
                    className="form-control"
                    placeholder="2024"
                    value={formInput.year}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary small">
                    Penulis <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    className="form-control"
                    placeholder="Nama penulis buku..."
                    value={formInput.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold text-secondary small">
                    Kategori
                  </label>
                  <select
                    name="category"
                    className="form-select"
                    value={formInput.category}
                    onChange={handleInputChange}
                  >
                    <option value="Pemrograman">Pemrograman</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Filsafat">Filsafat</option>
                    <option value="Sastra">Sastra</option>
                    <option value="Teknologi">Teknologi</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold text-secondary small">
                    Harga
                  </label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Contoh: Rp 85.000"
                    value={formInput.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold text-secondary small">
                    URL Sampul Gambar
                  </label>
                  <input
                    type="url"
                    name="image"
                    className="form-control"
                    placeholder="https://... (opsional, biarkan kosong untuk gambar default)"
                    value={formInput.image}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold text-secondary small">
                    Deskripsi Buku
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Tuliskan deskripsi atau ringkasan isi buku..."
                    value={formInput.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="col-12 d-flex justify-content-end gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setShowForm(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 fw-semibold"
                  >
                    <i className="fa-solid fa-check me-2"></i>
                    Simpan Buku
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

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
              placeholder="Cari berdasarkan judul, penulis, atau tahun..."
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
            {categories.map((cat) => (
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

      {/* Book Catalog Grid - Menggunakan Metode MAP */}
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
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=700&auto=format&fit=crop'
                    }}
                  />
                  {book.category && (
                    <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                      {book.category}
                    </span>
                  )}
                  <span className="position-absolute top-0 start-0 m-2 badge bg-dark bg-opacity-75">
                    <i className="fa-regular fa-calendar me-1"></i>
                    {book.year}
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted fw-medium">
                      <i className="fa-solid fa-user-pen me-1"></i>
                      {book.author}
                    </small>
                    <small className="text-warning fw-semibold">
                      <i className="fa-solid fa-star me-1"></i>
                      {book.rating || '4.8'} ({book.reviews || '500+'})
                    </small>
                  </div>
                  <h5
                    className="card-title fw-bold text-dark mb-2 text-truncate"
                    title={book.title}
                  >
                    {book.title}
                  </h5>
                  <p className="card-text text-secondary small flex-grow-1">
                    {book.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-2">
                    <span className="text-primary fw-bold fs-5">
                      {book.price || 'Rp 85.000'}
                    </span>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          alert(
                            `Detail Buku:\nJudul: ${book.title}\nPenulis: ${book.author}\nTahun: ${book.year}\nKategori: ${book.category || '-'}\nSinopsis: ${book.description}`
                          )
                        }
                      >
                        Detail
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          alert(`Buku "${book.title}" berhasil ditambahkan ke keranjang belanja!`)
                        }
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
