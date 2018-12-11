// document.getElementById("displayAllStickyNote").innerHTML = "";
document.getElementById("displayAllStickyNote").style.display = "flex";

var allStickyNote = window.localStorage;

if (allStickyNote.length > 0) {

  for (var eachStickyNote in allStickyNote) {

    if (eachStickyNote.includes("id")) {

      parsedNote = JSON.parse(localStorage.getItem(eachStickyNote));
      console.log(parsedNote);
      var stickyNote = document.createElement("div");
      stickyNote.className = "note";
      stickyNote.id = eachStickyNote.substring(10);
      stickyNote.innerHTML =
        "<h3>" +
        parsedNote["title"] +
        "</h3><br><h4>" +
        parsedNote["content"] +
        "</h4>";
      // stickyNote.addEventListener("click", focusNote);
      document.getElementById("displayAllStickyNote").appendChild(stickyNote);
    }
  }
}
// }

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

window.onload = function() {
  // displayAllStickyNote();

  document
    .getElementById("addStickyNote")
    .addEventListener("click", addStickyNote);
};
