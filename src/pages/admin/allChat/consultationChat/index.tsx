import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import Navbar from "@/components/layouts/NavbarAdmin";
import Footer from "@/components/layouts/Footer";
import styles from "./ConsultationChat.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";

const Consultation = () => {
  const [rooms, setRooms] = useState<{ room_number: number; name: string }[]>([]);
  const router = useRouter();

  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");

  useEffect(() => {
    if (!name || !email || role !== "2") {
      router.push("/");
      return;
    }

    // Fetch daftar semua room dari backend admin
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/admin/consultationAdmin"); // API untuk admin
        if (res.ok) {
          const data = await res.json();
          setRooms(data.rooms);
        } else {
          console.error("Gagal mengambil daftar room.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRooms();
  }, [name, email, role, router]);

  return (
    <div className="container">
      <Navbar />
      <main className={styles.content}>

        <div className={styles.roomList}>
          {rooms.length === 0 ? (
            <p className={styles.emptyMessage}>
              Belum ada room. Tambahkan room baru untuk memulai konsultasi.
            </p>
          ) : (
            rooms.map((room) => (
              <div key={room.room_number} className={styles.room}>
                <MdChatBubbleOutline className={styles.roomIcon} />
                <Link
                  href={`/admin/consultationAdmin/roomChat?room=${room.room_number}`}
                  className={styles.roomLink}
                >
                  room {room.room_number}
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Consultation;
