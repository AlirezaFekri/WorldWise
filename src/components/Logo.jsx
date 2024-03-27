import styles from "./Logo.module.css";
import logo from "./../assets/img/logo.png"

function Logo() {
  return <img src={logo} alt="WorldWise logo" className={styles.logo} />;
}

export default Logo;
