// server.js - Mini Backend Node.js / Express untuk Bookstore
// Menghubungkan langsung ke MySQL XAMPP (db_penjualan_buku)
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Konfigurasi Koneksi Database MySQL XAMPP
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'db_penjualan_buku',
}

// Helper untuk koneksi pool MySQL
let pool
try {
  pool = mysql.createPool(dbConfig)
} catch (err) {
  console.error('Gagal membuat pool database:', err)
}

// ============================================================================
// 1. ENDPOINT GENRE (Read & Create)
// Tabel: genres (id, name, description)
// ============================================================================

// READ: Ambil semua data genre
app.get('/api/genres', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT g.id, g.name, g.description, 
        COUNT(b.id) AS book_count
       FROM genres g
       LEFT JOIN books b ON b.genre_id = g.id
       GROUP BY g.id, g.name, g.description
       ORDER BY g.id DESC`
    )
    res.json(rows)
  } catch (error) {
    console.error('Error GET /api/genres:', error)
    res.status(500).json({ error: 'Gagal mengambil data genre dari database', details: error.message })
  }
})

// CREATE: Tambah data genre baru ke MySQL
app.post('/api/genres', async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Kolom name wajib diisi!' })
    }

    const [result] = await pool.query(
      'INSERT INTO genres (name, description) VALUES (?, ?)',
      [name.trim(), description ? description.trim() : '']
    )

    res.status(201).json({
      message: 'Data genre berhasil disimpan ke database!',
      data: {
        id: result.insertId,
        name: name.trim(),
        description: description ? description.trim() : '',
        book_count: 0
      }
    })
  } catch (error) {
    console.error('Error POST /api/genres:', error)
    res.status(500).json({ error: 'Gagal menyimpan genre ke database', details: error.message })
  }
})

// UPDATE: Perbarui data genre berdasarkan ID
app.put('/api/genres/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Kolom name wajib diisi!' })
    }

    const [existing] = await pool.query('SELECT * FROM genres WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Data genre tidak ditemukan!' })
    }

    const descValue = description !== undefined ? description.trim() : existing[0].description

    await pool.query(
      'UPDATE genres SET name = ?, description = ? WHERE id = ?',
      [name.trim(), descValue, id]
    )

    res.json({
      message: 'Data genre berhasil diperbarui!',
      data: {
        id: Number(id),
        name: name.trim(),
        description: descValue
      }
    })
  } catch (error) {
    console.error('Error PUT /api/genres/:id:', error)
    res.status(500).json({ error: 'Gagal memperbarui genre di database', details: error.message })
  }
})

// DELETE: Hapus data genre berdasarkan ID
app.delete('/api/genres/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [existing] = await pool.query('SELECT * FROM genres WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Data genre tidak ditemukan!' })
    }

    // Pengecekan relasi dengan tabel books
    try {
      const [[{ bookCount }]] = await pool.query(
        'SELECT COUNT(*) AS bookCount FROM books WHERE genre_id = ?',
        [id]
      )
      if (bookCount > 0) {
        return res.status(400).json({
          error: `Tidak dapat menghapus genre "${existing[0].name}" karena masih terkait dengan ${bookCount} buku.`
        })
      }
    } catch {
      // Abaikan jika tabel books atau kolom belum tersedia
    }

    await pool.query('DELETE FROM genres WHERE id = ?', [id])

    res.json({
      message: `Data genre "${existing[0].name}" berhasil dihapus!`,
      id: Number(id)
    })
  } catch (error) {
    console.error('Error DELETE /api/genres/:id:', error)
    if (error.errno === 1451 || error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        error: 'Tidak dapat menghapus genre ini karena masih digunakan oleh data buku terkait.'
      })
    }
    res.status(500).json({ error: 'Gagal menghapus genre dari database', details: error.message })
  }
})

// ============================================================================
// 2. ENDPOINT AUTHOR (Read & Create)
// Tabel: authors (id, name, photo, bio)
// ============================================================================

// READ: Ambil semua data author
app.get('/api/authors', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.id, a.name, a.photo, a.bio,
        COUNT(b.id) AS total_books
       FROM authors a
       LEFT JOIN books b ON b.author_id = a.id
       GROUP BY a.id, a.name, a.photo, a.bio
       ORDER BY a.id DESC`
    )
    res.json(rows)
  } catch (error) {
    console.error('Error GET /api/authors:', error)
    res.status(500).json({ error: 'Gagal mengambil data author dari database', details: error.message })
  }
})

