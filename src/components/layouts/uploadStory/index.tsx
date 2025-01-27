import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./Upload.module.css";

export default function UploadStory({ closePopup }: { closePopup: () => void }) {
  const router = useRouter();
  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");

  const [story, setStory] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || role !== "1") {
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("email", email || "");
    formData.append("role", role || "");
    formData.append("story", story);

    photos.forEach((photo) => {
      formData.append("photos", photo); // Send multiple photos as 'photos'
    });

    try {
      setUploading(true);
      const response = await fetch("/api/story", {
        method: "POST",
        body: formData,
      });

      const responseBody = await response.text(); // Get raw response text
      console.log("Response from API:", responseBody);

      if (response.ok) {
        try {
          const jsonResponse = JSON.parse(responseBody); // Attempt to parse JSON
          console.log("Parsed JSON:", jsonResponse);
          alert("Story berhasil diupload!");
          setStory("");
          setPhotos([]); // Reset photos after upload
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Gagal mengupload story.");
        }
      } else {
        console.error("Failed response:", responseBody);
        alert("Gagal mengupload story.");
      }
    } catch (error) {
      console.error("Error uploading story:", error);
      alert("Gagal mengupload story.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <main className={styles.mainContent}>
            <div className={styles.header}>
              <h1>Bagikan Cerita Anda</h1>
              <p>Berikan inspirasi dengan cerita dan foto Anda!</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                placeholder="Tuliskan cerita Anda..."
                value={story}
                onChange={handleStoryChange}
                required
                className={styles.textarea}
              />
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className={styles.fileInput}
                />
                {photos.length > 0 && (
                  <div>
                    {photos.map((photo, index) => (
                      <span key={index}>{photo.name}</span>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" disabled={uploading} className={styles.button}>
                {uploading ? "Mengupload..." : "Upload Story"}
              </button>
            </form>
          </main>

          <button onClick={closePopup} className={styles.closeButton}>X</button>
        </div>
      </div>
    </div>
  );
}
