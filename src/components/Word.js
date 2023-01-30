// Show word to be gueessed

function Word({ chosenWord, correctLetters }) {
  return (
    <div className="word">
      {chosenWord.split("").map((letter, index) => {
        return (
          // Show letter if correctly guessed, otherwise show dashes
          <span className="letter" key={index}>
            {correctLetters.includes(letter) ? letter : "_"}
          </span>
        );
      })}
    </div>
  );
}

export default Word;
