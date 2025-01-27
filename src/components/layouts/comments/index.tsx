import React, { useState, useEffect } from "react";
import styles from "./CommentPopup.module.css";
import Cookies from "js-cookie";

interface CommentPopupProps {
  closePopup: () => void;
  storyId: number; // ID cerita yang terkait
  onSubmitComment: (comment: string) => void; // Fungsi untuk mengirim komentar ke parent
}

const CommentPopup: React.FC<CommentPopupProps> = ({ closePopup, storyId, onSubmitComment }) => {
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]); // State untuk menyimpan komentar yang diambil dari backend

  useEffect(() => {
    // Ambil informasi pengguna dari cookies
    const name = Cookies.get("user_name");
    const userRole = Cookies.get("user_role");
    const userEmail = Cookies.get("user_email");
    setUserName(name);
    setRole(userRole);
    setEmail(userEmail);

    // Fetch data komentar dari backend
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?account_story_id=${storyId}`);
        const data = await response.json();
        setComments(data.comments); // Menyimpan komentar yang diambil
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments(); // Memanggil fungsi untuk mengambil komentar
  }, [storyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Komentar tidak boleh kosong.");
      return;
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: userName,
          role,
          email,
          text: comment,
          account_story_id: storyId, // Menggunakan storyId yang diterima dari prop
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim komentar.");
      }

      const result = await response.json();
      console.log("Komentar berhasil dikirim:", result);
      alert("Komentar berhasil dikirim!");
      setComment(""); // Reset komentar
      onSubmitComment(comment); // Kirim komentar ke parent
      setComments((prevComments) => [result, ...prevComments]); // Tambahkan komentar yang baru dikirim ke daftar komentar
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim komentar.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={closePopup}>
          &times;
        </button>
        <div className={styles.header}>
          <img src="/images/profile.png" alt="Profile" className={styles.profileImage} />
          <h3 className={styles.headerTitle}>{userName}</h3>
        </div>

        {/* Tampilkan komentar yang ada di database */}
        <div className={styles.commentsList}>
          {comments.map((commentData, index) => (
            <div key={index} className={styles.comment}>
              <div className={styles.left}>
                <img src="/images/profile.png" alt="Profile" className={styles.profileImage} />
                <div>
                  <div className={styles.userName}>{commentData.nama}</div>
                  <p>{commentData.text}</p>
                </div>
              </div>
              <div className={styles.right}>
                <span>{commentData.created_at}</span>
              </div>
            </div>
          ))}
        </div>


        {/* Form untuk mengirim komentar */}
        <form onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            placeholder="Tulis komentar Anda di sini..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentPopup;
