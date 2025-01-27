import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
import FirstShow from "@/components/layouts/firstShow";
import Footer from "@/components/layouts/Footer";
import Cookies from "js-cookie";
import styles from "./Home.module.css";
import Image from "next/image";
import imageProf from "../../../public/images/profile.png";
import commentButton from "../../../public/images/commentButton.png";
import UploadStory from "@/components/layouts/uploadStory";
import StoryImage from "@/components/layouts/StoryImage";
import CommentPopup from "@/components/layouts/comments"; // Import komponen pop-up comments

interface Story {
  id: number;
  name: string;
  email: string;
  story: string;
  photos: string[];
  upload_date: string;
}

export default function Home() {
  const router = useRouter();
  const name = Cookies.get("user_name");
  const email = Cookies.get("user_email");
  const role = Cookies.get("user_role");
  const [showPopUp, setShowPopUp] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false); // State untuk pop-up comments
  const [stories, setStories] = useState<Story[]>([]); // Menyimpan data story
  const [comments, setComments] = useState<string[]>([]); // Menyimpan komentar
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null); // State untuk menyimpan ID cerita yang dipilih

  useEffect(() => {
    if (!name || !email || role !== "1") {
      router.push("/login");
    }
  }, [name, email, role, router]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/api/story");
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Gagal mengambil data story:", error);
      }
    };

    fetchStories();
  }, []);

  const handleHeroClick = () => {
    setShowPopUp(true);
  };

  const handleInputClick = () => {
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  const handleCommentButtonClick = (storyId: number) => {
    setSelectedStoryId(storyId); // Set ID cerita yang dipilih
    setShowCommentPopup(true); // Tampilkan pop-up komentar
  };

  const closeCommentPopup = () => {
    setShowCommentPopup(false);
  };

  const handleCommentSubmit = (comment: string) => {
    setComments([...comments, comment]); // Simpan komentar ke state
  };

  return (
    <div className="container">
      <Navbar />
      <main className={styles.content}>
        <FirstShow />
        <div className={styles.hero} onClick={handleHeroClick}>
          <div className={styles.profileContainer}>
            <Image src={imageProf} alt="Profile Picture" className={styles.profileImage} />
            <div className={styles.textInputContainer}>
              <input
                className={styles.input}
                placeholder="Ceritakan pengalaman anda di sini"
                onClick={handleInputClick}
              />
            </div>
          </div>
        </div>
        {stories.map((story) => (
          <div key={story.id} className={styles.hero}>
            <div className={styles.profileContainer1}>
              <Image src={imageProf} alt="Profile Picture" className={styles.profileImageStory} />
              <div className={styles.textInputContainer}>
                <h3>{story.name}</h3>
                <small style={{ marginTop: "5px" }}>{new Date(story.upload_date).toLocaleString()}</small>
                <div className={styles.statusContainer}>
                  <p style={{ marginTop: "10px", marginLeft: "10px", marginBottom: "10px", marginRight: "10px" }}>{story.story}</p>
                </div>
              </div>
            </div>
            <div className={styles.profileContainer}>
              <div className={styles.textInputContainer1}>
                <StoryImage src={story.photos[0]} />
                <Image
                  src={commentButton}
                  alt="Comment Button"
                  onClick={() => handleCommentButtonClick(story.id)} // Kirim ID cerita
                />
              </div>
            </div>
          </div>
        ))}
        {showPopUp && <UploadStory closePopup={closePopUp} />}
        {showCommentPopup && (
          <CommentPopup
            closePopup={closeCommentPopup}
            storyId={selectedStoryId} // Kirim ID cerita ke CommentPopup
            onSubmitComment={handleCommentSubmit}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
