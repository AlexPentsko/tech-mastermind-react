import './App.scss';
import { useEffect, useState } from 'react';
import SecretColors from './Components/SecretColors/SecretColors';

function App() {
  const rows = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  const colors = ['red', 'blue', 'yellow', 'white', 'green', 'brown', 'purple', 'black'];

  const [currentColor, setCurrentColor] = useState('red');

  const handleColor = (event) => {
    setCurrentColor(event.currentTarget.id);
  };

  const clickHandler = (i) => {
    if (isValid(i)) {
      document.getElementById(i).style.backgroundColor = currentColor;
    }
  };

  var currentBoardCells = [1, 2, 3, 4];
  var currentPegCells = [];
  const hasWon = false;
  var currentRow = 1;

  const f = () => {
    const MULT = 4;

    currentRow += 1;

    console.log(currentRow);

    currentBoardCells = [
      currentRow * MULT - 3,
      currentRow * MULT - 2,
      currentRow * MULT - 1,
      currentRow * MULT - 0,
    ];

    currentPegCells = [
      currentRow * MULT - 4,
      currentRow * MULT - 3,
      currentRow * MULT - 2,
      currentRow * MULT - 1,
    ];
    console.log(currentBoardCells);
  };
  const isValid = (id) => {
    if (currentBoardCells.includes(id) && hasWon === false) {
      return true;
    }
    return false;
  };

  const isChecked = () => {
    f();
  };

  const compare = () => {};

  return (
    <div className="container">
      <div className="table">
        <div className="board">
          {rows.map((i) => {
            return (
              <button
                key={i}
                id={i}
                className={`rowsCell${i}`}
                onClick={() => clickHandler(i)}></button>
            );
          })}
        </div>
        <div className="pegs">
          {rows.map((i) => {
            return <button key={i} className={`pegsCell-${i}`}></button>;
          })}
        </div>
      </div>
      <div className="other">
        <div className="code">
          <SecretColors />
          <div className="secretColor" id="secretColor1"></div>
          <div className="secretColor" id="secretColor2"></div>
          <div className="secretColor" id="secretColor3"></div>
          <div className="secretColor" id="secretColor4"></div>
        </div>

        <div className="colorBoard">
          {colors.map((colorId) => {
            return (
              <button key={colorId} className="color" id={colorId} onClick={handleColor}></button>
            );
          })}
        </div>
        <div className="currentColor" style={{ backgroundColor: currentColor }}></div>
        <button onClick={isChecked} className="check">
          Check
        </button>
      </div>
    </div>
  );
}

export default App;
