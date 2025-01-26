import { getAllRooms } from "../../../backend/controllers/adminController";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const rooms = await getAllRooms();
      res.status(200).json({ rooms });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ message: "Gagal mengambil daftar room." });
    }
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan." });
  }
};

export default handler;
