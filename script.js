fetch("./data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let imgUrl = data.currentUser.image.png;
    console.log(imgUrl);
    console.log(data.currentUser.image.png);
    // use the JSON data here
  });

//plus-minus buttons functionality
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const num = document.querySelector(".number");

plusBtn.addEventListener("click", () => {
  let currentNumber = parseInt(num.innerText); // აქ რა სხვაობა იქნება innerHTML ს და ამას შორის
  currentNumber++;
  num.innerText = currentNumber;
});

minusBtn.addEventListener("click", () => {
  let currentNumber = parseInt(num.innerText);
  if (currentNumber > 0) {
    currentNumber--;
    num.innerText = currentNumber;
  }
});

//function create new comment container
createNewContainer = () => {
  console.log("something");
};

createNewContainer();
