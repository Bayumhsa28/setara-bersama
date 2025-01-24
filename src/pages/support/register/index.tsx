import React, { useState } from "react";
import styles from "./Conseling.module.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function Counseling() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      session_type: formData.get("session_type"),
    };

    const res = await fetch("/api/counseling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      setSuccessMessage(`Permintaan berhasil dikirim! Kode Anda: ${result.code}`);
      
      // Close pop-up after 5 seconds
      setTimeout(() => setSuccessMessage(null), 15000);
    } else {
      alert("Gagal mengirim permintaan.");
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>
        <div className={styles.hero}>
          <header className={styles.header}>
            <h1>Konseling Psikologis</h1>
            <p>Akses ke konselor profesional untuk sesi online gratis atau berbiaya rendah.</p>
          </header>
          <section className={styles.section}>
            <form onSubmit={handleSubmit} method="POST">
              <label className={styles.formLabel}>Nama:</label>
              <input type="text" name="name" required className={styles.formInput} />
              
              <label className={styles.formLabel}>Email:</label>
              <input type="email" name="email" required className={styles.formInput} />
              
              <label className={styles.formLabel}>Gender:</label>
              <select name="gender" className={styles.formInput}>
                <option value="" selected disabled>Pilih Gender</option>
                <option value="male">Pria</option>
                <option value="female">Wanita</option>
              </select>
              
              <label className={styles.formLabel}>Jenis Sesi:</label>
              <select name="session_type" className={styles.formInput}>
                <option value="free">Gratis</option>
                <option value="low-cost">Berbiaya Rendah</option>
              </select>
              
              <button type="submit" className={styles.formButton}>Daftar Konseling</button>
            </form>
          </section>
        </div>

        {/* Tampilkan pop-up jika berhasil */}
        {successMessage && (
  <div className={styles.successPopup}>
    <p>{successMessage}</p>
    
  </div>
)}

      </main>
      <Footer />
    </div>
  );
}
