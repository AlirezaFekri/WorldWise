import React, { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

function PostProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();
		async function fetchData() {
			setError("");
			setIsLoading(true);
			try {
				const response = await fetch("http://localhost:8000/cities", {
					Signal: controller.signal,
				});
				if (!response.ok) throw new Error("Network Error");
				const data = await response.json();
				if (data.Response === "False") throw new Error("Video not Found!");
				setCities(data);
			} catch (err) {
				if (err.message !== "AbortController") {
					setError(err);
				}
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	return (
		<PostContext.Provider
			value={{
				cities,
				isLoading,
				error,
			}}>
			{children}
		</PostContext.Provider>
	);
}
function useCities() {
	const content = useContext(PostContext);
	if (content === undefined)
		throw new Error("You can use Postprovider outside of Postcontext!");

	return content;
}

export { PostProvider, useCities };
