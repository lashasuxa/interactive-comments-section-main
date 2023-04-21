import data from "./data.json" assert { type: "json" };

const base_comments_container = document.querySelector(
  ".base_comments_container"
);
const createDomElement = (tag, className, src, textContent) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  elem.src = src;
  elem.textContent = textContent;
  return elem;
};

for (let index = 0; index < data.comments.length; index++) {
  const element = data.comments[index];
  // console.log(element.user);

  //create container to append then children
  const card_container = createDomElement("div", "card_container");
  //creating top container
  const top = createDomElement("div", "top");

  const avatar = createDomElement("img", null, element.user.image.png);

  const name = createDomElement("span", "name", null, element.user.username);

  const time = createDomElement("span", "time", null, element.createdAt);

  top.append(avatar, name, time);

  const comment = createDomElement("p", "comment", null, element.content);

  //creating buttons from js
  const createButtonElement = (
    tag,
    className,
    src,
    alt,
    event,
    eventListener,
    numberSpan
  ) => {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    elem.src = src;
    elem.alt = alt;
    if (event && eventListener) {
      elem.addEventListener(event, eventListener(numberSpan));
    }
    return elem;
  };
  const plusButtonListener = (numberSpan) => () => {
    let currentNumber = parseInt(numberSpan.textContent);
    currentNumber++;
    numberSpan.textContent = currentNumber;
  };

  const minusButtonListener = (numberSpan) => () => {
    let currentNumber = parseInt(numberSpan.textContent);
    if (currentNumber > 0) {
      currentNumber--;
      numberSpan.textContent = currentNumber;
    }
  };

  const bottom = createDomElement("div", "bottom");

  const plusMinus = createDomElement("div", "plus_minus");

  const plusButton = createButtonElement(
    "button",
    "plus",
    null,
    null,
    "click",
    plusButtonListener,
    numberSpan
  );

  // create img svg
  const createImgElement = (tag, className, src, alt) => {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    elem.src = src;
    elem.alt = alt;
    return elem;
  };
  const plusImg = createImgElement(
    "img",
    "svg_plus",
    "./images/icon-plus.svg",
    "plus image"
  );

  plusButton.appendChild(plusImg);

  const numberSpan = createDomElement("span", "number", null, "12");

  const minusButton = createButtonElement(
    "button",
    "minus",
    null,
    null,
    "click",
    minusButtonListener,
    numberSpan
  );

  const minusImg = createImgElement(
    "img",
    "svg_minus",
    "./images/icon-minus.svg",
    "minus image"
  );

  minusButton.appendChild(minusImg);

  plusMinus.append(plusButton, numberSpan, minusButton);

  const replyButtonListener = (event) => {
    const username = event.target
      .closest(".card_container")
      .querySelector(".name").textContent;
    console.log("Clicked reply on:", username);
  };

  const replyContainer = document.createElement("div");
  replyContainer.classList.add("reply_container");

  // Create the reply button with the listener
  const replyButton = createButtonElement(
    "button",
    "reply_button",
    null,
    null,
    "click",
    replyButtonListener
  );

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
  //

  bottom.append(plusMinus, replyContainer);

  card_container.append(top, comment, bottom);

  base_comments_container.append(card_container);

  //iterate through comments

  //second loop for comments

  for (let j = 0; j < element.replies.length; j++) {
    const reply = element.replies[j];
    //for starts here
    const base_comments_container = document.querySelector(
      ".base_comments_container"
    );

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
    card_container.setAttribute("id", "new_comment");

    // Create top
    const top = createDomElement("div", "top");
    const avatar = createDomElement(
      "img",
      null,
      reply.user.image.png,
      "avatar"
    );
    const name = createDomElement("span", "name", null, reply.user.username);
    if (reply.user.username === "juliusomo") {
      console.log("yes tru");
      const you = createDomElement("span", "you", null, "you");
      name.append(you);
    }
    const time = createDomElement("span", "time", null, reply.createdAt);

    top.append(avatar, name, time);

    // Create comment
    const comment = createDomElement("p", "comment", null, "");
    comment.setAttribute("id", "my_comment");

    const mention = createDomElement("span", "mention", null, reply.replyingTo);
    const commentText = document.createTextNode(reply.content);

    comment.appendChild(mention);
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
    const numberSpan = createDomElement("span", "number", null, "2");
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

    // Create edit_delete_container
    if (reply.user.username === "juliusomo") {
      console.log("yes is equal");
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
    } else {
      const replyButtonListener = (event) => {
        const username = event.target
          .closest(".card_container")
          .querySelector(".name").textContent;
        console.log("Clicked reply on:", username);
      };

      const replyContainer = document.createElement("div");
      replyContainer.classList.add("reply_container");

      // Create the reply button with the listener
      const replyButton = createButtonElement(
        "button",
        "reply_button",
        null,
        null,
        "click",
        replyButtonListener
      );

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
      console.log("no it's not");
    }

    // Append elements to the bottom

    // Append top, comment, and bottom to the card_container
    card_container.append(top, comment, bottom);

    // Append card_container to base_comments_container
    base_comments_container.append(card_container);

    //for ends here
    console.log(reply.user.username);
  }
}
