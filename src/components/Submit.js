import React from "react";

export default function Submit({ submitAnswer }) {
	return (
		<div className="submitBtn" onClick={submitAnswer}>
			Submit
		</div>
	);
}
