import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import styles from "./rendahKepercayaanDiri.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

const StreesArtikelPages = () => {
    const router = useRouter();
    const name = Cookies.get("user_name");
    const email = Cookies.get("user_email");
    const role = Cookies.get("user_role");

    useEffect(() => {
        if (!name || !email || role !== "1") {
            router.push("/"); // Redirect if not logged in or role is not '1'
        }
    }, [name, email, role, router]);

    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.content}>
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>Rendahnya Kepercayaan Diri</h1>
                    <div className={styles.heroContent}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/artikelImages/stress.jpg"
                                alt="Rendah Kepercayaan Diri"
                                width={300}
                                height={200}
                                layout="responsive"
                                objectFit="cover"
                                className={styles.heroImage}
                            />
                        </div>
                        <div className={styles.textContainer}>
                            <section className={styles.articleContent}>
                                <h2>Isi Artikel</h2>
                                <p>Stres adalah reaksi tubuh terhadap tekanan atau tantangan yang dialami, baik dari situasi eksternal maupun internal. Stres dapat muncul akibat berbagai faktor, seperti pekerjaan, masalah pribadi, atau perubahan hidup. Jika tidak dikelola dengan baik, stres dapat berdampak negatif pada kesehatan fisik dan mental.
                                    <p>Cara Menangani Stres Secara Sederhana:</p>
                                    <ul style={{ marginLeft: "20px" }}>
                                        <li>Identifikasi Sumber Stres: Ketahui apa yang menyebabkan stres.</li>
                                        <li>Berolahraga: Lakukan aktivitas fisik untuk melepaskan ketegangan.</li>
                                        <li>Teknik Relaksasi: Coba meditasi atau pernapasan dalam.</li>
                                        <li>Tidur yang Cukup: Pastikan tidur yang berkualitas.</li>
                                        <li>Berkumpul dengan Teman: Dapatkan dukungan sosial.</li>
                                        <li>Lakukan Hobi: Luangkan waktu untuk aktivitas yang Anda nikmati.</li>
                                    </ul>

                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StreesArtikelPages;
