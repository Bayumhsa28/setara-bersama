import { Client } from 'pg';

// Fungsi untuk menghasilkan kode acak 6 digit
function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Fungsi untuk menangani sesi berbayar dan gratis
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, role, session_type } = req.body;
    const code = generateRandomCode(); // Generate 6 digit random code

    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: '',
      port: 5432,
    });

    try {
      await client.connect();

      // const checkExistingRoomQuery = `SELECT * FROM account_conseling WHERE email = $1 AND session_type = $2`;
      // const existingRoomResult = await client.query(checkExistingRoomQuery, [email, session_type]);

      // if (existingRoomResult.rows.length > 0) {
      //   res.status(400).json({ message: "Sesi sudah terdaftar." });
      //   return;
      // }

      const roomQuery = `SELECT MAX(room_number) FROM account_conseling`;
      const roomResult = await client.query(roomQuery);
      const newRoomNumber = roomResult.rows[0].max + 1 || 1;

      const query = `
        INSERT INTO account_conseling (name, email, role, session_type, code, room_number, expiration_date)
        VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP + INTERVAL '5 minutes')
        RETURNING *;
      `;
      const values = [name, email, role, session_type, code, newRoomNumber];

      const result = await client.query(query, values);

      await client.end();

      res.status(200).json({
        message: "Data berhasil dikirim!",
        code: result.rows[0].code,
        room_number: result.rows[0].room_number,
      });
    } catch (error) {
      console.error("Error saving to database:", error);
      res.status(500).json({ message: "Gagal menyimpan data ke database." });
    }
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}

// Endpoint untuk menangani pembayaran dan menyimpan data
export async function paymentHandler(req, res) {
  if (req.method === "POST") {
    const { name, email, role, session_type } = req.body;

    const code = generateRandomCode(); // Generate 6 digit random code

    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: '',
      port: 5432,
    });

    try {
      await client.connect();

      const checkExistingRoomQuery = `SELECT * FROM account_conseling WHERE email = $1 AND session_type = $2`;
      const existingRoomResult = await client.query(checkExistingRoomQuery, [email, session_type]);

      if (existingRoomResult.rows.length > 0) {
        res.status(400).json({ message: "Sesi sudah terdaftar." });
        return;
      }

      const roomQuery = `SELECT MAX(room_number) FROM account_conseling`;
      const roomResult = await client.query(roomQuery);
      const newRoomNumber = roomResult.rows[0].max + 1 || 1;

      const query = `
        INSERT INTO account_conseling (name, email, role, session_type, code, room_number, expiration_date)
        VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP + INTERVAL '5 minutes')
        RETURNING *;
      `;
      const values = [name, email, role, session_type, code, newRoomNumber];

      const result = await client.query(query, values);

      await client.end();

      res.status(200).json({
        message: "Data berhasil disimpan!",
        code: result.rows[0].code,
        room_number: result.rows[0].room_number,
      });
    } catch (error) {
      console.error("Error saving to database:", error);
      res.status(500).json({ message: "Gagal menyimpan data ke database." });
    }
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}