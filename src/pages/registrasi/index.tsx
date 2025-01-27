import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link
import styles from "./register.module.css";

export default function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Menambahkan state untuk loading
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, gender, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      setIsModalOpen(true); // Tampilkan pop-up setelah registrasi berhasil
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false); // Set loading ke false setelah request selesai
    }
  };

  // Fungsi untuk menutup modal dan redirect ke login
  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/"); // Redirect ke halaman login
  };

  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-card"]}>
        <h1 className={styles.heading}>Registrasi Akun</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["input-group"]}>
            <label>Nama Lengkap</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              required
            />
          </div>
          <div className={styles["input-group"]}>
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Pilih gender</option>
              <option value="m">Laki-laki</option>
              <option value="f">Perempuan</option>
            </select>
          </div>
          <div className={styles["input-group"]}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Registrasi
          </button>
        </form>
        {error && <p className={styles["error-message"]}>{error}</p>}

        {/* Link ke halaman login */}
        <p className={styles["login-link"]}>
          Sudah punya akun?{" "}
          <Link href="/" className={styles["login-text"]}>
            Silahkan login
          </Link>
        </p>
      </div>

      {/* Modal Pop-up */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Registrasi Berhasil!</h2>
            <p>
              Selamat, akun Anda telah berhasil terdaftar. Klik "OK" untuk masuk
              ke halaman login.
            </p>
            <button
              onClick={handleModalClose}
              className={styles["modal-button"]}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
