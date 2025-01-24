import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from 'next/link';
import styles from './index.module.css';
import Image from 'next/image';
import Cookies from 'js-cookie'; // Import js-cookie

const SupportPage = () => {
  const router = useRouter();
  const name = Cookies.get('user_name');
  const email = Cookies.get('user_email');
  const role = Cookies.get('user_role');

  useEffect(() => {
    // Jika tidak ada cookie atau role bukan 1, arahkan ke halaman login
    if (!name || !email || role !== '1') {
      router.push("/"); // Arahkan ke halaman login atau halaman lain yang sesuai
    }
  }, [name, email, role, router]);

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>
        <div className={styles.hero}>
          <h1>Masukkan text....</h1>
          <p>masukkan text</p>
          <div className={styles.cards}>
            {/* Membungkus seluruh card dengan Link */}
            <Link href="/support/consultation">
              <div className={styles.card}>
                <h2>Counsultation</h2>
                <p>isi teks...</p>
                <Image src="/images/consultation.png" alt="consultation" width={130} height={98} />
              </div>
            </Link>
            <Link href="/support/page2">
              <div className={styles.card}>
                <h2>Discusion</h2>
                <p>isi teks...</p>
                <Image src="/images/consultation.png" alt="consultation" width={130} height={98} />
              </div>
            </Link>
            <Link href="/support/page3">
              <div className={styles.card}>
                <h2>Legal report</h2>
                <p>isi teks...</p>
                <Image src="/images/consultation.png" alt="consultation" width={130} height={98} />
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
