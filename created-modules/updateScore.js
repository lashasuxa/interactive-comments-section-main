const updateScore = (event, increment) => {
  const numberSpan = event.target
    .closest(".plus_minus")
    .querySelector(".number");
  const currentScore = parseInt(numberSpan.textContent, 10);
  const newScore = increment ? currentScore + 1 : currentScore - 1;
  numberSpan.textContent = newScore;
};

const updateScore = (event, increment) => {
  const numberSpan = element.score;
  const currentScore = parseInt(numberSpan.textContent, 10);
  const newScore = increment ? currentScore + 1 : currentScore - 1;
  numberSpan.textContent = newScore;
};
