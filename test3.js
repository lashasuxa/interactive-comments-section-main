import data from "./data.json" assert { type: "json" };

const base_comments_container = document.querySelector(
  ".base_comments_container"
);
const createDomElement = (tag, className, src, textContent, event, eventFc) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  elem.src = src;
  elem.textContent = textContent;
  return elem;
};

for (let index = 0; index < data.comments.length; index++) {
  const element = data.comments[index];
  // console.log(element.user);

  const card_container = createDomElement("div", "card_container");

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
    eventListener
  ) => {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    elem.src = src;
    elem.alt = alt;
    if (event && eventListener) {
      elem.addEventListener(event, eventListener);
    }
    return elem;
  };
  const plusButtonListener = () => {
    let currentNumber = parseInt(numberSpan.textContent);
    currentNumber++;
    numberSpan.textContent = currentNumber;
  };

  const minusButtonListener = () => {
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
    plusButtonListener
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
    minusButtonListener
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

  //itterate through comments
  for (let j = 0; j < element.replies.length; j++) {
    const reply = element.replies[j];
    console.log(`  Reply ${reply.id}: ${reply.content}`);
  }
}
