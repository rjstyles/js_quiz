import React from "react";

export default function Option({ id, option, selectOption, styleClass }) {
	return (
		<div
			className={styleClass}
			onClick={() => {
				console.log(id);
				selectOption(id);
			}}
		>
			{option}
		</div>
	);
}
