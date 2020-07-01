import React, { useState, useEffect } from "react";

//config
import config from "../config";

//components
import Question from "../components/Question";
import Code from "../components/Code";
import Options from "../components/Options";
import Submit from "../components/Submit";
import Error from "../components/Error";
import Answer from "../components/Answer";
import Axios from "axios";
import NextQuestion from "../components/NextQuestion";

export default function Home() {
	const [questionNumber, setQuestionNumber] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [showError, setShowError] = useState(false);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [showAnswer, setShowAnswer] = useState(false);

	let content = null;

	useEffect(() => {
		Axios.get(config.SERVER_URL + questionNumber).then((res) => {
			setData(res.data);
			setLoading(false);
		});
	}, [questionNumber]);

	function submitAnswer() {
		if (selectedOption != null) {
			setShowAnswer(true);
		} else {
			if (!showError) {
				setShowError(true);
				setTimeout(() => {
					setShowError(false);
				}, 4000);
			}
		}
	}

	function goToNextQuestion() {
		setShowAnswer(false);
		setSelectedOption(null);
		setQuestionNumber(questionNumber + 1);
	}

	if (loading) {
		content = <div>Loading...</div>;
	} else {
		content = (
			<div>
				<Question question="What is the output ?" />
				<Code code={data.code} />
				<Error visible={showError} />
				<Options
					setSelectedOption={setSelectedOption}
					selectedOption={selectedOption}
					options={data.options}
				/>
				<Submit submitAnswer={submitAnswer} />
				<Answer visible={showAnswer} answer={data.ans} />
				<NextQuestion goToNextQuestion={goToNextQuestion} />
			</div>
		);
	}
	return content;
}

/*  */
