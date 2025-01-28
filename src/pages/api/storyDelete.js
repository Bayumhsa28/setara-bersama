import { Pool } from 'pg';

// API untuk menangani delete story
export const config = {
  api: {
    bodyParser: true, // Aktifkan body parser untuk menerima JSON body
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'DELETE') {
    // Ambil storyId dari body request
    const { storyId } = req.body;
    const { email } = req.body;
    const { role } = req.body;
    const { name } = req.body;

    if (!storyId) {
      return res.status(400).json({ error: 'ID story tidak diberikan' });
    }

    else if (!email) {
      return res.status(400).json({ error: 'Email story tidak diberikan' });
    }
    else if (!role) {
      return res.status(400).json({ error: 'role story tidak diberikan' });
    }
    else if (!name) {
      return res.status(400).json({ error: 'name story tidak diberikan' });
    }

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

      // Delete the story from the database
      const deleteQuery = 'DELETE FROM account_story WHERE id = $1 AND email = $2 AND role = $3 AND name = $4';
      const result = await client.query(deleteQuery, [storyId, email, role, name]);

      if (result.rowCount === 0) {
        client.release();
        return res.status(404).json({ error: 'anda tidak berhak menghapus ini bukan status yang anda miliki' });
      }

      client.release(); // Release connection

      res.status(200).json({ message: 'Story berhasil dihapus!' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Gagal menghapus story dari database.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
