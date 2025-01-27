import jwt from "jsonwebtoken";

export default function withAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Tambahkan data user ke request
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}
