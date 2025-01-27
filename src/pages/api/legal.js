export default function handler(req, res) {
  if (req.method === "POST") {
    const { topic, description } = req.body;

    // Proses data formulir
    console.log("Legal Data:", { topic, description });

    res
      .status(200)
      .json({ message: "Permintaan bimbingan hukum berhasil dikirim!" });
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
