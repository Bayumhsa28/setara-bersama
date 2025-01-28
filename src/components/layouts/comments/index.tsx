import React, { useState, useEffect } from "react";
import styles from "./CommentPopup.module.css";
import deleteButton from "../../../../public/images/deleteButton.png";
import Image from "next/image";
import Cookies from "js-cookie";

interface CommentPopupProps {
  closePopup: () => void;
  storyId: number;
  onSubmitComment: (comment: string) => void;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ closePopup, storyId, onSubmitComment }) => {
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const name = Cookies.get("user_name");
    const userRole = Cookies.get("user_role");
    const userEmail = Cookies.get("user_email");
    setUserName(name);
    setRole(userRole);
    setEmail(userEmail);

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?account_story_id=${storyId}`);
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
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
          account_story_id: storyId,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim komentar.");
      }

      const result = await response.json();
      alert("Komentar berhasil dikirim!");
      setComment("");
      onSubmitComment(comment);
      setComments((prevComments) => [result, ...prevComments]);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mengirim komentar.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await fetch("/api/commentsDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId,
          email,
          role,
          name: userName,
          account_story_id: storyId,
        }),
      });
  
      if (response.ok) {
        // Memperbarui state untuk menghapus komentar yang dihapus dari UI
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        alert("Komentar berhasil dihapus.");
      } else {
        const data = await response.json();
        console.error("Gagal menghapus komentar:", data);
        alert(data.error || "Gagal menghapus komentar.");
      }
    } catch (error: any) {
      console.error("Error deleting comment:", error.message);
      alert(error.message || "Terjadi kesalahan saat menghapus komentar.");
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

        <div className={styles.commentsList}>
          {comments.map((commentData) => (
            <div key={commentData.id} className={styles.comment}>
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
              <div>
                <Image
                  src={deleteButton}
                  alt="Delete Button"
                  className="deleteButton"
                  onClick={() => handleDeleteComment(commentData.id)}
                  style={{ width: "30px", height: "30px", marginLeft: "5px" }}
                />
              </div>
            </div>
          ))}
        </div>

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
