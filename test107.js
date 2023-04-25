import data from "./data.json" assert { type: "json" };

//getting elements from dome
const base_comments_container = document.querySelector(
  ".base_comments_container"
);
const textArea = document.querySelector("textarea");
const modal = document.querySelector(".modal_container");
const backdrop = document.querySelector(".backdrop");

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

function renderComments(comments) {
  // Clear the base_comments_container
  base_comments_container.innerHTML = "";

  // Iterate through the comments array
  comments.forEach((comment) => {
    // Create the comment card for the main comment
    const commentCard = createCommentCard(comment, false);

    // Append the comment card to the base_comments_container
    base_comments_container.appendChild(commentCard);

    // Check if the comment has replies
    if (comment.replies && comment.replies.length > 0) {
      // Iterate through the replies
      comment.replies.forEach((reply) => {
        // Create the comment card for the reply
        const replyCard = createCommentCard(reply, true);

        // Append the reply card to the base_comments_container
        base_comments_container.appendChild(replyCard);
      });
    }
  });
}

//create new comment

const sendBtn = document.querySelector(".send");

const replied_comments_container = document.querySelector(
  ".replied_comments_container"
);
sendBtn.addEventListener("click", () => {
  if (textArea.value === "") {
    return;
  }

  const newCommentData = {
    id: data.comments.length + 1, // Assign a new ID
    user: {
      username: data.currentUser.username,
      image: {
        png: data.currentUser.image.png,
      },
    },
    content: textArea.value,
    createdAt: "now",
    score: 0,
    replies: [],
  };

  data.comments.push(newCommentData);
  console.log(data);
  // console.log(data.comments);
  console.log(newCommentData.id);
  renderComments(data.comments);
  textArea.value = "";
  return data.comments;
});

const createCommentCard = (element, isReply) => {
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

  //   if (isReply) {
  const mention = createDomElement("span", "mention", null, element.replyingTo);
  comment.appendChild(mention);

  ////
  //   }

  const commentText = document.createTextNode(element.content);
  comment.appendChild(commentText);

  // Create bottom
  const bottom = createDomElement("div", "bottom");

  // Create plus_minus
  const plusMinus = createDomElement("div", "plus_minus");
  //Create plus button
  const plusButton = createDomElement("button", "plus");
  //
  plusButton.addEventListener("click", () => {
    element.score++;
    numberSpan.textContent = element.score;
  });
  //
  const plusImg = createImgElement(
    "img",
    "svg_plus",
    "./images/icon-plus.svg",
    ""
  );
  const numberSpan = createDomElement("span", "number", null, element.score);
  //Create minus button
  const minusButton = createDomElement("button", "minus");
  minusButton.addEventListener("click", () => {
    if (element.score > 0) {
      element.score--;
      numberSpan.textContent = element.score;
    }
  });
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
    const deleteButtonListener = () => {
      modal.classList.add("modal_active");
      backdrop.style.display = "block";
    };
    const cancelBtn = document.querySelector(".cancel");
    cancelBtn.addEventListener("click", () => {
      modal.classList.remove("modal_active");
      backdrop.style.display = "none";
    });
    // here starts delete function

    //

    //
    const deleteText = createDomElement("span", "delete_svg", null, "Delete");
    deleteText.addEventListener("click", deleteButtonListener);
    const editImg = createImgElement(
      "img",
      "svg_edit",
      "./images/icon-edit.svg",
      ""
    );
    const updateBtn = createDomElement("button", "update_btn", null, "update");
    updateBtn.addEventListener("click", () => {
      comment.blur();
      // console.log("clicked update btn blur");
      updateBtn.style.display = "none";
      editDeleteContainer.style.display = "block";
    });
    const editButtonListener = () => {
      // console.log("edit");
      comment.contentEditable = true;
      comment.focus();
      updateBtn.style.display = "block";
      editDeleteContainer.style.display = "none";
    };
    const editText = createDomElement("span", "edit_text", null, "Edit");
    editText.addEventListener("click", editButtonListener);

    editDeleteContainer.append(deleteImg, deleteText, editImg, editText);
    bottom.append(plusMinus, editDeleteContainer, updateBtn);
  } //in case if current user != username then it creates container with reply button
  else {
    const replyButtonListener = () => {
      // Create the container div
      const newCommentContainer = document.createElement("div");
      newCommentContainer.className = "new_comment_container";

      // Create the textarea element
      const addCommentTextArea = document.createElement("textarea");
      addCommentTextArea.id = "add_comment";
      //   addCommentTextArea.placeholder = "Add a comment...";

      // Create the image element
      const userAvatar = document.createElement("img");
      userAvatar.src = "./images/avatars/image-juliusomo.png";
      userAvatar.alt = "";

      // Create the send button element
      const replySendButton = createDomElement("button", "send", null, "Reply");

      replySendButton.addEventListener("click", () => {
        // console.log(element.replies);
        newCommentContainer.remove();
        // console.log("removed");
        //

        const newReplyCommentData = {
          id: data.comments.length + 1, // Assign a new ID
          content: addCommentTextArea.value,
          createdAt: "now",
          score: 37,
          replyingTo: `@${element.user.username} `,
          replies: [],
          user: {
            image: {
              png: data.currentUser.image.png,
            },
            username: data.currentUser.username,
          },
        };

        base_comments_container.append(
          createCommentCard(newReplyCommentData, isReply)
        );

        // console.log(newReplyCommentData.id);
        // console.log(newReplyCommentData);
        // console.log(element.replies);
      });

      // Append the textarea, image, and button elements to the container div
      newCommentContainer.append(
        addCommentTextArea,
        userAvatar,
        replySendButton
      );

      // Append the newCommentContainer to the base_comments_container
      base_comments_container.append(newCommentContainer);

      // Focus the textarea and insert the username
      const username = element.user.username;
      addCommentTextArea.focus();
      //   console.log("Clicked reply on:", username);
      //   console.log(addCommentTextArea.value);
      // console.log(element.replies);
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
  const commentCard = createCommentCard(comment, false);

  // Append the comment card to the base_comments_container
  base_comments_container.appendChild(commentCard);

  // Check if the comment has replies
  if (comment.replies && comment.replies.length > 0) {
    // Iterate through the replies
    comment.replies.forEach((reply) => {
      // Create the comment card for the reply
      const replyCard = createCommentCard(reply, true);

      // Append the reply card to the base_comments_container
      base_comments_container.appendChild(replyCard);
    });
  }
});

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", (e) => {
  console.log("yes of course");
  console.log(data.comments.length);
  const id = data.comments.length;
  const filteredData = filterDataById(id);
  data.comments = filteredData;
  console.log(filteredData);
  // console.log(data.comments);
  console.log(id);
  // Re-render the comments after deleting the comment
  renderComments(data.comments);

  // Hide the modal and backdrop
  modal.classList.remove("modal_active");
  backdrop.style.display = "none";
});

function filterDataById(id) {
  console.log("foo");
  // Filter the data.comments array by excluding the object with the specified id
  const filteredData = data.comments.filter((comment) => comment.id !== id);

  return filteredData;
}
renderComments(data.comments);
console.log(data.comments);
