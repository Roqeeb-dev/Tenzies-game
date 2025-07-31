import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

export default function App() {
  function generateRandomObj() {
    const objArray = [];
    for (let i = 0; i < 10; i++) {
      objArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return objArray;
  }

  const [generatedAllNewDice, setGeneratedAllNewDice] = useState(() =>
    generateRandomObj()
  );

  function hold(id) {
    setGeneratedAllNewDice((prevArr) => {
      return prevArr.map((diceObj) => {
        if (diceObj.id === id) {
          return { ...diceObj, isHeld: !diceObj.isHeld };
        } else {
          return diceObj;
        }
      });
    });
  }

  let gameWon =
    generatedAllNewDice.every((obj) => obj.isHeld) &&
    generatedAllNewDice.every(
      (obj) => obj.value === generatedAllNewDice[0].value
    );

  let rollBtnText = gameWon ? "New Game" : "Roll";

  const newGameRef = useRef(null);

  useEffect(() => {
    if (gameWon) {
      newGameRef.current.focus();
    }
  }, [gameWon]);

  function shuffleDice() {
    setGeneratedAllNewDice((prevArr) => {
      return prevArr.map((obj) => {
        if (obj.isHeld === false) {
          return { ...obj, value: Math.ceil(Math.random() * 6) };
        } else {
          return obj;
        }
      });
    });
    if (gameWon) {
      setGeneratedAllNewDice(generateRandomObj());
    }
  }

  const diceElements = generatedAllNewDice.map((object) => {
    return (
      <Die
        key={object.id}
        value={object.value}
        isHeld={object.isHeld}
        hold={() => {
          hold(object.id);
        }}
      />
    );
  });

  return (
    <>
      {gameWon && <ReactConfetti />}
      <main className="main">
        <div className="info">
          <h2>Tenzies</h2>
          <p>
            Roll until all dice are the same. Click each die to freeze at its
            current value to freeze it.
          </p>
        </div>
        <div className="dice-container">{diceElements}</div>
        <button ref={newGameRef} onClick={shuffleDice} className="roll-btn">
          {rollBtnText}
        </button>
      </main>
    </>
  );
}
