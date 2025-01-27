import bcrypt from "bcryptjs";

async function hashPassword() {
  const password = "adminPassword"; // Ganti dengan password yang diinginkan
  const hashedPassword = await bcrypt.hash(password, 10); // Hasil hash
  console.log(hashedPassword); // Menampilkan hasil hash
}

hashPassword();
