import React, { useState } from "react";
import styles from "./hakUserPopup.module.css";
import Image from "next/image";

const HakUserPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0); // Slide aktif (0 atau 1)

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length); // Pindah ke slide berikutnya
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    ); // Pindah ke slide sebelumnya
  };

  if (!isPopupVisible) return null;

  const slides = [
    {
      title: "Pasal Hukum untuk Korban Intimidasi Gender",
      laws: [
        {
          title: "Undang-Undang Tindak Pidana Kekerasan Seksual (UU TPKS)",
          details:
            "Pasal 14 UU No. 12 Tahun 2022 mengatur tentang tindakan yang dapat dikenakan sanksi bagi pelaku kekerasan seksual, termasuk intimidasi yang dialami korban.",
        },
        {
          title: "Kitab Undang-Undang Hukum Pidana (KUHP)",
          details:
            "Pasal 281 hingga 296 KUHP mengatur tentang pelecehan seksual dan intimidasi, di mana pelaku dapat dijerat hukum jika terbukti melakukan tindakan tersebut.",
        },
      ],
    },
    {
      title: "Hak-Hak Korban Intimidasi Gender",
      laws: [
        {
          title: "Peraturan Mahkamah Agung No. 3 Tahun 2017",
          details:
            "Mengatur tentang perlindungan perempuan berhadapan dengan hukum, termasuk larangan terhadap sikap atau pernyataan yang merendahkan atau mengintimidasi perempuan di pengadilan.",
        },
        {
          title: "Konvensi Penghapusan Segala Bentuk Diskriminasi terhadap Perempuan (CEDAW)",
          details:
            "Mendorong perlindungan hak-hak perempuan untuk bebas dari diskriminasi, termasuk intimidasi berdasarkan gender.",
        },
      ],
    },
  ];

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        {/* Tombol Close */}
        <button className={styles.closeButton} onClick={closePopup}>
          &times;
        </button>

        {/* Layout Horizontal */}
        <div className={styles.contentWrapper}>
          {/* Gambar */}
          <div className={styles.imageContainer}>
            <Image
              src="/images/woman.png"
              alt="Ilustrasi Perempuan"
              className={styles.image}
              width={110}
              height={252}
            />
          </div>

          {/* Slide Content */}
          <div className={styles.lawsContainer}>
            <h1 className={styles.titleJudul}>PASAL</h1>
            <h2 className={styles.title}>{slides[currentSlide].title}</h2>
            <ul className={styles.lawsList}>
              {slides[currentSlide].laws.map((law, index) => (
                <li key={index} className={styles.lawItem}>
                  <strong>{law.title}</strong>
                  <p className={styles.lawDetails}>* {law.details}</p>
                </li>
              ))}
            </ul>
          </div>
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
                className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ""}`}
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

export default HakUserPopup;
