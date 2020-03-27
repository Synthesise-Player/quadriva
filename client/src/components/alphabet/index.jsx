import React, { useState } from 'react';
import { useEffect } from 'react';
import './index.css';

function chunkArray(array, chunkSize){
  const chunks = [];
  
  for (let index = 0; index < array.length; index += chunkSize) {
    const chunk = array.slice(index, index+chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

const getAnswer = answer => {
  const suffix = answer
    .toLowerCase()
    .replace(/(?:(the|a|an) +)/g, '')
    .trim();
  return suffix.charAt(0)
}

export const isValidAlphabet = ({ answer }) => !!`${answer}`.replace(/(?:(the|an) +)/gi, '').match(/[a-z]/i);

export const Alphabet = ({ answer, isRevealed, textColour }) => {
  const [alphabet, setAlphabet] = useState([]);

  useEffect(() => {
    let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'uv', 'w', 'x', 'yz'];
    chars = chars.map(value => ({
      value,
      hidden: <p style={{ color: textColour }}>{value}</p>,
      revealed: <p className="text-danger">{value}</p>,
    }));

    const correctChar = getAnswer(answer);

    const answerIndex = chars.findIndex(c => c.value.includes(correctChar));
    console.log('correctChar', correctChar);
    
    chars[answerIndex].revealed = <p className="text-success">{chars[answerIndex].value}</p>;
    setAlphabet(chars);
  }, [answer, textColour]);


  const rows = chunkArray(alphabet, 4).map(row => (
    <div className="row">
      {row.map(option => <div className="col-3">{isRevealed ? option.revealed : option.hidden}</div>)}
    </div>
  ));
  
  return (
    <div className="container">
      {rows}
      {isRevealed ? <p className="text-success">{answer}</p> : <p style={{ color: textColour }}>?</p>}
    </div>
  );
};
