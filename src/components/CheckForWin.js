// Check for win
import React, { useEffect } from "react";
function CheckForWin({
  correctLetters,
  incorrectLetters,
  chosenWord,
  setInPlay,
  playAgain,
}) {
  let winMessage = "";
  let inPlay = true;
  // Check chosen word against correct letters to confirm if user has correctly guessed all letters to confirm win
  const isWinner = chosenWord
    .split("")
    .every((letter) => correctLetters.includes(letter));

  // Check if user has reached 6 incorrect guesses to confirm loss
  const isLoser = incorrectLetters.length === 6;

  // Print message according to whether use has won or lost
  if (isWinner) {
    winMessage = `Congratulations, you won!`;
    inPlay = false;
  }

  if (isLoser) {
    winMessage = `Sorry, you lost. The correct word is: ${chosenWord}`;
    inPlay = false;
  }

  useEffect(() => setInPlay(inPlay));
  return (
    <div
      // To display win message, change win message css to display flex (from display: none)
      className="win-container"
      style={winMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="win-message">
        <p>{winMessage}</p>
        <button onClick={playAgain}>Play again</button>
      </div>
    </div>
  );
}

export default CheckForWin;
