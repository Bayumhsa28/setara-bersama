import React from "react";
import styles from "./Legal.module.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function LegalSupport() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      topic: formData.get("topic"),
      description: formData.get("description"),
    };

    const res = await fetch("/api/legal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Permintaan berhasil dikirim!");
    } else {
      alert("Gagal mengirim permintaan.");
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.content}>
        <div className={styles.hero}>
          <h1>Bimbingan Hukum</h1>
          <p>
            Dapatkan bantuan hukum terkait hak-hak gender dan cara melaporkan
            diskriminasi.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.formLabel}>Topik Permasalahan:</label>
            <input
              type="text"
              name="topic"
              required
              className={styles.formInput}
            />

            <label className={styles.formLabel}>Deskripsi:</label>
            <textarea
              name="description"
              required
              className={styles.formTextarea}
            ></textarea>

            <button type="submit" className={styles.formButton}>
              Ajukan Permintaan
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
