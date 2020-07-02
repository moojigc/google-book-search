import React, { useEffect } from "react";
import "./App.scss";
import Axios from "axios";

function App() {
	useEffect(() => {
		Axios.get("/api/books/" + "harry potter")
			.then((res) => console.log(res.data))
			.catch(console.error);
	});
	return <div>hello</div>;
}

export default App;
