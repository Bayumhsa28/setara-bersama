import React, { useState, useEffect } from "react";
import styles from "./Conseling.module.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Counseling() {
  const [roomNumber, setRoomNumber] = useState<number | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<string | null>(null);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showCodePopup2, setShowCodePopup2] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");

  useEffect(() => {
    if (!name || !email || role !== "1") {
      router.push("/");
    }
  }, [name, email, role, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const sessionType = formData.get("session_type") as string;

    const data = {
      name,
      email,
      role,
      session_type: sessionType,
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
      setRoomNumber(result.room_number);
      setCode(result.code);

      if (sessionType === "low-cost") {
        setPaymentDetails("Rekening: 123-456-7890 atas nama XYZ.");
        setShowPaymentPopup(true);
      } else {
        setShowCodePopup(true); // Untuk sesi gratis
      }
    } else {
      alert("Gagal mengirim permintaan.");
    }

    setIsSubmitting(false);
  };

  const handlePaymentDone = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data = { name, email, role, session_type: "low-cost" };

    const res = await fetch("/api/counseling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      const result = await res.json();
      setRoomNumber(result.room_number);
      setCode(result.code);

      setShowPaymentPopup(false); // Tutup modal pembayaran
      setShowCodePopup2(true); // Tampilkan modal kode
    } else {
      const errorResponse = await res.json();
      alert(errorResponse.message || "Gagal menyimpan data.");
    }

    setIsSubmitting(false);
  };

  const handleModalClose = () => {
    // Tutup semua modal
    setShowCodePopup(false);
    setShowPaymentPopup(false);
    setShowCodePopup2(false);
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
              <label className={styles.formLabel}>Jenis Sesi:</label>
              <select name="session_type" className={styles.formInput}>
                <option value="free">Gratis</option>
                <option value="low-cost">Berbiaya Rendah</option>
              </select>

              <button type="submit" className={styles.formButton}>
                Daftar Konseling
              </button>
            </form>
          </section>
        </div>

        {/* Pop-up untuk sesi gratis */}
        {showCodePopup && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Registrasi Sesi Berhasil!</h2>
              <p>Room Number: {roomNumber}</p>
              <p>Code: {code}</p>
              <button onClick={handleModalClose} className={styles["modal-button"]}>
                OK
              </button>
            </div>
          </div>
        )}

        {/* Pop-up untuk pembayaran */}
        {showPaymentPopup && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Silakan Transfer</h2>
              <p>{paymentDetails}</p>
              <button onClick={handlePaymentDone} className={styles["modal-button"]}>
                Done
              </button>
            </div>
          </div>
        )}

        {/* Pop-up kedua setelah pembayaran selesai */}
        {showCodePopup2 && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Registrasi Sesi Berhasil!</h2>
              <p>Room Number: {roomNumber}</p>
              <p>Code: {code}</p>
              <button onClick={handleModalClose} className={styles["modal-button"]}>
                OK
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
