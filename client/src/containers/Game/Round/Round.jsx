import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Choices, isValidChoices } from '../../../components/answers/Choices';
import { isValidAlphabet, Alphabet } from '../../../components/answers/Alphabet';
import Record from '../../../elements/Record';
import { getQuestion } from '../../../utils/apiRequests';

import {
  Question as CQuestion, SpanContainer, QuestionWrapper, RecordContainer, AnswersWrapper,
} from './Round.module.scss';

const getAnswerForm = (isRevealed, answer, incorrectAnswers) => {
  if (isValidAlphabet({ isRevealed, answer, incorrectAnswers })) {
    return <Alphabet isRevealed={isRevealed} answer={answer} incorrectAnswers={incorrectAnswers} />;
  }
  if (isValidChoices({ isRevealed, answer, incorrectAnswers })) {
    return <Choices isRevealed={isRevealed} answer={answer} incorrectAnswers={incorrectAnswers} />;
  }
  return null;
};

const Question = ({ track, shiftQuestion, setUrl }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [questionText, setQuestionText] = useState();
  const [recordImage, setRecordImage] = useState();
  const [answer, setAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    if (track) {
      getQuestion(track).then(({ data }) => {
        setQuestionText(data.message);
        setAnswer(data.answer);
        setIncorrectAnswers(data.incorrectAnswers);
        setRecordImage(data.imgUrl);
        setUrl(data.previewUrl);
        setIsRevealed(false);
      });
    }
  }, [track, setUrl]);


  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setTimeout(() => shiftQuestion(), 2000);
    }
  };

  if (!questionText) return null;

  return (
    <div className={CQuestion} onClick={handleClick} onKeyPress={handleClick} role="button" tabIndex={0}>
      <div className={QuestionWrapper}>
        <h1>{questionText}</h1>
      </div>
      <div className={SpanContainer}>
        <div className={RecordContainer}>
          <Record url={recordImage} />
        </div>
      </div>
      <div className={AnswersWrapper}>
        {getAnswerForm(isRevealed, answer, incorrectAnswers)}
      </div>
    </div>
  );
};

export default Question;

Question.propTypes = {
  track: PropTypes.shape({
    album: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    artists: PropTypes.array.isRequired,
    preview_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  shiftQuestion: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
};
