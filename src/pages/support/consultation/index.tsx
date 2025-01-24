'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie'; // Import js-cookie
import Navbar from '@/components/layouts/Navbar'; // Import Navbar
import Footer from '@/components/layouts/Footer'; // Import Footer
import styles from './Consultation.module.css';
import { AiOutlinePlus } from 'react-icons/ai'; // Ikon tambah room
import { MdChatBubbleOutline } from 'react-icons/md'; // Ikon room chat

const Consultation = () => {
  const [rooms, setRooms] = useState<string[]>([]);
  const router = useRouter();

  // Ambil data cookies
  const name = Cookies.get('user_name');
  const email = Cookies.get('user_email');
  const role = Cookies.get('user_role');

  // Periksa cookies, arahkan ke halaman login jika tidak ditemukan
  useEffect(() => {
    if (!name || !email || role !== '1') {
      router.push('/'); // Arahkan ke halaman login jika tidak ada cookies
    }
  }, [name, email, role, router]);

  const handleAddRoom = () => {
    // Fungsi ini tidak lagi diperlukan jika menggunakan Link
  };

  return (
    <div className="container">
      <Navbar />
      <main className={styles.content}>
        <header className={styles.header}>
          <h1>Consultation</h1>
          {/* Gunakan Link untuk mengarahkan ke createRoom */}
          <Link href="/support/consultation/createRoom">
            <button className={styles.addRoomButton}>
              <AiOutlinePlus className={styles.icon} />
            </button>
          </Link>
        </header>

        <div className={styles.roomList}>
          {rooms.length === 0 ? (
            <p className={styles.emptyMessage}>
              Belum ada room. Tambahkan room baru untuk memulai konsultasi.
            </p>
          ) : (
            rooms.map((room, index) => (
              <Link key={index} href={`/support/consultation/addRoom?room=${room}`} className={styles.room}>
                <MdChatBubbleOutline className={styles.roomIcon} />
                {room}
              </Link>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Consultation;
