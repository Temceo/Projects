// Image of hangman to display body parts

function HangmanImage({ incorrectLetters }) {
  let numOfGuesses = incorrectLetters.length;
  return (
    <svg height="250" width="200" className="hangman-container">
      {/* <!-- HANGING POLE --> */}
      {/* <!-- Horizontal pole --> */}
      <line x1="60" y1="20" x2="150" y2="20" />
      {/* <!-- Vertical pole - to hold the head --> */}
      <line x1="150" y1="20" x2="150" y2="50" />
      {/* <!-- Vertical pole - main stem --> */}
      <line x1="60" y1="20" x2="60" y2="230" />
      {/* <!-- Base of vertical pole --> */}
      <line x1="20" y1="230" x2="100" y2="230" />

      {/* FIGURE PARTS SHOWN BASED ON NUMBER OF INCORRECT GUESSES */}
      {/* <!-- BODY --> */}
      {/* <!-- Head --> */}
      {numOfGuesses > 0 && <circle cx="150" cy="70" r="20" />}
      {/* <!-- Torso --> */}
      {numOfGuesses > 1 && <line x1="150" y1="90" x2="150" y2="150" />}
      {/* <!-- Left arm --> */}
      {numOfGuesses > 2 && <line x1="150" y1="110" x2="120" y2="140" />}
      {/* <!-- Right arm --> */}
      {numOfGuesses > 3 && <line x1="150" y1="110" x2="178" y2="140" />}
      {/* <!-- Left leg --> */}
      {numOfGuesses > 4 && <line x1="150" y1="150" x2="120" y2="180" />}
      {/* <!-- Right leg --> */}
      {numOfGuesses > 5 && <line x1="150" y1="150" x2="178" y2="180" />}
    </svg>
  );
}

export default HangmanImage;
