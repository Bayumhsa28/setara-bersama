import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie"; // Import js-cookie
import styles from "../styles/login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Simpan data pengguna dalam cookies hanya saat login berhasil
      Cookies.set("user_name", data.user.name, { expires: 1 });
      Cookies.set("user_email", data.user.email, { expires: 1 });
      Cookies.set("user_role", data.user.role, { expires: 1 });

      // Simpan token ke localStorage
      localStorage.setItem("token", data.token);

      if (data.user.role === 2) {
        router.push("/admin"); // Jika user_role 2, arahkan ke halaman admin
      } else {
        router.push("/home"); // Jika bukan, arahkan ke halaman home
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-content"]}>
        <div className={styles["image-container"]}>
          <Image
            src="/images/consultation.png"
            alt="Consultation Illustration"
            width={263}
            height={198}
            priority
          />
        </div>

        <div className={styles["login-card"]}>
          <div style={{ textAlign: "start", marginBottom: "15px" }}>
            <h1 style={{ marginBottom: "5px" }}>Login ke</h1>
            <h3 style={{ color: "#6a0dad" }}>SETARA-BERSAMA</h3>
          </div>
          <form onSubmit={handleSubmit}>
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
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>
            <button type="submit" className={styles["button"]}>
              Login
            </button>
          </form>
          {error && <p className={styles["error-message"]}>{error}</p>}
          <p className={styles["register-link"]}>
            Belum punya akun?{" "}
            <Link href="/registrasi" className={styles["register-text"]}>
              Registrasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
