let saveNotes = [];
const inputEl = document.getElementById("input-el");
const notesBtn = document.getElementById("notes-btn");
const tabsBtn = document.getElementById("tabs-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

let notesFromLocalStorage = JSON.parse(localStorage.getItem("saveNotes"));
if (notesFromLocalStorage) {
  saveNotes = notesFromLocalStorage;
  render(saveNotes);
}
tabsBtn.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    saveNotes.push(tabs[0].url);
    localStorage.setItem("saveNotes", JSON.stringify(saveNotes));
    render(saveNotes);
  });
});

notesBtn.addEventListener("click", function () {
  saveNotes.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("saveNotes", JSON.stringify(saveNotes));
  render(saveNotes);
});

function render(notes) {
  let listItems = "";
  for (let i = 0; i < notes.length; i++) {
    listItems += `<li>
                    <a href="${notes[i]}">
                      ${notes[i]}
                    </a>
                  </li>`;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  saveNotes = [];
  render(saveNotes);
});
