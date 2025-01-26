import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import Navbar from "@/components/layouts/NavbarAdmin";
import Footer from "@/components/layouts/Footer";
import styles from "./ConsultationChat.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";

const ConsultationChat = () => {
  const [rooms, setRooms] = useState<{ room_number: number; name: string }[]>([]);
  const router = useRouter();

  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");

  useEffect(() => {
    if (!name || !email || role !== "2") {
      router.push("/");  // Redirect if the user is not an admin
      return;
    }

    // Fetch daftar room dari backend untuk admin
    const fetchRooms = async () => {
      try {
        const res = await fetch(`/api/consultationAdmin?role=${role}`); // Pass the role as a query parameter
        if (res.ok) {
          const data = await res.json();
          setRooms(data.rooms);
        } else {
          console.error("Gagal mengambil daftar room");
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
        <header className={styles.header}>
          <h1>Consultation - Admin</h1>
          <Link href="/admin/allChat/consultationChat/createRoom">
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
            rooms.map((room) => (
              <div key={room.room_number} className={styles.room}>
                <MdChatBubbleOutline className={styles.roomIcon} />
                <Link
                  href={`/admin/allChat/consultationChat/roomChat?room=${room.room_number}`}
                  className={styles.roomLink}
                >
                  {room.name}
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

export default ConsultationChat;
