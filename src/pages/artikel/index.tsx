import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import styles from "./Artikel.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

const ArtikelPage = () => {
    const router = useRouter();
    const name = Cookies.get("user_name");
    const email = Cookies.get("user_email");
    const role = Cookies.get("user_role");

    useEffect(() => {
        if (!name || !email || role !== "1") {
            router.push("/");
        }
    }, [name, email, role, router]);

    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.content}>
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>Inspirasi untuk Hidup Lebih Baik</h1>
                    <p className={styles.heroDescription}>
                        Temukan artikel yang dapat membantu Anda memahami dan mengatasi tantangan hidup.
                    </p>
                    <div className={styles.cards}>
                        {[
                            {
                                title: "Rendahnya Kepercayaan Diri",
                                description:
                                    "Kondisi meragukan kemampuan diri yang dapat diatasi dengan kesadaran, tujuan kecil, dan dukungan.",
                                image: "/images/artikelImages/malu.jpeg",
                                href: "/artikel/rendahKepercayaanDiri",
                            },
                            {
                                title: "Stres",
                                description:
                                    "Stres adalah respons tubuh terhadap tekanan yang dapat dikelola dengan olahraga, relaksasi, tidur cukup, hobi, dan dukungan sosial.",
                                image: "/images/artikelImages/stress.jpg",
                                href: "/artikel/stress",
                            },
                            {
                                title: "Cemas",
                                description:
                                    "Perasaan khawatir berlebihan yang dapat diatasi dengan pernapasan dalam, olahraga, dukungan sosial, dan teknik relaksasi.",
                                image: "/images/artikelImages/cemas.jpg",
                                href: "/artikel/cemas",
                            },
                            
                            {
                                title: "Trauma emosional",
                                description:
                                    "Trauma emosional adalah respons psikologis terhadap pengalaman menyakitkan yang dapat diatasi dengan berbicara, menulis, relaksasi, olahraga, dan dukungan profesional.",
                                image: "/images/artikelImages/trauma.jpeg",
                                href: "/artikel/trauma",
                            },
                            {
                                title: "Perasaan terasing",
                                description:
                                    "Perasaan terasing adalah kondisi merasa tidak terhubung yang dapat diatasi dengan berbicara, kegiatan sosial, mindfulness, dan waktu untuk diri sendiri.",
                                image: "/images/artikelImages/bingung.jpg",
                                href: "/artikel/perasaan",
                            },
                            {
                                title: "Relaksasi dengan metode “BERNAFAS”",
                                description:
                                    "Metode BERNAFAS adalah teknik sederhana untuk mengelola stres dengan bernapas dalam, mengekspresikan diri, merelaksasi otot, menikmati alam, menggunakan afirmasi positif, fokus pada saat ini, beraktivitas fisik, dan menyediakan waktu untuk diri sendiri.",
                                image: "/images/artikelImages/meditationBackground.jpg",
                                href: "/artikel/bernafas",
                            },
                        ].map((card, index) => (
                            <Link key={index} href={card.href} aria-label={card.title}>
                                <div className={styles.card}>
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        width={130}
                                        height={98}
                                        layout="responsive"
                                        objectFit="cover"
                                    />
                                    <h2>{card.title}</h2>
                                    <p>{card.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ArtikelPage;
