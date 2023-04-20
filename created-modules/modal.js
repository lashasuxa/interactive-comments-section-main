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
