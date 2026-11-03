import { useState, useEffect } from 'react'

function Admin({ defaultTab = 'genre' }) {
  // State untuk Tab Aktif: 'genre' atau 'author'
  const [activeTab, setActiveTab] = useState(defaultTab)

  // State Data
  const [genreList, setGenreList] = useState([])
  const [authorList, setAuthorList] = useState([])

  // State Loading
  const [loading, setLoading] = useState(true)

  // State Pencarian
  const [genreSearch, setGenreSearch] = useState('')
  const [authorSearch, setAuthorSearch] = useState('')

  // State Toggle Tampilan Form
  const [showGenreForm, setShowGenreForm] = useState(false)
  const [showAuthorForm, setShowAuthorForm] = useState(false)

  // State Notifikasi
  const [alert, setAlert] = useState(null)

  const triggerAlert = (text, type = 'success') => {
    setAlert({ text, type })
    setTimeout(() => {
      setAlert(null)
    }, 4000)
  }

  // =========================================================================
  // FETCH DATA
  // =========================================================================
  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [resGenres, resAuthors] = await Promise.all([
        fetch('/api/genres'),
        fetch('/api/authors'),
      ])

      if (resGenres.ok && resAuthors.ok) {
        const genresData = await resGenres.json()
        const authorsData = await resAuthors.json()
        setGenreList(genresData)
        setAuthorList(authorsData)
      }
    } catch (err) {
      console.warn('Gagal memuat data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  // =========================================================================
  // LOGIKA CREATE: GENRE
  // =========================================================================
  const [genreForm, setGenreForm] = useState({
    name: '',
    description: '',
  })
  const [savingGenre, setSavingGenre] = useState(false)

  const handleGenreInputChange = (e) => {
    const { name, value } = e.target
    setGenreForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateGenre = async (e) => {
    e.preventDefault()

    if (!genreForm.name.trim()) {
      window.alert('Nama Genre wajib diisi!')
      return
    }

    setSavingGenre(true)
    try {
      const response = await fetch('/api/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: genreForm.name.trim(),
          description: genreForm.description.trim(),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        triggerAlert(`Genre "${genreForm.name.trim()}" berhasil ditambahkan!`)
        setGenreForm({ name: '', description: '' })
        setShowGenreForm(false)
        fetchAllData()
      } else {
        triggerAlert(result.error || 'Gagal menambahkan genre.', 'danger')
      }
    } catch (error) {
      triggerAlert('Terjadi kesalahan jaringan saat menyimpan data.', 'danger')
      console.error(error)
    } finally {
      setSavingGenre(false)
    }
  }

  // =========================================================================
  // LOGIKA CREATE: AUTHOR
  // =========================================================================
  const [authorForm, setAuthorForm] = useState({
    name: '',
    photo: '',
    bio: '',
  })
  const [savingAuthor, setSavingAuthor] = useState(false)

  const handleAuthorInputChange = (e) => {
    const { name, value } = e.target
    setAuthorForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateAuthor = async (e) => {
    e.preventDefault()

    if (!authorForm.name.trim()) {
      window.alert('Nama Penulis wajib diisi!')
      return
    }

    setSavingAuthor(true)
    try {
      const defaultPhoto =
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'

      const response = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: authorForm.name.trim(),
          photo: authorForm.photo.trim() || defaultPhoto,
          bio: authorForm.bio.trim(),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        triggerAlert(`Penulis "${authorForm.name.trim()}" berhasil ditambahkan!`)
        setAuthorForm({ name: '', photo: '', bio: '' })
        setShowAuthorForm(false)
        fetchAllData()
      } else {
        triggerAlert(result.error || 'Gagal menambahkan author.', 'danger')
      }
    } catch (error) {
      triggerAlert('Terjadi kesalahan jaringan saat menyimpan data.', 'danger')
      console.error(error)
    } finally {
      setSavingAuthor(false)
    }
  }

  // Helper untuk menampilkan foto avatar author dengan fallback
  const getAuthorPhoto = (photo, id) => {
    if (photo && (photo.startsWith('http://') || photo.startsWith('https://'))) {
      return photo
    }
    const defaultAvatars = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
    ]
    return defaultAvatars[(id || 0) % defaultAvatars.length]
  }

  // =========================================================================
  // LOGIKA FILTER PENCARIAN
  // =========================================================================
  const filteredGenres = genreList.filter((g) => {
    const q = genreSearch.toLowerCase()
    return (
      (g.name && g.name.toLowerCase().includes(q)) ||
      (g.description && g.description.toLowerCase().includes(q)) ||
      String(g.id).includes(q)
    )
  })

  const filteredAuthors = authorList.filter((a) => {
    const q = authorSearch.toLowerCase()
    return (
      (a.name && a.name.toLowerCase().includes(q)) ||
      (a.bio && a.bio.toLowerCase().includes(q)) ||
      String(a.id).includes(q)
    )
  })

  return (
    <div className="container my-5">
      {/* Header Halaman Admin */}
      <div className="text-center mb-4">
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill mb-2 fw-semibold">
          <i className="fa-solid fa-shield-halved me-1"></i> Admin Panel
        </span>
        <h1 className="fw-bold text-dark">Manajemen Data Bookstore</h1>
        <p className="lead text-secondary col-lg-8 mx-auto">
          Kelola master data <strong>Genre</strong> dan <strong>Author</strong> untuk katalog toko buku.
        </p>
      </div>

      {/* Ringkasan Statistik */}
      <div className="row g-3 mb-4 justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card border-0 shadow-sm rounded-3 bg-white p-3 h-100">
            <div className="d-flex align-items-center">
              <div
                className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center me-3"
                style={{ width: '52px', height: '52px', fontSize: '1.4rem' }}
              >
                <i className="fa-solid fa-tags"></i>
              </div>
              <div>
                <span className="text-muted small fw-semibold text-uppercase">Total Genre</span>
                <h3 className="fw-bold mb-0 text-dark">{genreList.length}</h3>
                <small className="text-success fw-medium">
                  <i className="fa-solid fa-circle-check me-1"></i> Kategori Aktif
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-5">
          <div className="card border-0 shadow-sm rounded-3 bg-white p-3 h-100">
            <div className="d-flex align-items-center">
              <div
                className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center me-3"
                style={{ width: '52px', height: '52px', fontSize: '1.4rem' }}
              >
                <i className="fa-solid fa-user-pen"></i>
              </div>
              <div>
                <span className="text-muted small fw-semibold text-uppercase">Total Author</span>
                <h3 className="fw-bold mb-0 text-dark">{authorList.length}</h3>
                <small className="text-primary fw-medium">
                  <i className="fa-solid fa-circle-check me-1"></i> Penulis Terdaftar
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigasi Tab Admin */}
      <div className="d-flex justify-content-center mb-4">
        <ul className="nav nav-pills bg-light p-1 rounded-pill shadow-sm border">
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link rounded-pill fw-semibold px-4 py-2 ${
                activeTab === 'genre' ? 'active shadow-sm' : 'text-secondary'
              }`}
              onClick={() => setActiveTab('genre')}
            >
              <i className="fa-solid fa-tags me-2"></i>
              Kelola Genre
              <span
                className={`badge ms-2 ${
                  activeTab === 'genre'
                    ? 'bg-white text-primary'
                    : 'bg-primary-subtle text-primary'
                }`}
              >
                {genreList.length}
              </span>
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className={`nav-link rounded-pill fw-semibold px-4 py-2 ${
                activeTab === 'author' ? 'active shadow-sm' : 'text-secondary'
              }`}
              onClick={() => setActiveTab('author')}
            >
              <i className="fa-solid fa-user-pen me-2"></i>
              Kelola Author
              <span
                className={`badge ms-2 ${
                  activeTab === 'author'
                    ? 'bg-white text-primary'
                    : 'bg-success-subtle text-success'
                }`}
              >
                {authorList.length}
              </span>
            </button>
          </li>
        </ul>
      </div>

      {/* Alert Notifikasi Sukses / Error */}
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show shadow-sm mb-4`}
          role="alert"
        >
          <i
            className={`fa-solid ${
              alert.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'
            } me-2`}
          ></i>
          {alert.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert(null)}
          ></button>
        </div>
      )}

      {/* =====================================================================
          TAB 1: KELOLA GENRE
          ===================================================================== */}
      {activeTab === 'genre' && (
        <div>
          {/* Action Bar: Search & Tombol Tambah */}
          <div className="card border-0 shadow-sm rounded-3 bg-white p-3 mb-4">
            <div className="row g-3 align-items-center justify-content-between">
              <div className="col-12 col-md-6 col-lg-5">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0 shadow-none"
                    placeholder="Cari nama genre atau deskripsi..."
                    value={genreSearch}
                    onChange={(e) => setGenreSearch(e.target.value)}
                  />
                  {genreSearch && (
                    <button
                      className="btn btn-outline-secondary border-start-0"
                      type="button"
                      onClick={() => setGenreSearch('')}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              </div>

              <div className="col-12 col-md-auto text-end">
                <button
                  type="button"
                  className={`btn ${
                    showGenreForm ? 'btn-outline-secondary' : 'btn-primary'
                  } rounded-pill px-4 fw-semibold shadow-sm`}
                  onClick={() => setShowGenreForm(!showGenreForm)}
                >
                  <i
                    className={`fa-solid ${
                      showGenreForm ? 'fa-xmark' : 'fa-plus'
                    } me-2`}
                  ></i>
                  {showGenreForm ? 'Tutup Formulir' : 'Tambah Genre'}
                </button>
              </div>
            </div>
          </div>

          {/* FORMULIR CREATE GENRE */}
          {showGenreForm && (
            <div className="card border-0 shadow-sm rounded-3 bg-white mb-4 p-2">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      <i className="fa-solid fa-square-plus text-primary me-2"></i>
                      Formulir Tambah Genre Baru
                    </h5>
                    <small className="text-muted">
                      Masukkan nama dan keterangan kategori buku yang ingin ditambahkan.
                    </small>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowGenreForm(false)}
                  ></button>
                </div>

                <form onSubmit={handleCreateGenre}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold text-dark">
                        Nama Genre <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Contoh: Sains Populer"
                        value={genreForm.name}
                        onChange={handleGenreInputChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold text-dark">
                        Deskripsi Genre
                      </label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        placeholder="Keterangan mengenai jenis atau cakupan buku dalam genre ini..."
                        value={genreForm.description}
                        onChange={handleGenreInputChange}
                      ></textarea>
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-2 pt-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4 rounded-pill fw-semibold"
                        onClick={() => setShowGenreForm(false)}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary px-4 rounded-pill fw-semibold shadow-sm"
                        disabled={savingGenre}
                      >
                        <i className={`fa-solid ${savingGenre ? 'fa-spinner fa-spin' : 'fa-floppy-disk'} me-2`}></i>
                        {savingGenre ? 'Menyimpan...' : 'Simpan Genre'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TABEL READ DATA GENRE */}
          <div className="card border-0 shadow-sm rounded-3 bg-white overflow-hidden">
            <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0 fw-bold text-dark">
                  <i className="fa-solid fa-list-check text-primary me-2"></i>
                  Daftar Genre Buku
                </h5>
                <small className="text-muted">
                  Menampilkan {filteredGenres.length} dari total {genreList.length} genre
                </small>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary text-uppercase small">
                  <tr>
                    <th scope="col" className="ps-4" style={{ width: '80px' }}>
                      #
                    </th>
                    <th scope="col" style={{ minWidth: '220px' }}>
                      Nama Genre
                    </th>
                    <th scope="col" style={{ minWidth: '380px' }}>
                      Deskripsi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGenres.length > 0 ? (
                    filteredGenres.map((genre, idx) => (
                      <tr key={genre.id}>
                        <td className="ps-4">
                          <span className="badge bg-secondary-subtle text-dark font-monospace px-2 py-1">
                            {idx + 1}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                              style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}
                            >
                              <i className="fa-solid fa-tag"></i>
                            </div>
                            <div className="fw-bold text-dark">{genre.name}</div>
                          </div>
                        </td>
                        <td>
                          <p className="text-secondary small mb-0">
                            {genre.description || <em className="text-muted">Tidak ada deskripsi</em>}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-5">
                        <div className="text-muted">
                          <i className="fa-solid fa-folder-open fs-1 text-secondary opacity-50 mb-3 d-block"></i>
                          <h6 className="fw-bold">Tidak ada genre yang cocok</h6>
                          <p className="small mb-2">
                            Pencarian &quot;{genreSearch}&quot; tidak menemukan hasil.
                          </p>
                          {genreSearch && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary rounded-pill px-3"
                              onClick={() => setGenreSearch('')}
                            >
                              Reset Pencarian
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: KELOLA AUTHOR
          ===================================================================== */}
      {activeTab === 'author' && (
        <div>
          {/* Action Bar: Search & Tombol Tambah */}
          <div className="card border-0 shadow-sm rounded-3 bg-white p-3 mb-4">
            <div className="row g-3 align-items-center justify-content-between">
              <div className="col-12 col-md-6 col-lg-5">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0 shadow-none"
                    placeholder="Cari nama penulis atau biografi..."
                    value={authorSearch}
                    onChange={(e) => setAuthorSearch(e.target.value)}
                  />
                  {authorSearch && (
                    <button
                      className="btn btn-outline-secondary border-start-0"
                      type="button"
                      onClick={() => setAuthorSearch('')}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              </div>

              <div className="col-12 col-md-auto text-end">
                <button
                  type="button"
                  className={`btn ${
                    showAuthorForm ? 'btn-outline-secondary' : 'btn-primary'
                  } rounded-pill px-4 fw-semibold shadow-sm`}
                  onClick={() => setShowAuthorForm(!showAuthorForm)}
                >
                  <i
                    className={`fa-solid ${
                      showAuthorForm ? 'fa-xmark' : 'fa-plus'
                    } me-2`}
                  ></i>
                  {showAuthorForm ? 'Tutup Formulir' : 'Tambah Author'}
                </button>
              </div>
            </div>
          </div>

          {/* FORMULIR CREATE AUTHOR */}
          {showAuthorForm && (
            <div className="card border-0 shadow-sm rounded-3 bg-white mb-4 p-2">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
                  <div>
                    <h5 className="mb-1 fw-bold text-dark">
                      <i className="fa-solid fa-user-plus text-primary me-2"></i>
                      Formulir Tambah Author Baru
                    </h5>
                    <small className="text-muted">
                      Lengkapi data nama, foto, dan biografi penulis.
                    </small>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAuthorForm(false)}
                  ></button>
                </div>

                <form onSubmit={handleCreateAuthor}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark">
                        Nama Penulis <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Contoh: Andrea Hirata"
                        value={authorForm.name}
                        onChange={handleAuthorInputChange}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-semibold text-dark">
                        Foto Profil (URL / Nama File)
                      </label>
                      <input
                        type="text"
                        name="photo"
                        className="form-control"
                        placeholder="https://images.unsplash.com/... atau author.jpg"
                        value={authorForm.photo}
                        onChange={handleAuthorInputChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold text-dark">
                        Biografi Penulis
                      </label>
                      <textarea
                        name="bio"
                        className="form-control"
                        rows="3"
                        placeholder="Tuliskan biografi singkat mengenai penulis ini..."
                        value={authorForm.bio}
                        onChange={handleAuthorInputChange}
                      ></textarea>
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-2 pt-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4 rounded-pill fw-semibold"
                        onClick={() => setShowAuthorForm(false)}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary px-4 rounded-pill fw-semibold shadow-sm"
                        disabled={savingAuthor}
                      >
                        <i className={`fa-solid ${savingAuthor ? 'fa-spinner fa-spin' : 'fa-user-check'} me-2`}></i>
                        {savingAuthor ? 'Menyimpan...' : 'Simpan Author'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TABEL READ DATA AUTHOR */}
          <div className="card border-0 shadow-sm rounded-3 bg-white overflow-hidden">
            <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0 fw-bold text-dark">
                  <i className="fa-solid fa-users text-primary me-2"></i>
                  Daftar Penulis (Authors)
                </h5>
                <small className="text-muted">
                  Menampilkan {filteredAuthors.length} dari total {authorList.length} penulis
                </small>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary text-uppercase small">
                  <tr>
                    <th scope="col" className="ps-4" style={{ width: '80px' }}>
                      #
                    </th>
                    <th scope="col" style={{ width: '90px' }}>
                      Foto
                    </th>
                    <th scope="col" style={{ minWidth: '220px' }}>
                      Nama Penulis
                    </th>
                    <th scope="col" style={{ minWidth: '380px' }}>
                      Biografi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAuthors.length > 0 ? (
                    filteredAuthors.map((author, idx) => {
                      const photoUrl = getAuthorPhoto(author.photo, author.id)
                      return (
                        <tr key={author.id}>
                          <td className="ps-4">
                            <span className="badge bg-secondary-subtle text-dark font-monospace px-2 py-1">
                              {idx + 1}
                            </span>
                          </td>
                          <td>
                            <img
                              src={photoUrl}
                              alt={author.name}
                              className="rounded-circle object-fit-cover shadow-sm"
                              style={{
                                width: '46px',
                                height: '46px',
                                border: '2px solid #e2e8f0',
                              }}
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src =
                                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
                              }}
                            />
                          </td>
                          <td>
                            <div className="fw-bold text-dark">{author.name}</div>
                          </td>
                          <td>
                            <p className="text-secondary small mb-0">
                              {author.bio || <em className="text-muted">Tidak ada biografi</em>}
                            </p>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-5">
                        <div className="text-muted">
                          <i className="fa-solid fa-user-xmark fs-1 text-secondary opacity-50 mb-3 d-block"></i>
                          <h6 className="fw-bold">Tidak ada penulis yang cocok</h6>
                          <p className="small mb-2">
                            Pencarian &quot;{authorSearch}&quot; tidak menemukan hasil.
                          </p>
                          {authorSearch && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary rounded-pill px-3"
                              onClick={() => setAuthorSearch('')}
                            >
                              Reset Pencarian
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
