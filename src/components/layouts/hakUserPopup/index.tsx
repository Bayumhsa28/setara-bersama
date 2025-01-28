import React, { useState } from "react";
import styles from "./hakUserPopup.module.css";
import Image from "next/image";

const HakUserPopup = ({ closePopup }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    const slides = [
        {
            title: "Pasal Hukum untuk Korban Intimidasi Gender",
            laws: [
                {
                    title: "Undang-Undang Tindak Pidana Kekerasan Seksual (UU TPKS):",
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
            title: "Tempat untuk Melapor",
            laws: [
                {
                    title: "Kepolisian",
                    details:
                        "Korban dapat melapor ke kantor polisi terdekat untuk mengajukan laporan resmi mengenai intimidasi yang dialami.",
                },
            ],
        },
    ];

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={closePopup}>
                    &times;
                </button>

                <div className={styles.contentWrapper}>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/woman.png"
                            alt="Ilustrasi Perempuan"
                            className={styles.image}
                            width={110}
                            height={252}
                        />
                    </div>

                    <div className={styles.lawsContainer}>
                        <h2 className={styles.title} style={{ marginLeft: "10px" }}>
                            {slides[currentSlide].title}
                        </h2>
                        <ul className={styles.lawsList}>
                            {slides[currentSlide].laws.map((law, index) => (
                                <li key={index} className={styles.lawItem}>
                                    <strong>{law.title}</strong>
                                    <ul>
                                        <li style={{ marginLeft: "20px" }}>
                                            <p className={styles.lawDetails}>
                                                {law.details}
                                            </p>
                                        </li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.dotsAndButtons}>
                    <div className={styles.navButtonLeft} onClick={prevSlide}>
                        &lt;
                    </div>
                    <div className={styles.dots}>
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ""}`}
                            />
                        ))}
                    </div>
                    <div className={styles.navButtonRight} onClick={nextSlide}>
                        &gt;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HakUserPopup;
