import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { commentId, email, role, name, account_story_id } = req.body;

  // Validasi input
  if (!commentId || !email || !role || !name || !account_story_id) {
    return res.status(400).json({ error: "Semua parameter harus disediakan." });
  }

  try {
    // Hapus komentar hanya jika pengguna memiliki hak akses
    const deleteComment = await prisma.accountComment.deleteMany({
      where: {
        id: parseInt(commentId),
        email: email,
        role: role,
        nama: name,
        account_story_id: parseInt(account_story_id),
      },
    });

    // Jika tidak ada komentar yang dihapus, berarti user tidak berhak menghapusnya
    if (deleteComment.count === 0) {
      return res.status(404).json({ error: "Anda tidak berhak menghapus komentar ini." });
    }

    res.status(200).json({ message: "Komentar berhasil dihapus!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Gagal menghapus komentar dari database." });
  }
};
