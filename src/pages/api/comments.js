import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 5432,
});

client.connect();

const handler = async (req, res) => {
  const { account_story_id } = req.query;

  // Handle GET request to fetch comments
  if (req.method === "GET") {
    try {
      const query = `
        SELECT nama, role, email, text, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at
        FROM account_comments
        WHERE account_story_id = $1
        ORDER BY created_at ASC;
      `;
      const result = await client.query(query, [account_story_id]);
      res.status(200).json({ comments: result.rows });
    } catch (error) {
      console.error("Error during GET:", error);
      res.status(500).json({ message: "Gagal mengambil komentar." });
    }
  }
  // Handle POST request to add a new comment
  else if (req.method === "POST") {
    const { nama, role, email, text, account_story_id } = req.body;

    // Validation check to ensure all required data is present
    if (!nama || !role || !email || !text || !account_story_id) {
      return res.status(400).json({ message: "Data tidak lengkap." });
    }

    try {
      const query = `
        INSERT INTO account_comments (nama, role, email, text, account_story_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING nama, role, email, text, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at;
      `;
      const values = [nama, role, email, text, account_story_id];

      const result = await client.query(query, values);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error during POST:", error);
      res.status(500).json({ message: "Gagal menambahkan komentar." });
    }
  }
  // Method not allowed
  else {
    res.status(405).json({ message: "Metode tidak diizinkan." });
  }
};

export default handler;
