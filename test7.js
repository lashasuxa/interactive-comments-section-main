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

const createButtonElement = (
  tag,
  className,
  src,
  alt,
  event,
  eventListener
) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  elem.src = src;
  elem.alt = alt;
  if (event && eventListener) {
    elem.addEventListener(event, (e) => eventListener(e));
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

for (let index = 0; index < data.comments.length; index++) {
  const element = data.comments[index];

  const card_container = createDomElement("div", "card_container");

  const top = createDomElement("div", "top");

  const avatar = createDomElement("img", null, element.user.image.png);

  const name = createDomElement("span", "name", null, element.user.username);

  const time = createDomElement("span", "time", null, element.createdAt);

  top.append(avatar, name, time);

  const comment = createDomElement("p", "comment", null, element.content);

  const bottom = createDomElement("div", "bottom");

  const plusMinus = createDomElement("div", "plus_minus");

  const numberSpan = createDomElement("span", "number", null, "12");

  const plusButton = createButtonElement(
    "button",
    "plus",
    null,
    null,
    "click",
    plusButtonListener,
    numberSpan
  );

  const plusImg = createDomElement(
    "img",
    "svg_plus",
    "./images/icon-plus.svg",
    "plus image"
  );

  plusButton.appendChild(plusImg);

  const minusButton = createButtonElement(
    "button",
    "minus",
    null,
    null,
    "click",
    minusButtonListener,
    numberSpan
  );

  const minusImg = createDomElement(
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

  const replyButton = createButtonElement(
    "button",
    "reply_button",
    null,
    null,
    "click",
    replyButtonListener
  );

  const replyImg = createDomElement(
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

  card_container.append(top, comment, bottom);

  base_comments_container.append(card_container);

  for (let j = 0; j < element.replies.length; j++) {
    const reply = element.replies[j];

    const card_container = createDomElement("div", "card_container");
    card_container.setAttribute("id", "new_comment");

    const top = createDomElement("div", "top");
    const avatar = createDomElement(
      "img",
      null,
      reply.user.image.png,
      "avatar"
    );
    const name = createDomElement("span", "name", null, reply.user.username);

    const time = createDomElement("span", "time", null, reply.createdAt);

    top.append(avatar, name, time);

    const comment = createDomElement("p", "comment", null, "");
    comment.setAttribute("id", "my_comment");

    const mention = createDomElement("span", "mention", null, reply.replyingTo);
    const commentText = document.createTextNode(reply.content);

    comment.appendChild(mention);
    comment.appendChild(commentText);

    const bottom = createDomElement("div", "bottom");

    const plusMinus = createDomElement("div", "plus_minus");

    const numberSpan = createDomElement("span", "number", null, "2");

    const plusButton = createButtonElement(
      "button",
      "plus",
      null,
      null,
      "click",
      plusButtonListener,
      numberSpan
    );

    const plusImg = createDomElement(
      "img",
      "svg_plus",
      "./images/icon-plus.svg",
      "plus image"
    );

    plusButton.appendChild(plusImg);

    const minusButton = createButtonElement(
      "button",
      "minus",
      null,
      null,
      "click",
      minusButtonListener,
      numberSpan
    );

    const minusImg = createDomElement(
      "img",
      "svg_minus",
      "./images/icon-minus.svg",
      "minus image"
    );

    minusButton.appendChild(minusImg);

    plusMinus.append(plusButton, numberSpan, minusButton);

    bottom.append(plusMinus);

    card_container.append(top, comment, bottom);

    base_comments_container.append(card_container);
  }
}
