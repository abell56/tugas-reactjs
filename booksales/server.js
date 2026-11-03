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
