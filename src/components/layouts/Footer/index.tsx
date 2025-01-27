import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} MyWebsite. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
