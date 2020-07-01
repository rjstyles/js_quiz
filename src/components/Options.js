import React from "react";

import Option from "./Option";

export default function Options({
	options,
	selectedOption,
	setSelectedOption,
}) {
	let styleClass = "option";

	function selectOption(optionId) {
		if (optionId !== selectedOption) {
			setSelectedOption(optionId);
		} else {
			setSelectedOption(null);
		}
	}

	return (
		<div>
			{options.map((option, id) => {
				if (selectedOption != null && id === selectedOption)
					styleClass = "option-selected";
				else styleClass = "option";

				return (
					<Option
						key={id}
						id={id}
						styleClass={styleClass}
						selectOption={selectOption}
						option={option}
					/>
				);
			})}
		</div>
	);
}
