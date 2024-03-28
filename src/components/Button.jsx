import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function Button({ children, handleClick, type }) {
	return (
		<button className={`${styles.btn} ${styles[type]}`} onClick={handleClick}>
			{children}
		</button>
	);
}

export default Button;
