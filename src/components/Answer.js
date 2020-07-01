import React from "react";
import marked from "marked";

export default function Answer({ answer, visible }) {
	const styleClass = visible ? "answer" : "answer-hidden";
	return (
		<div
			className={styleClass}
			dangerouslySetInnerHTML={{
				__html: marked(answer),
			}}
		></div>
	);
}
