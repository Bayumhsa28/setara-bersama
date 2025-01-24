import bcrypt from 'bcryptjs'; // Ganti bcrypt dengan bcryptjs
import { Pool } from 'pg';

// Konfigurasi koneksi ke database PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nama, email, gender, password } = req.body;

    if (!nama || !email || !gender || !password) {
      return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan data ke database dengan nilai role = 1
      const result = await pool.query(
        'INSERT INTO account (email, nama, gender, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING email',
        [email, nama, gender, hashedPassword, 1] // Role = 1
      );

      res.status(201).json({ message: 'Registrasi berhasil', email: result.rows[0].email });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'Email sudah terdaftar.' });
      }
      res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
