import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nama, email, gender, password } = req.body;

    if (!nama || !email || !gender || !password) {
      return res.status(400).json({ message: "Semua field harus diisi." });
    }

    if (!["f", "m"].includes(gender)) {
      return res.status(400).json({ message: "Gender harus 'f' atau 'm'." });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan data ke database dengan nilai role = 1
      const newUser = await prisma.account.create({
        data: {
          nama,
          email,
          gender,
          password: hashedPassword,
          role: 1, // Default role = 1
        },
        select: {
          email: true,
        },
      });

      res.status(201).json({ message: "Registrasi berhasil", email: newUser.email });
    } catch (error) {
      if (error.code === "P2002") { // Error kode untuk unique constraint Prisma
        return res.status(400).json({ message: "Email sudah terdaftar." });
      }
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
