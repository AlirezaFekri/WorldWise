import { useEffect } from "react";


function useTitle(pageName) {
    return useEffect(() => {
		document.title = `WorldWise | ${pageName}`;

		return () => (document.title = `WorldWise | Home`);
	}, []);
}

export default useTitle