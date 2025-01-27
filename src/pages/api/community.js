export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, interest } = req.body;

    // Proses data formulir
    console.log("Community Data:", { username, interest });

    res.status(200).json({ message: "Pendaftaran komunitas berhasil!" });
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
