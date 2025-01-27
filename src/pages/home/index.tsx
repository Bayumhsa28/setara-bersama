import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import FirstShow from "@/components/layouts/firstShow";
import Footer from "@/components/layouts/Footer";
import Cookies from "js-cookie";
import styles from "./Home.module.css";
import Image from "next/image";
import imageProf from "../../../public/images/profile.png";
import UploadStory from "@/components/layouts/uploadStory"; // Import UploadStory

export default function Home() {
  const router = useRouter();
  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");
  const [showPopUp, setShowPopUp] = useState(false); // Menyimpan state pop-up

  useEffect(() => {
    if (!name || !email || role !== "1") {
      router.push("/login");
    }
  }, [name, email, role, router]);

  const handleHeroClick = () => {
    setShowPopUp(true); // Menampilkan pop-up saat div hero diklik
  };

  const handleInputClick = () => {
    setShowPopUp(true); // Menampilkan pop-up saat input diklik
  };

  const closePopUp = () => {
    setShowPopUp(false); // Menutup pop-up jika di-klik close button
  };

  return (
    <div className="container">
      <Navbar />
      <main className={styles.content}>
        <FirstShow />
        <div className={styles.hero} onClick={handleHeroClick}>
          <div className={styles.profileContainer}>
            <Image src={imageProf} alt="Profile Picture" className={styles.profileImage} />
            <div className={styles.textInputContainer}>
              <input
                className={styles.input}
                placeholder="Ceritakan pengalaman anda di sini"
                onClick={handleInputClick} // Menampilkan pop-up setiap klik input
              />
            </div>
          </div>
        </div>
        {/* Kondisi untuk menampilkan pop-up */}
        {showPopUp && (
          <UploadStory closePopup={closePopUp} />
        )}
      </main>
      <Footer />
    </div>
  );
}
