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
                                src="/images/artikelImages/cemas.jpg"
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
                                <p>Cemas adalah perasaan khawatir atau takut yang tidak menyenangkan, sering kali muncul tanpa alasan yang jelas. Ciri-ciri cemas meliputi rasa gelisah, sulit berkonsentrasi, dan gejala fisik seperti detak jantung yang cepat atau berkeringat. Cemas bisa menjadi reaksi normal terhadap stres, tetapi jika berlebihan, dapat mengganggu aktivitas sehari-hari dan menjadi gangguan kecemasan 14.
                                    <p>Cara Menangani Stres Secara Sederhana:</p>
                                    <ul style={{ marginLeft: "20px" }}>
                                        <li>Bernafas Dalam: Praktikkan teknik pernapasan dalam untuk menenangkan diri.</li>
                                        <li>Olahraga: Lakukan aktivitas fisik secara teratur untuk mengurangi ketegangan.</li>
                                        <li>Edukasi Diri: Pelajari lebih lanjut tentang kecemasan untuk memahami dan mengelolanya.</li>
                                        <li>Berkumpul dengan Teman: Luangkan waktu bersama orang-orang terdekat untuk mendapatkan dukungan emosional.</li>
                                        <li>Menulis Jurnal: Catat perasaan dan pikiran untuk membantu melepaskan kecemasan.</li>
                                        <li>Teknik Relaksasi: Cobalah meditasi atau yoga untuk menenangkan pikiran.</li>
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
