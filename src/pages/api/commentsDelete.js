import { Pool } from "pg";

export const config = {
  api: {
    bodyParser: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "DELETE") {
    const { commentId, email, role, name, account_story_id } = req.body;

    // Validasi parameter
    if (!commentId || !email || !role || !name || !account_story_id) {
      return res.status(400).json({ error: "Semua parameter harus disediakan." });
    }

    // Konfigurasi koneksi PostgreSQL
    const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "",
      port: 5432,
    });

    try {
      const client = await pool.connect();

      // Validasi kepemilikan komentar
      const validationQuery = `
        SELECT id 
        FROM account_comments 
        WHERE id = $1 AND email = $2 AND role = $3 AND nama = $4 AND account_story_id = $5
      `;
      const validationResult = await client.query(validationQuery, [
        commentId,
        email,
        role,
        name,
        account_story_id,
      ]);

      if (validationResult.rowCount === 0) {
        client.release();
        return res.status(404).json({
          error: "Anda tidak berhak menghapus komentar ini.",
        });
      }

      // Hapus komentar
      const deleteQuery = `
        DELETE FROM account_comments 
        WHERE id = $1 AND email = $2 AND role = $3 AND nama = $4 AND account_story_id = $5
      `;
      const deleteResult = await client.query(deleteQuery, [
        commentId,
        email,
        role,
        name,
        account_story_id,
      ]);

      client.release();

      if (deleteResult.rowCount === 0) {
        return res
          .status(500)
          .json({ error: "Gagal menghapus komentar dari database." });
      }

      res.status(200).json({ message: "Komentar berhasil dihapus!" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Gagal menghapus komentar dari database." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
