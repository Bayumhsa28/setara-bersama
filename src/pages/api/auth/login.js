import bcrypt from "bcryptjs"; // Ganti bcrypt dengan bcryptjs
import jwt from "jsonwebtoken";
import { Pool } from "pg";

// Konfigurasi koneksi ke database PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "", // Isi dengan password database
  port: 5432,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi." });
  }

  try {
    // Cek apakah email ada di database
    const result = await pool.query("SELECT * FROM account WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Buat JWT token
    const token = jwt.sign(
      { email: user.email, name: user.nama, role: user.role },
      process.env.JWT_SECRET || "your-secret-key", // Pastikan untuk menggunakan key yang aman
      { expiresIn: "1h" },
    );

    // Kirim response dengan token dan data user
    res
      .status(200)
      .json({
        token,
        user: { email: user.email, name: user.nama, role: user.role },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}
