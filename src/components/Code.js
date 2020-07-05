import React from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai.css";

export default function Code({ code }) {
	hljs.registerLanguage("javascript", javascript);
	return (
		<div className="code-div">
			<pre
				className="code"
				dangerouslySetInnerHTML={{
					__html: hljs.highlight("javascript", code).value,
				}}
			></pre>
		</div>
	);
}
