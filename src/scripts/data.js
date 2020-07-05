const axios = require("axios");

module.exports.getData = async () => {
	const rawData = await getRawDataFromGithub();
	const jsonData = processRawData(rawData);
	return jsonData;
};

const getJsonFromRaw = (raw) => {
	let id,
		ques,
		options,
		code,
		ans,
		status = "NOT OK";
	try {
		//get question

		if (raw.search("```") !== -1) {
			let [quesRaw, codeRaw, restOfTheText] = raw.split("```");

			// ques number
			[id, ques] = quesRaw
				.substring(quesRaw.search("###### ") + 7)
				.split(". ")
				.map((str) => str.trim());
			id = Number.parseInt(id);

			//code
			code = codeRaw.substr(11);

			let [optionsRaw, ansRaw] = restOfTheText.split(
				"<details><summary><b>Answer</b></summary>"
			);

			//options
			options = parseOptions(
				optionsRaw.substring(2, optionsRaw.length - 1)
			);

			//ans
			ans = ansRaw.trim().split("\n</details>")[0];
			status = "OK";
		} else {
		}
	} catch (err) {
		// handle other scenarios
	}
	return { status, id, ques, options, code, ans };
};

const parseOptions = (optionsString) => {
	let options = optionsString.split("\n").map((op) => {
		return op.substr(5).split("`").join("");
	});
	options.pop();
	return options;
};

const processRawData = (rawData) => {
	if (!rawData) return [];
	let arr = rawData.split("---");
	arr.splice(0, 3);
	return arr.map((raw) => {
		return getJsonFromRaw(raw);
	});
};

const getRawDataFromGithub = async () => {
	try {
		const res = await axios.get(
			"https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/en-EN/README.md"
		);
		return res.data;
	} catch (err) {
		return null;
	}
};
