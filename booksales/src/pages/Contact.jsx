import { useState } from 'react'

function Contact() {
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Pertanyaan Buku',
    message: '',
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
  )
}

export default Contact
