import React from 'react';
import '../../App.scss';

export const Rules = ({ isRuleActive, isRule }) => {
  return (
    <div>
      {isRuleActive && (
        <div className="rulesWindow">
          <p className="rules">
            <h4>Game Rules:</h4>
            Objective A secret combination of 4 colors is selected and you have to guess that
            combination in 10 or fewer tries to win.
            <h4>How to play:</h4> From top to bottom, at each row, pick a color and click on a
            circle. After filling all circles in a row, you can check your guess. A green circle
            means the color and the position is correct. A black circle means that the color exists
            in the combination but the position is not correct. An empty circle means that color is
            not in the combination at all.
          </p>
          <button className="closeBtn" onClick={isRule}>
            x
          </button>
        </div>
      )}
    </div>
  );
};
