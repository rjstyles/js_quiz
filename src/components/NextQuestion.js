import React from "react";

export default function NextQuestion({ currentQuestion, goToNextQuestion }) {
	return (
		<div
			className="nextBtn"
			onClick={() => goToNextQuestion(currentQuestion + 1)}
		>
			Next
		</div>
	);
}
