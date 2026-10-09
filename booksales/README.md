# Bookstore Web Application

Aplikasi web toko buku modern berbasis **React** dan **Bootstrap 5**. Aplikasi ini dilengkapi dengan tampilan navigasi yang rapi, katalog buku terlaris, halaman tim, dan formulir kontak interaktif.

---

## Fitur Utama

1. **Header & Navigasi**:
   - Logo bookstore dengan ikon Font Awesome.
   - Menu navigasi multi-halaman interaktif (*Home, Book, Team, Contact*).
   - Tombol autentikasi (*Login* & *Register*).

2. **Halaman Home (Beranda)**:
   - **Hero Section**: Promosi buku unggulan bulanan (*Atomic Habits*) lengkap dengan tombol aksi dan informasi garansi/ongkir.
   - **Best Selling Books**: Album berisi kartu buku terlaris nyata dengan sampul estetik, rating bintang, harga, tahun terbit, sinopsis singkat, dan tombol beli.

3. **Halaman Book (Katalog Buku Lengkap)**:
   - Pencarian buku secara *real-time* berdasarkan judul, penulis, atau tahun.
   - Filter buku berdasarkan kategori (*Semua, Pemrograman, Self-Help, Keuangan, Sastra, Filsafat, Teknologi*).
   - Fitur penambahan data buku menggunakan React Hooks (`useState`).

4. **Halaman Team (Tim Kami)**:
   - Profil tim Bookstore lengkap dengan foto, nama, jabatan, biografi singkat, dan tautan media sosial.
   - 3 Pilar nilai utama layanan Bookstore (*Kurasi Pilihan, 100% Asli & Bergaransi, Layanan Ramah*).

5. **Halaman Contact (Hubungi Kami)**:
   - Informasi kontak lengkap (alamat toko, email, WhatsApp/telepon CS, dan jam operasional).
   - Formulir pesan interaktif dengan notifikasi sukses saat pesan berhasil dikirim.

6. **Footer**:
   - Navigasi cepat, informasi hak cipta, dan tautan kebijakan privasi.

---

## Teknologi yang Digunakan

- **[React](https://react.dev/)** (v19) - Library UI
- **[React Router](https://reactrouter.com/)** - Client-side declarative routing (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `NavLink`, `Link`)
- **[Vite](https://vitejs.dev/)** - Build tool & dev server yang cepat
- **[Bootstrap 5](https://getbootstrap.com/)** - Framework CSS untuk komponen dan grid layout responsif
- **[Font Awesome](https://fontawesome.com/)** (v6.5.2) - Icon library (buku, media sosial, rating, dsb.)
- **CSS3** - Animasi hover kartu buku, custom active pill navigation, zoom gambar halus, dan avatar tim

---

## Prasyarat Sistem

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:
- **[Node.js](https://nodejs.org/)** (versi 18 ke atas disarankan)
- **npm** (biasanya terinstal bersama Node.js)

---

## Cara Menjalankan Proyek

Ikuti langkah-langkah berikut di terminal (Command Prompt, PowerShell, atau Git Bash):

### 1. Masuk ke Direktori Proyek
Buka terminal dan arahkan ke folder proyek `booksales`:
```bash
cd booksales
```

### 2. Instalasi Dependensi
Jalankan perintah berikut untuk menginstal semua paket yang dibutuhkan:
```bash
npm install
```

### 3. Menjalankan Server Development
Mulai server lokal:
```bash
npm run dev
```

Setelah perintah dijalankan, terminal akan menampilkan tautan lokal, biasanya:
```
  VITE v8.x.x  ready in xxx ms

  Local:   http://localhost:5173/
  Network: use --host to expose
```

### 4. Buka di Browser
Buka browser (Google Chrome, Microsoft Edge, Firefox, dll.) lalu akses alamat:
**[http://localhost:5173](http://localhost:5173)**

---

## Perintah Lain yang Tersedia

- **Build untuk Produksi**:
  ```bash
  npm run build
  ```
  Menghasilkan file siap rilis di dalam folder `dist/`.

- **Pratinjau Hasil Build**:
  ```bash
  npm run preview
  ```

- **Pemeriksaan Linter (ESLint)**:
  ```bash
  npm run lint
  ```

---

## Struktur Folder Proyek

```text
booksales/
├── index.html          # HTML utama, memuat title & CDN Font Awesome
├── package.json        # Dependensi (React, React Router, Bootstrap) dan script
├── src/
│   ├── components/     # Komponen UI bersama
│   │   ├── Navbar.jsx  # Header navigasi modern dengan NavLink & styling aktif
│   │   └── Footer.jsx  # Footer tautan navigasi
│   ├── layouts/        # Layout berbasis React Router
│   │   └── RootLayout.jsx # Layout induk dengan Navbar, <Outlet />, dan Footer
│   ├── pages/          # Halaman-halaman rute aplikasi
│   │   ├── Home.jsx    # Halaman Beranda (Hero & Best Seller)
│   │   ├── Book.jsx    # Halaman Katalog Buku (Search, Filter, & Tambah Buku)
│   │   ├── Team.jsx    # Halaman Tim Kami & Pilar Layanan
│   │   ├── Contact.jsx # Halaman Kontak & Form Kirim Pesan
│   │   └── NotFound.jsx# Halaman 404 Not Found
│   ├── Utils/          # Folder utilitas data buku
│   │   └── books.js    # Data buku sesuai modul praktikum
│   ├── data/           # Dataset statis pendukung
│   │   ├── books.js    # Re-export data buku
│   │   └── team.js     # Data anggota tim
│   ├── App.jsx         # Konfigurasi declarative routing (BrowserRouter, Routes, Route)
│   │   ├── App.css     # Styling kustom & efek modern navigasi
│   │   ├── main.jsx    # Entry point React & import Bootstrap CSS
│   │   └── assets/     # Aset statis gambar/ikon
└── README.md           # Dokumentasi cara penggunaan
```

---

## Catatan Tambahan (Tips Windows)

Jika Anda menggunakan Windows PowerShell dan mengalami pesan error seperti:
> *"File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system"*

Anda dapat mengatasinya dengan salah satu cara berikut:
1. **Gunakan Command Prompt (cmd)** alih-alih PowerShell.
2. Atau jalankan PowerShell sebagai Administrator dan ketik:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```
   kemudian jalankan kembali `npm run dev`.

---

(c) 2026 **bookstore** - NF Academy
