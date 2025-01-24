import { Client } from 'pg';

// Fungsi untuk menghasilkan kode acak 6 digit
function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, gender, session_type } = req.body;

    const code = generateRandomCode(); // Generate 6 digit random code

    // Membuat koneksi ke PostgreSQL
    const client = new Client({
      user: 'postgres', // Ganti dengan username database PostgreSQL Anda
      host: 'localhost',
      database: 'postgres', // Ganti dengan nama database PostgreSQL Anda
      password: '', // Ganti dengan password database PostgreSQL Anda
      port: 5432,
    });

    try {
      // Menyambungkan ke database
      await client.connect();

      // Menyisipkan data ke tabel account_conseling dengan expiration_date
      const query = `
        INSERT INTO account_conseling (name, email, gender, session_type, code, expiration_date)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP + INTERVAL '5 minutes')
        RETURNING *;
      `;
      const values = [name, email, gender, session_type, code];
      
      // Menjalankan query
      const result = await client.query(query, values);

      // Menutup koneksi
      await client.end();

      // Mengirimkan respons sukses
      res.status(200).json({ message: "Data berhasil dikirim!", code: result.rows[0].code });
    } catch (error) {
      console.error("Error saving to database:", error);
      res.status(500).json({ message: "Gagal menyimpan data ke database." });
    }
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
