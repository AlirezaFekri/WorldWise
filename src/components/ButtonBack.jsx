import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function ButtonBack() {
	const navigate = useNavigate();
	return (
		<button
			className={`${styles.btn} ${styles.back}`}
			onClick={() => navigate(-1)}>
			Go Back
		</button>
	);
}

export default ButtonBack;
