import React from 'react';
import ReactPlayer from 'react-player';

import { getQuestion } from '../../utils/apiRequests';

const getMusic = (id) => {
  return <ReactPlayer url={id} playing />;
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
  options;
  render() {
    const {
      stage, question, tracks,
    } = this.state;
    if (stage === 2) return <Question tracks={tracks.slice(1, tracks.length)} />;

    let q;
    if (question && tracks.length) {
      const { answer, incorrectAnswers } = question;
      
      if (!this.options) {
        this.options = shuffle([
          { hidden:  <p>{answer}</p>, revealed:  <p className="text-success">{answer}</p>},
          ...incorrectAnswers.map(option =>( { hidden:  <p>{option}</p>, revealed:  <p className="text-danger">{option}</p>})),
        ]);
      }

      const answers = (
        <div className="container">
          <div className="row">
            <div className="col-sm">
              {stage === 0 ?this.options[0].hidden : this.options[0].revealed}
            </div>
            <div className="col-sm">
              {stage === 0 ? this.options[1].hidden : this.options[1].revealed}
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              {stage === 0 ? this.options[2].hidden : this.options[2].revealed}
            </div>
            <div className="col-sm">
              {stage === 0 ? this.options[3].hidden : this.options[3].revealed}
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
