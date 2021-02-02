import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuestionWidget from '../../components/QuestionWidget';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizScreen({ db }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  const handleSubmitQuiz = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  const addResult = (answer) => {
    setResults([
      ...results,
      answer,
    ]);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <Widget.Loading />}

        {screenState === screenStates.RESULT && <Widget.Result results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
QuizScreen.propTypes = {
  db: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        answer: PropTypes.number.isRequired,
        alternatives: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }).isRequired,
    ).isRequired,
    external: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    theme: PropTypes.shape({
      colors: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
        mainBg: PropTypes.string.isRequired,
        contrastText: PropTypes.string.isRequired,
        wrong: PropTypes.string.isRequired,
        success: PropTypes.string.isRequired,
      }),
    }),
    borderRadius: PropTypes.string.isRequired,
  }).isRequired,
};
