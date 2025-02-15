import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { account_story_id } = req.query;

  if (req.method === "GET") {
    try {
      const comments = await prisma.accountComment.findMany({
        where: { account_story_id: parseInt(account_story_id) },
        orderBy: { created_at: "asc" },
        select: {
          id: true,
          nama: true,
          role: true,
          email: true,
          text: true,
          created_at: true,
        },
      });

      res.status(200).json({ comments });
    } catch (error) {
      console.error("Error during GET:", error);
      res.status(500).json({ message: "Gagal mengambil komentar." });
    }
  }

  else if (req.method === "POST") {
    const { nama, role, email, text, account_story_id } = req.body;

    if (!nama || !role || !email || !text || !account_story_id) {
      return res.status(400).json({ message: "Data tidak lengkap." });
    }

    try {
      const newComment = await prisma.accountComment.create({
        data: {
          nama,
          role, // role tetap string sesuai tabel
          email,
          text,
          account_story_id: parseInt(account_story_id),
        },
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error during POST:", error);
      res.status(500).json({ message: "Gagal menambahkan komentar." });
    }
  }

  else {
    res.status(405).json({ message: "Metode tidak diizinkan." });
  }
};

export default handler;
