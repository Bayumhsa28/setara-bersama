import React, { useState } from "react";
import styles from "./support.module.css";
import Image from "next/image";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const SupportPage = () => {
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
        {
          title: "Peraturan Mahkamah Agung No. 3 Tahun 2017",
          details:
            "Mengatur tentang perlindungan perempuan berhadapan dengan hukum, termasuk larangan terhadap sikap atau pernyataan yang merendahkan atau mengintimidasi perempuan di pengadilan.",
        },
      ],
    },
    {
      title: "Tempat untuk Melapor",
      laws: [
        {
          title: "Kepolisian",
          details:
            "Korban dapat melapor ke kantor polisi terdekat untuk mengajukan laporan resmi mengenai intimidasi yang dialami.",
        },
        {
          title: "Lembaga Perlindungan Saksi dan Korban (LPSK)",
          details:
            "LPSK memberikan perlindungan dan dukungan kepada korban kekerasan, termasuk intimidasi gender, dan membantu dalam proses hukum.",
        },
        {
          title: "Komnas Perempuan",
          details:
            "Komisi Nasional Perempuan menyediakan layanan pengaduan dan dukungan bagi perempuan yang mengalami kekerasan dan intimidasi.",
        },
        {
          title: "Lembaga Bantuan Hukum (LBH)",
          details:
            "LBH dapat memberikan bantuan hukum dan pendampingan bagi korban dalam proses pelaporan dan persidangan.",
        },
      ],
    },
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="container">
      <Navbar />
      <main className={styles.content}>
        <h1 className={styles.pageTitle}>Bantuan dan Dukungan</h1>
        <div className={styles.contentWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/woman.png"
              alt="Ilustrasi Perempuan"
              className={styles.image}
              width={200}
              height={458.29}
            />
          </div>

          <div className={styles.lawsContainer}>
            <h2 className={styles.title}>{slides[slideIndex].title}</h2>
            <ul className={styles.lawsList}>
              {slides[slideIndex].laws.map((law, index) => (
                <li key={index} className={styles.lawItem}>
                  <strong>{law.title}</strong>
                  <p className={styles.lawDetails}>{law.details}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.dotsAndButtons}>
          <button className={styles.navButtonLeft} onClick={prevSlide}>&lt;</button>
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${slideIndex === index ? styles.activeDot : ""}`}
              />
            ))}
          </div>
          <button className={styles.navButtonRight} onClick={nextSlide}>&gt;</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
