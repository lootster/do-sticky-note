"use strict";

function displayAll() {
  var allStickyNote = window.localStorage;
  clearAllNotes();

  for (var eachNoteId in allStickyNote) {
    if (eachNoteId.includes("id")) {
      var eachNote = JSON.parse(localStorage.getItem(eachNoteId));
      var stickyNote = generateNoteHtml(eachNoteId, eachNote);
      document.getElementById("displayAllStickyNote").appendChild(stickyNote);
      addListenerToDeleteNote(eachNoteId);
      addListenerToEditNode(eachNoteId);
    }
  }
}

function clearAllNotes() {
  var notesList = document.getElementById("displayAllStickyNote");
  notesList.innerHTML = "";
}

function generateNoteHtml(noteId, note) {
  var stickyNote = document.createElement("div");
  stickyNote.className = "note";
  stickyNote.innerHTML =
    "<strong>" +
    "Title:" +
    "</strong>" +
    `<textarea rows="1" cols="50" class="title" id="title${noteId}" >` +
    note["title"] +
    "</textarea>" +
    "<strong>" +
    "Content:" +
    "</strong>" +
    `<textarea rows="3" cols="50" class="content" id="content${noteId}">` +
    note["content"] +
    "</textarea>" +
    "<br/>" +
    `<button id="${noteId}" class="btn btn-light">` +
    "Delete" +
    "</button>" +
    `<button id="edit${noteId}" class="btn btn-light">` +
    "Edit" +
    "</button>";
  return stickyNote;
}

function addStickyNote() {
  var date = new Date();
  var stickyNoteDate = date.toDateString();
  var stickyNoteTitle = document.getElementById("newStickyNoteTitle").value;
  var stickyNoteContent = document.getElementById("newStickyNoteContent").value;
  var stickyNoteId = "id" + Date.parse(date);

  var stickyNote = {
    date: stickyNoteDate,
    title: stickyNoteTitle,
    content: stickyNoteContent
  };

  localStorage.setItem(stickyNoteId, JSON.stringify(stickyNote));
  document.getElementById("newStickyNoteTitle").value = "";
  document.getElementById("newStickyNoteContent").value = "";
  displayAll();
}

function addListenerToDeleteNote(noteId) {
  document.getElementById(`${noteId}`).addEventListener("click", function() {
    localStorage.removeItem(noteId);
    displayAll();
  });
}

function addListenerToEditNode(noteId) {
  var note = JSON.parse(localStorage.getItem(noteId));
  var date = note.date;
  document
    .getElementById(`edit${noteId}`)
    .addEventListener("click", function() {
      var editButtonText = document.getElementById(`edit${noteId}`).innerText;

      // toggle background of input field and button's name (Edit/Save)
      document.getElementById(`edit${noteId}`).innerText =
        editButtonText === "Edit" ? "Save" : "Edit";
      document.getElementById(`title${noteId}`).style.backgroundColor =
        editButtonText === "Edit" ? "white" : "";
      document.getElementById(`content${noteId}`).style.backgroundColor =
        editButtonText === "Edit" ? "white" : "";

      var editNoteTitle = document.getElementById(`title${noteId}`).value;
      var editNoteContent = document.getElementById(`content${noteId}`).value;
      var addListenerToEditNode = {
        date: date,
        title: editNoteTitle,
        content: editNoteContent
      };
      localStorage[noteId] = JSON.stringify(addListenerToEditNode);
    });
}

function filterStickyNote() {
  var input = document.getElementById("sticky-note-filter");
  var filter = input.value.toLowerCase();

  var container = document.getElementById("displayAllStickyNote");
  var div = container.getElementsByTagName("div");

  for (var i = 0; i < div.length; i++) {
    var title = div[i].getElementsByClassName("title")[0].value;
    title.toLowerCase().indexOf(filter) > -1
      ? div[i].style.display = ""
      : div[i].style.display = "none";
  }
}

window.onload = function() {
  displayAll();
  document
    .getElementById("addStickyNote")
    .addEventListener("click", addStickyNote);
};
