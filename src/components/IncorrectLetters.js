// Component to display incorrect letters

function IncorrectLetters({ incorrectLetters }) {
  return (
    <div>
      {/* Show incorrect letters to user if there are any */}
      {incorrectLetters.length > 0 && (
        <p className="incorrect-title">INCORRECT LETTERS: </p>
      )}
      {incorrectLetters
        .map((letter, index) => (
          <span className="incorrect-letters" key={index}>
            {letter}
          </span>
        ))
        .reduce(
          (prev, current) => (prev === null ? [current] : [prev, " ", current]),
          null
        )}
    </div>
  );
}

export default IncorrectLetters;
