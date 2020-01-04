import React from 'react';
import ReactPlayer from 'react-player';

import { getQuestion } from '../../utils/apiRequests';

const getMusic = (id) => {
  return <ReactPlayer url={id} playing />;
};

export default class Question extends React.Component {
  constructor(props) {
    super();
    const { tracks } = props;
    this.state = { stage: 0 };
    if (tracks.length) {
      getQuestion(tracks[0])
      .then((response) => {
        this.setState({
          question: response.data,
          tracks,
        });
      });
    }
  }

  render() {
    const {
      stage, question, tracks,
    } = this.state;
    if (stage === 1) return <Question tracks={tracks.slice(1, tracks.length)} />;

    let q;
    if (question && tracks.length) {
      const { answer, incorrectAnswers } = question;
      const answerStrings = [
        <p className="text-success">{answer}</p>,
        ...incorrectAnswers.map((s) => <p className="text-danger">{s}</p>),
      ];

      const answers = (
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
      <div
        role="button"
        tabIndex={0}
        onKeyPress={() => { this.setState({ stage: this.state.stage += 1 }); }}
        onClick={() => { this.setState({ stage: this.state.stage += 1 }); }}
      >
        {q}
      </div>
    );
  }
}
