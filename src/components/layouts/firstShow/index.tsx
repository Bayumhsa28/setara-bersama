import React, { useState } from "react";
import styles from "./firstShow.module.css";
import Image from "next/image";

const FirstShow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    "Selamat Datang di Platform Kami!",
    "Kami senang bisa berbagi pengalaman dengan Anda!",
  ];

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <div className={styles.imageContainer}>
          {/* Gambar dan Teks */}
          <Image
            src="/images/consultation.png"
            alt="Left"
            className={styles.image}
            width={150}
            height={150}
          />
          <p className={styles.text}>{slides[slideIndex]}</p>
          <Image
            src="/images/consultation.png"
            alt="Right"
            className={styles.image}
            width={150}
            height={150}
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
