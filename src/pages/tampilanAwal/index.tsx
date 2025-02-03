import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "./tampilanAwal.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const name = Cookies.get("user_name");
    const email = Cookies.get("user_email");
    const role = Cookies.get("user_role");

    useEffect(() => {
        if (!name || !email || role !== "1") {
            router.push("/");
        }
    }, [name, email, role, router]);

    const cards = [
        {
            title: "Beranda",
            description: "Anda dapat ke page beranda dengan mengklik card ini.",
            image: "/images/button/homeWhiteButton.png",
            href: "/home"
        },
        {
            title: "Tentang",
            description: "Anda dapat ke page tentang dengan mengklik card ini.",
            image: "/images/button/aboutWhiteButton.png",
            href: "/about"
        },
        {
            title: "Support",
            description: "Anda dapat ke page support dengan mengklik card ini.",
            image: "/images/button/supportWhiteButton.png",
            href: "/support"
        },
        {
            title: "Apa yang sedang Anda rasakan?",
            description: "Anda dapat ke page informasi tentang perasaan dengan mengklik card ini.",
            image: "/images/button/artikelWhiteButton.png",
            href: "/artikel"
        },
    ];

    return (
        <div className={styles.container}>
            <main className={styles.content}>
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>Kesetaraan bukan pemberian, tetapi hak. Jangan ragu untuk memperjuangkannya!</h1>
                    <p className={styles.heroDescription}>
                        Temukan halaman yang kamu inginkan saat ini.
                    </p>
                    <div className={styles.cards}>
                        {cards.map((card, index) => (
                            <Link key={index} href={card.href} aria-label={card.title} className={styles.card}>
                                <div>
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        width={130}
                                        height={130}
                                        className={styles.cardImage}
                                    />
                                    <h2>{card.title}</h2>
                                    <p>{card.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Image
                        src="/images/kebersamaan.png"
                        alt="Kebersamaan"
                        width={400}
                        height={300}
                        className={styles.decorImage}
                    />
                </div>
            </main>
        </div>
    );
}
