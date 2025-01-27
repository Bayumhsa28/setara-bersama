import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Pool } from 'pg';

// Konfigurasi penyimpanan file menggunakan multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
});

// API untuk menangani upload story
export const config = {
  api: {
    bodyParser: false, // Nonaktifkan body parser bawaan Next.js
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'POST') {
    // Handle file upload using multer
    upload.array('photos')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'File upload failed' });
      }

      const { name, email, role, story } = req.body;
      console.log('Received data:', { name, email, role, story });

      // Log files received
      if (req.files) {
        console.log('Files received:', req.files);
      } else {
        console.log('No files received.');
      }

      // Paths for photos
      const photoPaths = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

      // Konfigurasi koneksi PostgreSQL
      const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '',
        port: 5432,
      });

      try {
        const client = await pool.connect();
        const query =
          'INSERT INTO account_story (name, email, role, story, photos) VALUES ($1, $2, $3, $4, $5)';
        await client.query(query, [name, email, role, story, photoPaths]);
        client.release(); // Release connection

        res.status(200).json({ message: 'Story berhasil diupload!' });
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Gagal menyimpan story ke database.' });
      }
    });
  } else if (req.method === 'GET') {
    // Handle GET request to fetch stories
    try {
      const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '',
        port: 5432,
      });

      const client = await pool.connect();
      const result = await client.query(
        'SELECT * FROM account_story ORDER BY upload_date DESC'
      );
      client.release(); // Mengembalikan koneksi ke pool

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Gagal mengambil story.' });
    }
  } else {
    // Return 405 for other HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
