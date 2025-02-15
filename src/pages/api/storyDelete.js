import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: true, // Aktifkan body parser untuk menerima JSON body
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "DELETE") {
    const { storyId, email, role, name } = req.body;

    if (!storyId) {
      return res.status(400).json({ error: "ID story tidak diberikan" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email story tidak diberikan" });
    }
    if (!role) {
      return res.status(400).json({ error: "Role story tidak diberikan" });
    }
    if (!name) {
      return res.status(400).json({ error: "Name story tidak diberikan" });
    }

    try {
      // Hapus story berdasarkan id, email, role, dan name
      const deletedStory = await prisma.story.deleteMany({
        where: {
          id: parseInt(storyId),
          email: email,
          role: parseInt(role),
          name: name,
        },
      });

      if (deletedStory.count === 0) {
        return res.status(404).json({
          error: "Anda tidak berhak menghapus ini, bukan status yang anda miliki",
        });
      }

      res.status(200).json({ message: "Story berhasil dihapus!" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Gagal menghapus story dari database." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
