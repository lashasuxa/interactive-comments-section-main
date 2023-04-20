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
  console.log(element.user);
  //   const {id,content,createdAt,score,}=data.comments[index]

  //   const card_container = document.createElement("div");
  //   card_container.classList.add("card_container");

  //here comed function
  const card_container = createDomElement("div", "card_container");
  //here ends function

  //   const top = document.createElement("div");
  //   top.classList.add("top");
  const top = createDomElement("div", "top");

  //
  //   const avatar = document.createElement("img");
  //   avatar.src = element.user.image.png;

  const avatar = createDomElement("img", null, element.user.image.png);

  //

  //   const name = document.createElement("span");
  //   name.classList.add("name");
  //   name.textContent = element.user.username;

  //
  const name = createDomElement("span", "name", null, element.user.username);

  //   const time = document.createElement("span");
  //   time.classList.add("time");
  //   time.textContent = element.createdAt;
  //
  const time = createDomElement("span", "time", null, element.createdAt);

  top.append(avatar, name, time);

  //   const comment = document.createElement("p");
  //   comment.classList.add("comment");
  //   comment.textContent = element.content;

  //
  const comment = createDomElement("p", "comment", null, element.content);

  //creating buttons from js
  const createButtonElement = (tag, className, src, alt, event, eventFc) => {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    elem.src = src;
    elem.alt = alt;

    return elem;
  };

  //   const bottom = document.createElement("div");
  //   bottom.classList.add("bottom");
  //
  const bottom = createDomElement("div", "bottom");

  //   const plusMinus = document.createElement("div");
  //   plusMinus.classList.add("plus_minus");

  const plusMinus = createDomElement("div", "plus_minus");

  //   const plusButton = document.createElement("button");
  //   plusButton.classList.add("plus");

  const plusButton = createButtonElement("button", "plus");

  const plusImg = document.createElement("img");
  plusImg.src = "./images/icon-plus.svg";
  plusImg.alt = "";
  plusImg.classList.add("svg_plus");

  plusButton.appendChild(plusImg);

  const numberSpan = document.createElement("span");
  numberSpan.classList.add("number");
  numberSpan.textContent = "12";

  const minusButton = document.createElement("button");
  minusButton.classList.add("minus");

  const minusImg = document.createElement("img");
  minusImg.src = "./images/icon-minus.svg";
  minusImg.alt = "";
  minusImg.classList.add("svg_minus");
  minusButton.appendChild(minusImg);

  plusMinus.append(plusButton, numberSpan, minusButton);

  const replyContainer = document.createElement("div");
  replyContainer.classList.add("reply_container");

  const replyImg = document.createElement("img");
  replyImg.src = "./images/icon-reply.svg";
  replyImg.alt = "";
  replyImg.classList.add("svg_reply");
  replyContainer.appendChild(replyImg);

  const replySpan = document.createElement("span");
  replySpan.classList.add("reply");
  replySpan.textContent = "Reply";
  replyContainer.appendChild(replySpan);

  bottom.append(plusMinus, replyContainer);

  card_container.append(top, comment, bottom);

  base_comments_container.append(card_container);
}
