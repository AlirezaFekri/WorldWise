import useTitle from "../hooks/useTitle";

export default function PageNotFound() {
	useTitle("Page Not Found!!!");
	return (
		<div>
			<h1>Page not found 😢</h1>
		</div>
	);
}
