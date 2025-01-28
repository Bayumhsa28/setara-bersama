import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import styles from "./rendahKepercayaanDiri.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

const RendahKepercayaanDiri = () => {
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
                                src="/images/artikelImages/malu.jpeg"
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
                                <p>Rendahnya kepercayaan diri adalah kondisi di mana seseorang merasa tidak mampu dan meragukan kemampuan serta nilai diri mereka. Ciri-cirinya termasuk mudah cemas, kesulitan berbicara di depan umum, menolak pujian, dan menghindari tantangan.
                                    Cara Menangani Secara Sederhana
                                    <ul style={{ marginLeft: "20px" }}>
                                        <li>
                                            Membangun Kesadaran Diri: Kenali kekuatan dan pencapaian diri.
                                        </li>
                                        <li>
                                            Berlatih Positif: Gantilah pikiran negatif dengan afirmasi positif.
                                        </li>
                                        <li>
                                            Tentukan Tujuan Kecil: Tetapkan tujuan realistis dan raih secara bertahap.
                                        </li>
                                        <li>
                                            Berinteraksi Sosial: Terlibat dalam kegiatan sosial untuk meningkatkan keterampilan.
                                        </li>
                                        <li>
                                            Menerima Pujian: Terima pujian dengan baik dan akui usaha yang dilakukan.
                                        </li>
                                        <li>
                                            Berlatih Keterampilan Baru: Ikuti kursus atau workshop untuk mengembangkan kemampuan.
                                        </li>
                                        <li>
                                            Mencari Dukungan: Cari dukungan dari teman, keluarga, atau profesional jika diperlukan.
                                        </li>
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

export default RendahKepercayaanDiri;
