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
                                src="/images/artikelImages/bingung.jpg"
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
                                <p>Perasaan terasing adalah kondisi di mana seseorang merasa tidak terhubung atau tidak menjadi bagian dari lingkungan sosial, orang lain, atau bahkan diri sendiri. Ini dapat muncul akibat pengalaman negatif, seperti kehilangan, diskriminasi, atau situasi yang membuat individu merasa diabaikan. Perasaan ini sering kali disertai dengan kesepian dan ketidakberdayaan.
                                    <p>Cara Menangani Stres Secara Sederhana:</p>
                                    <ul style={{ marginLeft: "20px" }}>
                                        <li>Kenali dan Akui Perasaan: Luangkan waktu untuk memahami dan menerima perasaan terasing yang dialami.</li>
                                        <li>Berbicara dengan Orang Terdekat: Diskusikan perasaan Anda dengan teman atau anggota keluarga untuk mendapatkan dukungan emosional.</li>
                                        <li>Terlibat dalam Kegiatan Sosial: Cobalah untuk berpartisipasi dalam aktivitas sosial atau komunitas untuk membangun koneksi dengan orang lain.</li>
                                        <li>Luangkan Waktu untuk Diri Sendiri: Manfaatkan waktu sendirian untuk melakukan hobi atau aktivitas yang Anda nikmati, sehingga dapat meningkatkan rasa percaya diri.</li>
                                        <li>Praktikkan Mindfulness: Cobalah teknik mindfulness atau meditasi untuk membantu mengatasi perasaan negatif dan meningkatkan kesadaran diri.</li>
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
