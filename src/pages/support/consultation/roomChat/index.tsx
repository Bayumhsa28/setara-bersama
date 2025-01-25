import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import styles from "./RoomChat.module.css";

const RoomChat = () => {
  const [roomNumber, setRoomNumber] = useState<string | null>(null);
  
  const [chats, setChats] = useState<{
    name: string;
    email: string;
    message: string;
    time: string;
  }[]>([]);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { room } = router.query;
  
  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");

  useEffect(() => {
    if (!name || !email || role !== "1") {
      router.push("/");
      return;
    }

    if (room) {
      setRoomNumber(room as string);
    }

    const fetchChats = async () => {
      try {
        const res = await fetch(`/api/Chat?room_number=${room}`);
        if (res.ok) {
          const data = await res.json();
          setChats(data.chats);
        } else {
          console.error("Gagal mengambil data chat.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (room) {
      fetchChats();
    }
  }, [name, email, role, room, router]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Convert room to integer before sending
    const roomNumberInt = parseInt(room as string, 10);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, message, room_number: roomNumberInt }),
      });

      if (res.ok) {
        const newMessage = await res.json();
        setChats((prev) => [...prev, newMessage]);
        setMessage("");
      } else {
        console.error("Gagal mengirim pesan.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <main className={styles.content}>
        <h1 className={styles.roomTitle}>
          {roomNumber ? `Room ${roomNumber}` : "Loading..."}
        </h1>
        <div className={styles.chatContainer}>
          {chats.map((chat, index) => (
            <div key={index} className={styles.chatMessage}>
              <p>
                <strong>{chat.name}:</strong> {chat.message}
              </p>
              <small>{chat.time}</small>
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Tulis pesan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Kirim
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomChat;
