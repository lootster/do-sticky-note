function displayAll() {
  var allStickyNote = window.localStorage;

  clearAllNotes();

  for (var eachNoteId in allStickyNote) {
    if (eachNoteId.includes("id")) {
      var eachNote = JSON.parse(localStorage.getItem(eachNoteId));
      var stickyNote = generateNoteHtml(eachNoteId, eachNote);
      document.getElementById("displayAllStickyNote").appendChild(stickyNote);
      deleteStickyNote(eachNoteId);
      editStickyNote(eachNoteId);
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
    `<textarea rows="2" cols="50" class="title" id="title${noteId}" >` +
    note["title"] +
    "</textarea>" +
    "<strong>" +
    "Content:" +
    "</strong>" +
    `<textarea rows="3" cols="50" class="content" id="content${noteId}">` +
    note["content"] +
    "</textarea>" +
    "<br/>" +
    `<button id="${noteId}" class="btn btn-danger">` +
    "Delete" +
    "</button>" +
    `<button id="edit${noteId}" class="btn btn-secondary">` +
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

function deleteStickyNote(noteId) {
  document.getElementById(`${noteId}`).addEventListener("click", function() {
    localStorage.removeItem(noteId);
    displayAll();
  });
}

function editStickyNote(noteId) {
  var note = JSON.parse(localStorage.getItem(noteId));
  var date = note.date;

  document
    .getElementById(`edit${noteId}`)
    .addEventListener("click", function() {
      var editButtonText = document.getElementById(`edit${noteId}`).innerText;

      // toggle background and "Edit" button
      document.getElementById(`edit${noteId}`).innerText =
        editButtonText === "Edit" ? "Save" : "Edit";
      document.getElementById(`title${noteId}`).style.backgroundColor =
        editButtonText === "Edit" ? "white" : "";
      document.getElementById(`content${noteId}`).style.backgroundColor =
        editButtonText === "Edit" ? "white" : "";

      var editNoteTitle = document.getElementById(`title${noteId}`).value;
      var editNoteContent = document.getElementById(`content${noteId}`).value;
      var editStickyNote = {
        date: date,
        title: editNoteTitle,
        content: editNoteContent
      };
      localStorage[noteId] = JSON.stringify(editStickyNote);
    });
}

function filterStickyNote() {
  var input = document.getElementById("sticky-note-filter");
  var filter = input.value.toLowerCase();

  var container = document.getElementById("displayAllStickyNote");
  var div = container.getElementsByTagName("div");

  for (var i = 0; i < div.length; i++) {
    var title = div[i].getElementsByClassName("title")[0].value;
    if (title.toLowerCase().indexOf(filter) > -1) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}

window.onload = function() {
  displayAll();
  document
    .getElementById("addStickyNote")
    .addEventListener("click", addStickyNote);
};
