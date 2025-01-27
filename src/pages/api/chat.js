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
  const { room_number } = req.query;

  // Handle GET request to fetch chats
  if (req.method === "GET") {
    try {
      const query = `
        SELECT name, email, role, message, TO_CHAR(time, 'HH24:MI') AS time
        FROM account_chat
        WHERE room_number = $1
        ORDER BY time ASC;
      `;
      const result = await client.query(query, [room_number]);
      res.status(200).json({ chats: result.rows });
    } catch (error) {
      console.error("Error during GET:", error);
      res.status(500).json({ message: "Gagal mengambil chat." });
    }
  }
  // Handle POST request to send a new message
  else if (req.method === "POST") {
    const { name, email, role, message, room_number } = req.body;

    // Validation check to ensure all required data is present
    if (!name || !email || !role || !message || !room_number) {
      return res.status(400).json({ message: "Data tidak lengkap." });
    }

    console.log("Request Body:", req.body); // Debug log

    try {
      const query = `
        INSERT INTO account_chat (name, email, role, message, room_number)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING name, email, role, message, TO_CHAR(time, 'HH24:MI') AS time;
      `;
      const values = [name, email, role, message, room_number];

      console.log("Query Values:", values); // Debug log

      const result = await client.query(query, values);

      console.log("Query Result:", result.rows[0]); // Debug log

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error during POST:", error); // Error log
      res.status(500).json({ message: "Gagal mengirim pesan." });
    }
  }
  // Method not allowed
  else {
    res.status(405).json({ message: "Metode tidak diizinkan." });
  }
};

export default handler;