// CREATE: Tambah data author baru ke MySQL
app.post('/api/authors', async (req, res) => {
  try {
    const { name, photo, bio } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Kolom name wajib diisi!' })
    }

    const defaultPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
    const photoValue = photo && photo.trim() ? photo.trim() : defaultPhoto

    const [result] = await pool.query(
      'INSERT INTO authors (name, photo, bio) VALUES (?, ?, ?)',
      [name.trim(), photoValue, bio ? bio.trim() : '']
    )

    res.status(201).json({
      message: 'Data author berhasil disimpan ke database!',
      data: {
        id: result.insertId,
        name: name.trim(),
        photo: photoValue,
        bio: bio ? bio.trim() : '',
        total_books: 0
      }
    })
  } catch (error) {
    console.error('Error POST /api/authors:', error)
    res.status(500).json({ error: 'Gagal menyimpan author ke database', details: error.message })
  }
})

// UPDATE: Perbarui data author berdasarkan ID
app.put('/api/authors/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, photo, bio } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Kolom name wajib diisi!' })
    }

    const [existing] = await pool.query('SELECT * FROM authors WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Data author tidak ditemukan!' })
    }

    const defaultPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
    const photoValue = photo && photo.trim() ? photo.trim() : (existing[0].photo || defaultPhoto)
    const bioValue = bio !== undefined ? bio.trim() : existing[0].bio

    await pool.query(
      'UPDATE authors SET name = ?, photo = ?, bio = ? WHERE id = ?',
      [name.trim(), photoValue, bioValue, id]
    )

    res.json({
      message: 'Data author berhasil diperbarui!',
      data: {
        id: Number(id),
        name: name.trim(),
        photo: photoValue,
        bio: bioValue
      }
    })
  } catch (error) {
    console.error('Error PUT /api/authors/:id:', error)
    res.status(500).json({ error: 'Gagal memperbarui author di database', details: error.message })
  }
})

// DELETE: Hapus data author berdasarkan ID
app.delete('/api/authors/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [existing] = await pool.query('SELECT * FROM authors WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Data author tidak ditemukan!' })
    }

    // Pengecekan relasi dengan tabel books
    try {
      const [[{ bookCount }]] = await pool.query(
        'SELECT COUNT(*) AS bookCount FROM books WHERE author_id = ?',
        [id]
      )
      if (bookCount > 0) {
        return res.status(400).json({
          error: `Tidak dapat menghapus author "${existing[0].name}" karena masih terkait dengan ${bookCount} buku.`
        })
      }
    } catch {
      // Abaikan jika tabel books atau kolom belum tersedia
    }

    await pool.query('DELETE FROM authors WHERE id = ?', [id])

    res.json({
      message: `Data author "${existing[0].name}" berhasil dihapus!`,
      id: Number(id)
    })
  } catch (error) {
    console.error('Error DELETE /api/authors/:id:', error)
    if (error.errno === 1451 || error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        error: 'Tidak dapat menghapus author ini karena masih digunakan oleh data buku terkait.'
      })
    }
    res.status(500).json({ error: 'Gagal menghapus author dari database', details: error.message })
  }
})

// ============================================================================
// 3. ENDPOINT STATISTIK
// ============================================================================
app.get('/api/stats', async (req, res) => {
  try {
    const [[{ total_genres }]] = await pool.query('SELECT COUNT(*) AS total_genres FROM genres')
    const [[{ total_authors }]] = await pool.query('SELECT COUNT(*) AS total_authors FROM authors')
    const [[{ total_books }]] = await pool.query('SELECT COUNT(*) AS total_books FROM books')
    res.json({ total_genres, total_authors, total_books })
  } catch (error) {
    console.error('Error GET /api/stats:', error)
    res.status(500).json({ error: 'Gagal mengambil statistik', details: error.message })
  }
})

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Backend Mini Server berjalan di http://localhost:${PORT}`)
  console.log(`Terhubung ke MySQL database: ${dbConfig.database}`)
})
