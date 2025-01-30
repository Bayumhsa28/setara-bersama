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
                    <h1 className={styles.heroTitle}>Relaksasi dengan metode “BERNAFAS”</h1>
                    <div className={styles.heroContent}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/artikelImages/Meditasion.png"
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
                                <p>B - Bernapas Dalam
                                    <ul style={{ marginLeft: "30px" }}>
                                        <li>Tarik napas dalam-dalam melalui hidung, tahan sejenak, lalu hembuskan perlahan melalui mulut. Ulangi beberapa kali untuk menenangkan pikiran.</li>
                                    </ul>
                                </p>
                                <p>E - Ekspresikan Diri
                                    <ul style={{ marginLeft: "30px" }}>
                                        <li>Luangkan waktu untuk mengekspresikan perasaan Anda, baik melalui tulisan, seni, atau berbicara dengan seseorang.</li>
                                    </ul>
                                </p>
                                <p>R - Relaksasi Otot
                                    <ul style={{ marginLeft: "30px" }}>
                                        <li>Lakukan relaksasi otot progresif dengan menegangkan dan mengendurkan kelompok otot secara bergantian untuk mengurangi ketegangan.</li>
                                    </ul>
                                </p>
                                <p>N - Nikmati Alam
                                    <ul style={{ marginLeft: "30px" }}>
                                        <li>Cobalah berjalan di luar ruangan dan nikmati keindahan alam. Menghabiskan waktu di alam dapat membantu meredakan stres.</li>
                                    </ul>
                                </p>
                                <p>A - Afirmasi Positif
                                    <ul style={{ marginLeft: "30px" }}>
                                        <li>Ucapkan afirmasi positif kepada diri sendiri, seperti "Saya mampu mengatasi tantangan ini" untuk meningkatkan kepercayaan diri.</li>
                                    </ul>
                                </p>
                                <p>F - Fokus pada Saat Ini
                                    <ul style={{ marginLeft: "30px" }}>
                                        <li>Latih mindfulness dengan fokus pada pernapasan atau lingkungan sekitar tanpa mengkhawatirkan masa lalu atau masa depan.</li>
                                    </ul>
                                </p>
                                <p>A - Aktivitas Fisik
                                    <ul style={{ marginLeft: "30px" }}>
                                        <li>Lakukan olahraga ringan seperti yoga atau berjalan kaki untuk melepaskan endorfin yang dapat meningkatkan suasana hati.</li>
                                    </ul>
                                </p>
                                <p>S - Sediakan Waktu untuk Diri Sendiri
                                    <ul style={{ marginLeft: "30px" }}>
                                        <li>Sisihkan waktu setiap hari untuk melakukan aktivitas yang Anda nikmati, seperti membaca atau mendengarkan musik.</li>
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
