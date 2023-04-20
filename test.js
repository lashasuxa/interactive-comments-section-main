import data from "./data.json" assert { type: "json" };

const base_comments_container = document.querySelector(
  ".base_comments_container"
);

for (let index = 0; index < data.comments.length; index++) {
  const element = data.comments[index];
  console.log(element.user);
  //   const {id,content,createdAt,score,}=data.comments[index]

  const card_container = document.createElement("div");
  card_container.classList.add("card_container");
  const top = document.createElement("div");
  top.classList.add("top");
  const avatar = document.createElement("img");
  avatar.src = element.user.image.png;
  const name = document.createElement("span");
  name.classList.add("name");
  name.textContent = element.user.username;
  const time = document.createElement("span");
  time.classList.add("time");
  time.textContent = element.createdAt;

  top.append(avatar, name, time);

  const comment = document.createElement("p");
  comment.classList.add("comment");
  comment.textContent = element.content;

  const bottom = document.createElement("div");
  bottom.classList.add("bottom");

  const plus_minus = document.createElement("div");
  plus_minus.classList.add("plus_minus");

  const plus_button = document.createElement("button");
  plus_button.classList.add("plus");
  const plus_svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  plus_svg.setAttribute("width", "11");
  plus_svg.setAttribute("height", "11");
  const plus_path = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  plus_path.setAttribute(
    "d",
    "M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
  );
  plus_path.setAttribute("fill", "#C5C6EF");
  plus_svg.appendChild(plus_path);
  plus_button.appendChild(plus_svg);

  const minus_button = document.createElement("button");
  minus_button.classList.add("minus");

  const minus_svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  minus_svg.setAttribute("width", "11");
  minus_svg.setAttribute("height", "3");
  const minus_path = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  minus_path.setAttribute(
    "d",
    "M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
  );
  minus_path.setAttribute("fill", "#C5C6EF");
  minus_svg.appendChild(minus_path);
  minus_button.appendChild(minus_svg);

  const number = document.createElement("span");
  number.classList.add("number");
  number.textContent = element.score;

  plus_minus.append(plus_button, number, minus_button);

  const reply_container = document.createElement("div");
  reply_container.classList.add("reply_container");

  const reply_svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  reply_svg.setAttribute("width", "14");
  reply_svg.setAttribute("height", "13");
  const reply_path = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  reply_path.setAttribute(
    "d",
    "M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
  );
  reply_path.setAttribute("fill", "#5357B6");
  reply_svg.appendChild(reply_path);

  const reply_text = document.createElement("span");
  reply_text.classList.add("reply");
  reply_text.textContent = "Reply";

  reply_container.append(reply_svg, reply_text);

  bottom.append(plus_minus, reply_container);

  card_container.append(top, comment, bottom);

  base_comments_container.append(card_container);
}
