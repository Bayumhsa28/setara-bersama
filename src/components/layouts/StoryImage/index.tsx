import { useState, useEffect } from 'react';
import styles from './Home.module.css'; // Pastikan untuk mengimpor gaya yang benar

// Komponen untuk menampilkan gambar dengan ukuran asli
const StoryImage = ({ src }: { src: string }) => {
  const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const img = new window.Image(); // Menggunakan window.Image untuk menghindari konflik dengan Next.js Image
    img.src = src;

    img.onload = () => {
      setImgDimensions({ width: img.width, height: img.height });
    };
  }, [src]);

  return (
    <>
      {imgDimensions && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Story Photo"
          className={styles.profileImage}
          width={imgDimensions.width} // Menggunakan lebar dinamis
          height={imgDimensions.height} // Menggunakan tinggi dinamis
        />
      )}
    </>
  );
};

export default StoryImage;
