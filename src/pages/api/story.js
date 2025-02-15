import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Konfigurasi penyimpanan file menggunakan multer
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false, // Nonaktifkan body parser bawaan Next.js
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === "POST") {
    upload.array("photos")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed" });
      }

      const { name, email, role, story } = req.body;

      // Ambil path foto yang diunggah
      const photoPaths = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

      try {
        // Simpan story ke database menggunakan Prisma
        const newStory = await prisma.story.create({
          data: {
            name,
            email,
            role: parseInt(role),
            story,
            photos: photoPaths,
          },
        });

        res.status(200).json({ message: "Story berhasil diupload!", story: newStory });
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Gagal menyimpan story ke database." });
      }
    });
  } else if (req.method === "GET") {
    try {
      // Ambil semua story dari database
      const stories = await prisma.story.findMany({
        orderBy: { created_at: "desc" },
      });

      res.status(200).json(stories);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Gagal mengambil data story." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
