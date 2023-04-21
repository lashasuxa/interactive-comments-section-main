import data from "./data.json" assert { type: "json" };
console.log(data.currentUser.image.png);
const base_comments_container = document.querySelector(
  ".base_comments_container"
);
const textArea = document.querySelector("textarea");

//create elements functions
const createDomElement = (tag, className, src, textContent) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  elem.src = src;
  elem.textContent = textContent;
  return elem;
};

const createImgElement = (tag, className, src, alt) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  elem.src = src;
  elem.alt = alt;
  return elem;
};

const createButtonElement = (
  tag,
  className,
  src,
  textContent,
  event,
  listener
) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  elem.src = src;
  elem.textContent = textContent;
  if (event && listener) {
    elem.addEventListener(event, listener);
  }
  return elem;
};

const createCommentCard = (element, isReply, currentUsername) => {
  // Helper functions
  const createDomElement = (tag, className, src, textContent) => {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    elem.src = src;
    elem.textContent = textContent;
    return elem;
  };

  const createImgElement = (tag, className, src, alt) => {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    elem.src = src;
    elem.alt = alt;
    return elem;
  };

  // Create card_container
  const card_container = createDomElement("div", "card_container");

  // Create top
  const top = createDomElement("div", "top");
  const avatar = createDomElement(
    "img",
    null,
    element.user.image.png,
    "avatar"
  );
  const name = createDomElement("span", "name", null, element.user.username);

  const time = createDomElement("span", "time", null, element.createdAt);
  top.append(avatar, name, time);

  // Create comment
  const comment = createDomElement("p", "comment", null, "");

  if (isReply) {
    const mention = createDomElement(
      "span",
      "mention",
      null,
      element.replyingTo
    );
    comment.appendChild(mention);
  }

  const commentText = document.createTextNode(element.content);
  comment.appendChild(commentText);

  // Create bottom
  const bottom = createDomElement("div", "bottom");

  // Create plus_minus
  const plusMinus = createDomElement("div", "plus_minus");
  const plusButton = createDomElement("button", "plus");
  const plusImg = createImgElement(
    "img",
    "svg_plus",
    "./images/icon-plus.svg",
    ""
  );
  const numberSpan = createDomElement("span", "number", null, element.score);
  const minusButton = createDomElement("button", "minus");
  const minusImg = createImgElement(
    "img",
    "svg_minus",
    "./images/icon-minus.svg",
    ""
  );

  plusButton.appendChild(plusImg);
  minusButton.appendChild(minusImg);
  plusMinus.append(plusButton, numberSpan, minusButton);

  //in case if current user is username it will create span with name you and edit/delete buttons
  if (element.user.username === data.currentUser.username) {
    const you = createDomElement("span", "you", null, "you");
    name.append(you);
    const editDeleteContainer = createDomElement(
      "div",
      "edit_delete_container"
    );
    const deleteImg = createImgElement(
      "img",
      "svg_delete",
      "./images/icon-delete.svg",
      ""
    );
    const deleteText = createDomElement("span", "delete_svg", null, "Delete");
    const editImg = createImgElement(
      "img",
      "svg_edit",
      "./images/icon-edit.svg",
      ""
    );
    const editText = createDomElement("span", "edit_text", null, "Edit");

    editDeleteContainer.append(deleteImg, deleteText, editImg, editText);
    bottom.append(plusMinus, editDeleteContainer);
  } //in case if current user != username then it creates container with reply button
  else {
    const replyButtonListener = (event) => {
      // we don't need event here as param
      const username = element.user.username;
      textArea.focus();
      textArea.innerText = `@${username} `;
      console.log("Clicked reply on:", username);
      console.log(textArea.value);
    };

    const replyContainer = document.createElement("div");
    replyContainer.classList.add("reply_container");

    // Create the reply button with the listener
    const replyButton = createDomElement("button", "reply_button");
    // on click of reply textarea activates and innerText is getting username
    replyButton.addEventListener("click", replyButtonListener);

    const replyImg = createImgElement(
      "img",
      "svg_reply",
      "./images/icon-reply.svg",
      "Reply image"
    );
    replyButton.appendChild(replyImg);

    const replySpan = createDomElement("span", "reply", null, "Reply");

    replyButton.appendChild(replySpan);
    replyContainer.appendChild(replyButton);
    bottom.append(plusMinus, replyContainer);
  }

  // Append top, comment, and bottom to the card_container
  card_container.append(top, comment, bottom);

  // Return the card_container
  return card_container;
};

// Assuming data.comments is an array of comments, iterate through the data
data.comments.forEach((comment) => {
  // Create the comment card for the main comment
  const commentCard = createCommentCard(comment, false, "currentUsername");

  // Append the comment card to the base_comments_container
  base_comments_container.appendChild(commentCard);

  // Check if the comment has replies
  if (comment.replies && comment.replies.length > 0) {
    // Iterate through the replies
    comment.replies.forEach((reply) => {
      // Create the comment card for the reply
      const replyCard = createCommentCard(reply, true, "currentUsername");

      // Append the reply card to the base_comments_container
      base_comments_container.appendChild(replyCard);
    });
  }
});
const updateScore = (event, increment) => {
  const numberSpan = event.target
    .closest(".plus_minus")
    .querySelector(".number");
  const currentScore = parseInt(numberSpan.textContent, 10);
  const newScore = increment ? currentScore + 1 : currentScore - 1;
  numberSpan.textContent = newScore;
};

//create new comment

const sendBtn = document.querySelector(".send");

const replied_comments_container = document.querySelector(
  ".replied_comments_container"
);
sendBtn.addEventListener("click", () => {
  if (replied_comments_container === null) {
    console.error("Comments container not found!");
    return;
  }

  if (textArea.value === "") {
    return;
  }
  //
  const newCommentData = {
    user: {
      username: data.currentUser.username,
      image: {
        png: data.currentUser.image.png,
      },
    },
    content: textArea.value,
    replyingTo: "",
    createdAt: "now",
    score: 0,
  };

  const isReply = false;
  const currentUsername = data.currentUser.username;

  const newCommentCard = createCommentCard(
    newCommentData,
    isReply,
    currentUsername
  );
  replied_comments_container.append(newCommentCard);
  //

  textArea.value = "";
});
