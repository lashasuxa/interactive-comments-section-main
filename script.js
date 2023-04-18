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
//modal component
const delete_svg = document.querySelector(".delete_svg");
const modal = document.querySelector(".modal_container");
const backdrop = document.querySelector(".backdrop");

delete_svg.addEventListener("click", () => {
  modal.classList.add("modal_active");
  backdrop.style.display = "block";
});

const cancelBtn = document.querySelector(".cancel");
cancelBtn.addEventListener("click", () => {
  modal.classList.remove("modal_active");
  backdrop.style.display = "none";
});
//creating new comments function
const commentTemplate = (comment) => {
  return;
  `
  <div class="my_comments_container">
  <div class="card_container">
    <div class="top">
      <img src="./images/avatars/image-juliusomo.png" alt="avatar" />
      <span class="name">juliusomo</span>
      <!-- <span class="you"> აქ შეიძლება დაიწეროს you თუ კომენტარის ავტორი ხარ შენ </span> -->
      <span class="time">2 days ago</span>
    </div>
    <p class="comment">
      @ramsesmiron I couldn’t agree more with this. Everything moves so
      fast and it always seems like everyone knows the newest
      library/framework. But the fundamentals are what stay constant.
    </p>
    <div class="bottom">
      <div class="plus_minus">
        <button class="plus">
          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="#C5C6EF"
            />
          </svg>
        </button>
        <span class="number">2</span>
        <button class="minus">
          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="#C5C6EF"
            />
          </svg>
        </button>
      </div>
      <div class="edit_delete_container">
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
            fill="#ED6368"
          />
        </svg>
        <span class="delete_svg">Delete</span>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
            fill="#5357B6"
          />
        </svg>
        <span class="edit_svg">Edit</span>
      </div>
    </div>
  </div>
</div>
  
  
  `;
};

//function create new comment container
const createNewContainer = (commentData) => {
  console.log("something");
};

const deleteContainer = (containerId) => {};

const editContainer = (containerId) => {};
