import React from "react";

export default function Error({ visible }) {
	let styleClass = "error";

	if (!visible) styleClass = "error-hidden";

	return <div className={styleClass}>Please select an option !</div>;
}
