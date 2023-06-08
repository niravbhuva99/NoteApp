// const { marked } = require("marked");

// "use strict";
const addNote = document.querySelector("#add");
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((notetext) => {
    addNewNote(notetext);
  });
}
addNote.addEventListener("click", () => {
  addNewNote();
});
function addNewNote(noteText = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = ` <div class="tools">
  <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="delete"><i class="fa-solid fa-trash"></i></button>
  
</div>
<div class="main ${noteText ? "" : "hidden"}"></div>
<textarea class="${noteText ? "hidden" : ""}"></textarea>`;
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = noteText;
  main.innerHTML = marked.parse(noteText);
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    updateLs();
  });
  deleteBtn.addEventListener("click", (e) => {
    console.log(e.target);
    note.remove();
    updateLs();
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked.parse(value);
  });
  document.body.appendChild(note);
}

function updateLs() {
  const notes = [];

  const notesText = document.querySelectorAll("textarea");
  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
