import { Client } from "pg";

const getRoomsHandler = async (req, res) => {
  if (req.method === "GET") {
    const { role } = req.query; // Only 'role' is needed

    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "",
      port: 5432,
    });

    try {
      await client.connect();

      // Ambil semua room tanpa filter berdasarkan email atau role
      const query = `
        SELECT room_number, session_type
        FROM account_conseling
      `;

      const result = await client.query(query); // Fetch all rooms without filtering

      const rooms = result.rows.map((room) => ({
        room_number: room.room_number,
        name: `Room ${room.room_number} ${room.session_type === "free" ? "Free" : "Premium"}`,
      }));

      await client.end();

      res.status(200).json({ rooms });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ message: "Gagal mengambil data room." });
    }
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan" });
  }
};

// Ekspor default handler
export default getRoomsHandler;
