import './App.scss';
import { useState, createContext } from 'react';
import SecretColors from './Components/SecretColors/SecretColors';
import { Rules } from './Components/Rules/Rules';
import { ColorBoard } from './Components/ColorBoard/ColorBoard';

export const RandomContext = createContext();

function App() {
  //rows id array
  var rows = [];
  for (var i = 1; i <= 40; i++) {
    rows.push(i);
  }

  const colors = [
    { id: 'red', rgb: 'rgb(255, 0, 0)' },
    { id: 'blue', rgb: 'rgb(0, 0, 255)' },
    { id: 'yellow', rgb: 'rgb(255, 255, 0)' },
    { id: 'white', rgb: 'rgb(255, 255, 255)' },
    { id: 'green', rgb: 'rgb(0, 128, 0)' },
    { id: 'brown', rgb: 'rgb(165, 42, 42)' },
    { id: 'purple', rgb: 'rgb(128, 0, 128)' },
    { id: 'black', rgb: 'rgb(0, 0, 0)' },
  ];

  //current color state
  const [currentColor, setCurrentColor] = useState({ id: 'red', rgb: 'rgb(255, 0, 0)' });
  const [currentBoardCells, setCurrentBoardCells] = useState([1, 2, 3, 4]);
  const [currentRow, setCurrentRow] = useState(2);
  const [hasWon, setHasWon] = useState(false);
  const [isRuleActive, setIsRuleActive] = useState(false);
  const [randomColor, setRandomColor] = useState();
  const [gameOver, setGameOver] = useState(false);

  //handle and set the current color
  const handleColor = (event) => {
    setCurrentColor({ id: event.currentTarget.id });
  };

  //if valid change the color of row cell
  const clickHandler = (i) => {
    if (isValid(i)) {
      document.getElementById(i).style.backgroundColor = currentColor.id;
    }
  };

  //control rows
  const nextRow = () => {
    const MULT = 4;
    setCurrentRow(currentRow + 1);
    setCurrentBoardCells([
      currentRow * MULT - 3,
      currentRow * MULT - 2,
      currentRow * MULT - 1,
      currentRow * MULT - 0,
    ]);
  };

  //validation for the next step
  const isValid = (id) => {
    if (currentBoardCells.includes(id) && hasWon === false) {
      return true;
    }
    return false;
  };

  //checkup pegs and isWin
  const checkPegsAndWon = () => {
    for (var o = 0; o < 4; o++) {
      var curColorsArr = [];
      var finalColor = randomColor[o];
      var currentCellId = currentBoardCells[o];
      var getCurrComponent = document.getElementById(currentBoardCells[o]); //got the current obj
      var currentCellColor =
        getComputedStyle(getCurrComponent).getPropertyValue('background-color');

      //if the color is exists
      if (randomColor.includes(currentCellColor)) {
        document.getElementById(`pegsCell${currentCellId}`).style.backgroundColor = 'black';
      }
      //if the color and position right
      if (finalColor === currentCellColor) {
        document.getElementById(`pegsCell${currentCellId}`).style.backgroundColor = 'white';
      }
    }

    //create current pegs color array
    currentBoardCells.map((id) => {
      var getPegsComponent = document.getElementById(`pegsCell${id}`);
      var currentPegsColor =
        getComputedStyle(getPegsComponent).getPropertyValue('background-color');
      curColorsArr.push(currentPegsColor);
    });

    //checking the win
    const isWon = (obj) => {
      if (obj === 'rgb(255, 255, 255)') {
        return true;
      } else {
        return false;
      }
    };
    //show the final colors
    const showFinalColors = () => {
      randomColor.map((color, i) => {
        document.getElementById(`final${i}`).style.backgroundColor = color;
      });
    };
    //if every peg is white - WIN
    if (curColorsArr.every(isWon)) {
      alert('You win!');
      showFinalColors();
      setHasWon(true);
    } else if (currentRow === 11 && hasWon === false) {
      //lose
      alert('You lose!');
      showFinalColors();
    }
  };

  //checked button click handler
  const isChecked = () => {
    //is empty check
    var notCheckedColors = [];
    for (var o = 0; o < 4; o++) {
      var getCurrComponent = document.getElementById(currentBoardCells[o]); //got the current obj
      var currentCellColor =
        getComputedStyle(getCurrComponent).getPropertyValue('background-color');
      notCheckedColors.push(currentCellColor);
    }

    //if not empty -> next steps
    if (notCheckedColors.length === 4 && notCheckedColors.includes('rgb(245, 245, 220)')) {
      alert('Some cell(s) is(are) empty!');
    } else {
      nextRow(); //got the next row
      checkPegsAndWon(); //checkup pegs and isWin
    }
  };
  //Enable/disable rules
  const isRule = () => {
    setIsRuleActive(!isRuleActive);
  };

  //restart the game
  const restart = () => {
    if (window.confirm('Do you realy want to restart the game?')) {
      //set default values
      setCurrentBoardCells([1, 2, 3, 4]);
      setCurrentRow(2);
      setHasWon(false);
      setGameOver(!gameOver);

      //clear all cells
      rows.map((id) => {
        document.getElementById(`pegsCell${id}`).style.backgroundColor = 'beige';
        document.getElementById(id).style.backgroundColor = 'beige';
      });

      //clear the final colors
      randomColor.map((color, i) => {
        document.getElementById(`final${i}`).style.backgroundColor = 'black';
      });
    }
  };

  //got the radom colors
  const RandomColor = (random) => {
    setRandomColor(
      random.map((id) => {
        return id.rgb;
      }),
    );
  };

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
            return <button key={i} id={`pegsCell${i}`} className={`pegsCell${i}`}></button>;
          })}
        </div>
      </div>
      <div className="finalColors">
        {randomColor &&
          randomColor.map((color, i) => {
            return <button key={i} id={`final${i}`}></button>;
          })}
      </div>
      <div className="other">
        <div className="secretColor">
          <SecretColors setRandomColor={RandomColor} gameOver={gameOver} colors={colors} />
        </div>

        <ColorBoard colors={colors} handleColor={handleColor} />
        <div className="currentColor" style={{ backgroundColor: currentColor.id }}></div>
        {/* after lose disable check btn*/}
        <button
          onClick={isChecked}
          className="check"
          disabled={(currentRow > 11 || hasWon) && 'disabled'}>
          Check
        </button>
        <button onClick={isRule} className="check">
          Rules
        </button>
        <button onClick={restart} className="check">
          Restart
        </button>
      </div>
      <Rules isRuleActive={isRuleActive} isRule={isRule} />
    </div>
  );
}

export default App;
