import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Book from './pages/Book'
import Team from './pages/Team'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/**
 * Konfigurasi Routing Declarative sesuai panduan React Router:
 * https://reactrouter.com/start/declarative/routing
 *
 * Struktur:
 * - BrowserRouter: Wrapper penyedia context routing
 * - Routes & Route: Mendefinisikan mapping URL ke komponen UI
 * - Layout Route ("/" dengan RootLayout): Memuat Header Navbar, Outlet (konten halaman), dan Footer
 * - Index Route: Halaman utama ("/") -> Home
 * - Nested Routes:
 *   - "book" -> Book (Katalog Buku)
 *   - "team" -> Team (Profil Tim & Pilar Nilai)
 *   - "contact" -> Contact (Formulir & Info Kontak)
 * - Catch-all Route ("*") -> NotFound (404)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="book" element={<Book />} />
          <Route path="books" element={<Navigate to="/book" replace />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
