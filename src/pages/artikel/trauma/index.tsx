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
                                src="/images/artikelImages/trauma.jpeg"
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
                                <p>Trauma emosional adalah respons psikologis yang terjadi setelah seseorang mengalami peristiwa yang mengancam atau menyakitkan secara fisik atau emosional, seperti kecelakaan, kekerasan, atau bencana alam. Trauma ini dapat menyebabkan perasaan cemas, marah, bingung, dan ketidakmampuan untuk mengatasi emosi yang muncul akibat pengalaman tersebut. Gejala trauma emosional bisa bersifat psikologis, fisik, dan perilaku, dan dapat mempengaruhi kehidupan sehari-hari individu.
                                    <p>Cara Menangani Stres Secara Sederhana:</p>
                                    <ul style={{ marginLeft: "20px" }}>
                                        <li>Berbicara dengan Seseorang: Luangkan waktu untuk berbagi pengalaman dengan teman dekat atau anggota keluarga yang dapat dipercaya.</li>
                                        <li>Menulis Jurnal: Catat perasaan dan pikiran Anda untuk membantu memproses emosi.</li>
                                        <li>Teknik Relaksasi: Coba meditasi, yoga, atau teknik pernapasan dalam untuk menenangkan pikiran.</li>
                                        <li>Olahraga: Lakukan aktivitas fisik secara teratur untuk melepaskan stres dan meningkatkan suasana hati.</li>
                                        <li>Mencari Bantuan Profesional: Jika merasa kesulitan mengatasi trauma, pertimbangkan untuk berkonsultasi dengan psikolog atau konselor.</li>
                                        
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
