import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";

function ProtectedRout({ children }) {
	const { status } = useAuth();
	const navigate = useNavigate();
	const condition = status === "notLogin";
	useEffect(() => {
		if (condition) navigate("/");
	},[condition, navigate]);
	return condition ? null : children;
}

export default ProtectedRout;
