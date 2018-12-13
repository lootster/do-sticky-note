function displayAll() {
  var allStickyNote = window.localStorage;

  // if (allStickyNote.length >= 0) {
    clearAllNotes();
    for (var eachNoteId in allStickyNote) {
      if (eachNoteId.includes("id")) {
        console.log(eachNoteId);
        var eachNote = JSON.parse(localStorage.getItem(eachNoteId));
        console.log(eachNote);
        var stickyNote = generateNoteHtml(eachNoteId, eachNote);

        document.getElementById("displayAllStickyNote").appendChild(stickyNote);

        deleteStickyNote(eachNoteId);
        editStickyNote(eachNoteId);
      }
    }
  // }
}

function clearAllNotes() {
  var notesList = document.getElementById("displayAllStickyNote");
  notesList.innerHTML = "";
}

function generateNoteHtml(noteId, note) {
  var stickyNote = document.createElement("div");
  stickyNote.className = "note";
  stickyNote.id = noteId.substring(8, 12);
  console.log(stickyNote.id);
  stickyNote.innerHTML =
    "<h5>" +
    "Id: " +
    stickyNote.id +
    "</h5>" +
    `<textarea class="title" id="title${noteId}">` +
    note["title"] +
    "</textarea>" +
    `<textarea class="content" id="content${noteId}">` +
    note["content"] +
    "</textarea>" +
    "<br/>" +
    `<button id="${noteId}">` +
    "Delete" +
    "</button>" +
    `<button id="edit${noteId}">` +
    "Update Content" +
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
  console.log(date);
  document
    .getElementById(`edit${noteId}`)
    .addEventListener("click", function() {
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

window.onload = function() {
  displayAll();
  document.getElementById("displayAllStickyNote").style.display = "flex";
  document
    .getElementById("addStickyNote")
    .addEventListener("click", addStickyNote);
};
