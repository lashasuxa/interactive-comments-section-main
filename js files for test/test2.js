import data from "../data.json" assert { type: "json" };

console.log(data.currentUser);

//plus-minus buttons functionality
const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");
const nums = document.querySelectorAll(".number");

for (let i = 0; i < plusBtns.length; i++) {
  plusBtns[i].addEventListener("click", () => {
    let currentNumber = parseInt(nums[i].innerText);
    currentNumber++;
    nums[i].innerText = currentNumber;
  });
}

for (let i = 0; i < minusBtns.length; i++) {
  minusBtns[i].addEventListener("click", () => {
    let currentNumber = parseInt(nums[i].innerText);
    if (currentNumber > 0) {
      currentNumber--;
      nums[i].innerText = currentNumber;
    }
  });
}
//modal component
const delete_svg = document.querySelector(".delete_svg");

const modal = document.querySelector(".modal_container");
const backdrop = document.querySelector(".backdrop");

//edit function
const edit_svg = document.querySelector(".edit_svg");
const my_comment = document.querySelector("#my_comment");

edit_svg.addEventListener("click", () => {
  my_comment.contentEditable = true;
  my_comment.focus();
});
delete_svg.addEventListener("click", () => {
  modal.classList.add("modal_active");
  backdrop.style.display = "block";
});

const cancelBtn = document.querySelector(".cancel");
cancelBtn.addEventListener("click", () => {
  modal.classList.remove("modal_active");
  backdrop.style.display = "none";
});
const new_comment = document.querySelector("#new_comment");
const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", () => {
  new_comment.remove();
  modal.classList.remove("modal_active");
  backdrop.style.display = "none";
});

// send comment function

const sendBtn = document.querySelector(".send");
const add_comment = document.querySelector("#add_comment");
const myCommentsContainer = document.querySelector(".my_comments_container");

sendBtn.addEventListener("click", () => {
  if (add_comment.value == "") {
    return;
  }
  console.log(add_comment.value);
  const newDiv = document.createElement("div");
  newDiv.classList.add("card_container");
  newDiv.setAttribute("id", "new_comment");
  newDiv.innerHTML = `
      <div class="top">
    <img src=".${data.currentUser.image.png}" alt="avatar" />
    <span class="name">${data.currentUser.username}</span>
    <span class="you">you</span>
    <span class="time">now</span>
    </div>
    <p class="comment">
   ${add_comment.value}
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
      <span class="number">0</span>
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
      `;

  myCommentsContainer.appendChild(newDiv);
  add_comment.value = "";
});

//function create new comment container
const createCommentContainer = (comment) => {
  const container = document.createElement("div");
  container.classList.add("my_comment_container");
  container.innerHTML = commentTemplate(comment);
  return container;
};

const commentTemplate = (comment) => {
  return `
          
        <div class="base_comments_container">
        <div class="card_container">
          <div class="top">
            <img src="${comment.user.image.png}" alt="avatar" />
            <span class="name">${comment.user.username}</span>
            <span class="time">${comment.createdAt}</span>
          </div>
          <p class="comment">
          ${comment.content}
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
              <span class="number">${comment.score}</span>
              <button class="minus">
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF"
                  />
                </svg>
              </button>
            </div>
            <div class="reply_container">
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                  fill="#5357B6"
                />
              </svg>
              <span class="reply">Reply</span>
            </div>
          </div>
        </div>
      </div>
      


    
    `;
};
const myCommentTemplate = (currentUser) => {
  return `
          <div class="my_comments_container">
          <div class="card_container">
            <div class="top">
              <img src="${currentUser.image.png}" alt="avatar" />
              <span class="name">${currentUser.username}</span>
              <span class="time">${currentUser.createdAt}</span>
            </div>
            <p class="comment">${add_comment.value}</p>
            <div class="bottom">
              <div class="plus_minus">
                <button class="plus">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>

                </button>
                <span class="number">0</span>
                <button class="minus">
                 <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>

                </button>
              </div>
              <div class="edit_delete_container">
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>

                <span class="delete_svg">Delete</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>

                <span class="edit_svg">Edit</span>
              </div>
            </div>
          </div>
        </div>

    `;
};

const initComments = (data) => {
  const baseCommentsContainer = document.querySelector(
    ".base_comments_container"
  );

  data.comments.forEach((comment) => {
    if (comment.user.username === currentUser.username) {
      const myCommentContainer = document.createElement("div");
      myCommentContainer.classList.add("my_comment_container");
      myCommentContainer.innerHTML = myCommentTemplate(comment.user);
      myCommentsContainer.appendChild(myCommentContainer);
    } else {
      const commentContainer = createCommentContainer(comment);
      baseCommentsContainer.appendChild(commentContainer);
    }
  });
};
