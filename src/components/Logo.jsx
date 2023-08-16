import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <div className={styles.parent}>
        <img src="/icon.png" alt="WorldWise logo" className={styles.logo} />
        <span>CityMemory</span>
      </div>
    </Link>
  );
}

export default Logo;
