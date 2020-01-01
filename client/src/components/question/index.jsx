import React from 'react';
import ReactPlayer from 'react-player';

import { getQuestion } from '../../utils/apiRequests';

const getMusic = (id) => {
  console.log(id);
  return <ReactPlayer url={id} playing />;
};

export default class Question extends React.Component {
  constructor(props) {
    super();
    const { playlist } = props;
    this.state = { playlist, stage: 0 };
    getQuestion(playlist)
      .then((response) => {
        this.setState({
          question: response.data[Math.floor(Math.random() * response.data.length)],
        });
      });
  }

  render() {
    let answers;
    const { stage, playlist, question } = this.state;
    if (stage === 1) return <Question playlist={playlist} />;
    let q;
    if (question) {
      const { answer, incorrectAnswers } = question;
      const answerStrings = [
        <p className="text-success">{answer}</p>,
        ...incorrectAnswers.map((s) => <p className="text-danger">{s}</p>),
      ];

      answers = (
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <p className="text-success">{answerStrings[0]}</p>
            </div>
            <div className="col-sm">
              <p className="text-danger">{answerStrings[1]}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <p className="text-danger">{answerStrings[2]}</p>
            </div>
            <div className="col-sm">
              <p className="text-danger">{answerStrings[3]}</p>
            </div>
          </div>
        </div>
      );
      q = (
        <div>
          <h1>{question.message}</h1>
          <img src={question.imgUrl} className="image-container" alt="albumImage" />
          {answers}
          {getMusic(question.previewUrl)}
        </div>
      );
    }
    return (
      <div role="button" tabIndex={0} onKeyPress={() => { this.setState({ stage: this.state.stage += 1 }); }} onClick={() => { this.setState({ stage: this.state.stage += 1 }); }}>
        {q}
      </div>
    );
  }
}
