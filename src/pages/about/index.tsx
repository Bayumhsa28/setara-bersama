
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Cookies from "js-cookie"; // Import js-cookie
import styles from "./Home.module.css";

export default function Home() {
  const router = useRouter();
  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");

  useEffect(() => {
    // Jika tidak ada cookie, arahkan ke halaman login
    if (!name || !email || role !== "1") {
      router.push("/login"); // Pastikan URL login benar
    }
  }, [name, email, role, router]);

  return (
    <div className="container">
      <Navbar />
      <main className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.heading}>Tujuan Web:</h1>
          <p className={styles.paragraph}>
            Kami hadir untuk mendukung mereka yang terdampak ketimpangan gender
            dan berjuang menciptakan dunia yang setara.
          </p>
          <div className={styles["button-group"]}>
            <button type="submit" className={styles.button}>Dapatkan Dukungan</button>
            <button type="submit" className={styles.button}>Pelajari Hak Anda</button>
          </div>

        </div>
        <div className={styles.hero1}>
          <div className={styles.vision}>
            <h1 className={styles.heading}>Visi:</h1>
            <p className={styles.paragraph}>
              Mewujudkan masyarakat inklusif yang bebas dari ketidakadilan
              gender.
            </p>
          </div>
          <div className={styles.mission}>
            <h1 className={styles.heading}>Misi:</h1>
            <p className={styles.paragraph}>
              Memberikan edukasi, dukungan psikologis, dan pemberdayaan bagi
              individu yang menghadapi diskriminasi gender.
            </p>
          </div>
        </div>
        <div className={styles.hero3}>
          <h1 className={styles.heading}>Partner dan kolaborator:</h1>
          <ul className={styles.listKolaborator}>
            <li>(organisasi terkait kesetaraan gender)</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
