function displayAll() {
  var allStickyNote = window.localStorage;

  if (allStickyNote.length > 0) {
    for (var eachStickyNote in allStickyNote) {
      if (eachStickyNote.includes("id")) {
        // console.log(eachStickyNote);
        var note = JSON.parse(localStorage.getItem(eachStickyNote));
        // console.log(parsedNote);
        var stickyNote = document.createElement("div");
        stickyNote.className = "note";
        stickyNote.id = eachStickyNote.substring(8, 12);
        // console.log(stickyNote.id);
        stickyNote.innerHTML =
          "<span>" +
          "Sticky Id: " +
          stickyNote.id +
          "</span>" +
          "<h3>" +
          note["title"] +
          "</h3>" +
          `<textarea id="note-content">` +
          note["content"] +
          "</textarea>" +
          "<br/>" +
          `<button id="${eachStickyNote}">` +
          "delete" +
          "</button>";

        document.getElementById("displayAllStickyNote").appendChild(stickyNote);

        deleteStickyNote(eachStickyNote);
      }
    }
  }
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
}

function deleteStickyNote(noteId) {
  console.log(noteId);
  document.getElementById(`${noteId}`).addEventListener("click", function() {
    localStorage.removeItem(noteId);
    document.location.reload(true);
  });
}

window.onload = function() {
  displayAll();
  document.getElementById("displayAllStickyNote").style.display = "flex";
  document
    .getElementById("addStickyNote")
    .addEventListener("click", addStickyNote);
};
