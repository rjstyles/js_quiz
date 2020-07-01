import React from "react";
import "./App.css";

//components
import Header from "./components/Header";

//views
import Home from "./views/Home";

function App() {
	return (
		<div className="App">
			<Header />
			<Home />
		</div>
	);
}

export default App;
