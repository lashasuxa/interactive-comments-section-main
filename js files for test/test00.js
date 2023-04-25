import data from "../data.json" assert { type: "json" };
console.log(data.comments);

const upBtn = document.querySelector(".increace");
const downBtn = document.querySelector(".decreace");

upBtn.addEventListener("click", () => {
  const newCommentData = {
    id: data.comments.length + 1, // Assign a new ID
    user: {
      username: data.currentUser.username,
      image: {
        png: data.currentUser.image.png,
      },
    },
    content: "some text here",
    replyingTo: "lasha",
    createdAt: "now",
    score: 37,
  };

  data.comments.push(newCommentData);
  console.log(data.comments);

  return data.comments;
});

function filterDataById(id) {
  // Filter the data.comments array by excluding the object with the specified id
  const filteredData = data.comments.filter((comment) => comment.id !== id);

  return filteredData;
}

downBtn.addEventListener("click", (e) => {
  const id = data.comments.length;
  const filteredData = filterDataById(id);
  data.comments = filteredData;
  console.log(data.comments);
});
