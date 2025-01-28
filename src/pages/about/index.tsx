import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Cookies from "js-cookie"; 
import styles from "./Home.module.css";
import HakUserPopup from "@/components/layouts/hakUserPopup"; 
import DukunganPopup from "@/components/layouts/dapatDukunganPopup"; 

export default function Home() {
  const router = useRouter();
  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");

  const [isHakPopupVisible, setIsHakPopupVisible] = useState(false);
  const [isDukunganPopupVisible, setIsDukunganPopupVisible] = useState(false);

  useEffect(() => {
    if (!name || !email || role !== "1") {
      router.push("/login"); 
    }
  }, [name, email, role, router]);

  const showHakPopup = () => {
    setIsHakPopupVisible(true);
  };

  const closeHakPopup = () => {
    setIsHakPopupVisible(false);
  };

  const showDukunganPopup = () => {
    setIsDukunganPopupVisible(true);
  };

  const closeDukunganPopup = () => {
    setIsDukunganPopupVisible(false);
  };

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
            <button 
              type="submit" 
              className={styles.button} 
              onClick={showDukunganPopup}
            >
              Dapatkan Dukungan
            </button>
            <button 
              type="button" 
              className={styles.button} 
              onClick={showHakPopup}
            >
              Pelajari Hak Anda
            </button>
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
      {isHakPopupVisible && <HakUserPopup closePopup={closeHakPopup} />} 
      {isDukunganPopupVisible && <DukunganPopup closePopup={closeDukunganPopup} />}
    </div>
  );
}
