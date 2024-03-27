import { useEffect } from "react";


function useTitle(pageName) {
    return useEffect(() => {
		document.title = `World Wise | ${pageName}`;

		return () => (document.title = `World Wise | Home`);
	}, []);
}

export default useTitle