// Header component
function Header({ incorrectLetters }) {
  // Show user number of remaining chances
  const MAX_CHANCES = 6;
  const incorrectGuesses = incorrectLetters.length;
  const incorrectCount = MAX_CHANCES - incorrectGuesses;
  // Rules shown to user on click of button
  const handleClick = () => {
    alert(
      `HANGMAN RULES\n1. Dashes represent letters in a word\n2. Guess a letter a time\n3. A correct guess reveals the hidden letter\n4. An incorrect guess reveals a body part on the gallow\n5. 6 incorrect guesses will result in you being hanged!`
    );
  };
  return (
    <div className="header">
      <h1>Let's play hangman</h1>
      <button onClick={handleClick}>Hangman rules</button>
      {/* Message to user on remaining chances */}
      {incorrectCount > 0 && <p>REMAINING LIVES: {incorrectCount} </p>}
    </div>
  );
}

export default Header;
