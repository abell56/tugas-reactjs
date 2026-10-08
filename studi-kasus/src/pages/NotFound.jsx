import { Link } from 'react-router'

function NotFound() {
  return (
    <div className="container my-5 py-5 text-center">
      <div className="py-5">
        <i className="fa-solid fa-triangle-exclamation fa-4x text-warning mb-4"></i>
        <h1 className="display-4 fw-bold text-dark mb-3">404 - Halaman Tidak Ditemukan</h1>
        <p className="lead text-secondary mb-4 col-md-6 mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau alamat URL yang Anda masukkan salah.
        </p>
        <Link to="/" className="btn btn-primary btn-lg px-4 rounded-pill shadow-sm">
          <i className="fa-solid fa-house me-2"></i>Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}

export default NotFound
