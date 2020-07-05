import React, { useState, useEffect } from "react";

//scripts
import api from "../scripts/data";

//components
import Question from "../components/Question";
import Code from "../components/Code";
import Options from "../components/Options";
import Submit from "../components/Submit";
import Error from "../components/Error";
import Answer from "../components/Answer";
import NextQuestion from "../components/NextQuestion";

export default function Home() {
	const [questionNumber, setQuestionNumber] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [showError, setShowError] = useState(false);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showAnswer, setShowAnswer] = useState(false);

	let content = null;

	useEffect(() => {
		async function foo() {
			const quizData = await api.getData();
			setData(quizData);
			setLoading(false);
		}
		foo();
	}, []);

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
		content = <div className="Loading">Loading...</div>;
	} else {
		content = (
			<div className="content">
				<Question question="What is the output ?" />
				<Code code={data[questionNumber].code} />
				<Error visible={showError} />
				<Options
					setSelectedOption={setSelectedOption}
					selectedOption={selectedOption}
					options={data[questionNumber].options}
				/>
				<Submit submitAnswer={submitAnswer} />
				<Answer
					visible={showAnswer}
					answer={data[questionNumber].ans}
				/>
				<NextQuestion goToNextQuestion={goToNextQuestion} />
			</div>
		);
	}
	return content;
}

/*  */
