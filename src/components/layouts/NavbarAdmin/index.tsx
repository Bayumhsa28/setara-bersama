'use client';

import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter untuk redirect
import styles from './Navbar.module.css';
import Link from 'next/link';
import Cookies from 'js-cookie'; // Import js-cookie

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Fungsi untuk logout
  const handleLogout = () => {
    // Hapus cookies yang berhubungan dengan user
    Cookies.remove('user_name');
    Cookies.remove('user_email');
    Cookies.remove('user_role');
    
    // Hapus token dari localStorage
    localStorage.removeItem('token');
  };

  // Menyimpan URL asal pengguna sebelum logout
  if (typeof window !== 'undefined') {
    // Menyimpan URL asal hanya jika ada cookies (user sudah login)
    if (Cookies.get('user_name')) {
      localStorage.setItem('redirectUrl', window.location.pathname);
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>SETARA BERSAMA</div>
      <button 
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        <li>
          <Link href="/home" onClick={() => setIsOpen(false)}>Home</Link>
        </li>
        <li>
          <Link href="/home" onClick={() => setIsOpen(false)}>About</Link>
        </li>
        <li>
          <Link href="/support" onClick={() => setIsOpen(false)}>Support</Link>
        </li>
        <li>
          <Link href="/support/legal" onClick={() => setIsOpen(false)}>Legal Support</Link>
        </li>
        <li>
          {/* Logout Link */}
          <Link 
            href="/" 
            onClick={(e) => {
              e.preventDefault(); // Mencegah reload halaman langsung
              handleLogout(); // Jalankan fungsi logout
              router.push('/'); // Redirect ke halaman login
            }}
          >
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
