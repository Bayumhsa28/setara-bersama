'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import styles from './ChatRoom.module.css';

const ChatRoom = () => {
  const router = useRouter();
  const { room } = router.query;

  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, inputMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <main className={styles.chatContainer}>
        <header className={styles.chatHeader}>
          <h2>{room}</h2>
        </header>

        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div key={index} className={styles.message}>
              {message}
            </div>
          ))}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className={styles.input}
            placeholder="Ketik pesan..."
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

export default ChatRoom;
