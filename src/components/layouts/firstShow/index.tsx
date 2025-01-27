import React, { useState } from "react";
import styles from "./firstShow.module.css";
import Image from "next/image";

const FirstShow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(true); // State untuk menampilkan popup

  const slides = [
    "Selamat Datang di Platform Kami!",
    "Kami senang bisa berbagi pengalaman dengan Anda!",
  ];

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  if (!isPopupVisible) return null; // Tidak menampilkan popup jika state isPopupVisible = false

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        {/* Tombol Close */}
        <div className={styles.closeButton} onClick={closePopup}>
          &times;
        </div>

        <div className={styles.imageContainer}>
          {/* Gambar dan Teks */}
          <Image
            src="/images/woman.png"
            alt="Left"
            className={styles.image}
            width={110}
            height={252}
          />
          <div style={{ backgroundColor: "white", width: "400px", height: "100px", borderRadius: "10px" , alignContent: "center"}}>
            <p className={styles.text}>
              {slides[slideIndex]}
            </p>
          </div>

          <Image
            src="/images/man.png"
            alt="Right"
            className={styles.image}
            width={83}
            height={252}
          />
        </div>

        {/* Indikator Dots dan Tombol Navigasi */}
        <div className={styles.dotsAndButtons}>
          {/* Tombol Kiri */}
          <div className={styles.navButtonLeft} onClick={prevSlide}>
            &lt;
          </div>

          {/* Indikator Dots */}
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${slideIndex === index ? styles.activeDot : ""}`}
              />
            ))}
          </div>

          {/* Tombol Kanan */}
          <div className={styles.navButtonRight} onClick={nextSlide}>
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstShow;