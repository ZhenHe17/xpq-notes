'use strict'

var createBtn = document.querySelector('#xpqCreateNewNote');
var backBtn = document.querySelector('#xpqBackHomeBtn');
var deleteBtn = document.querySelector('#xpqDeleteNoteBtn');
var confirmDeleteBtn = document.querySelector('#xpqConfirmDeleteNoteBtn');

var homeContainer = document.querySelector('#xpqHomeContainer');
var notesDetailContainer = document.querySelector('#xpqNotesDetailContainer');
var newNoteContainer = document.querySelector('#xpqNewNoteContainer');
var noteContent = document.querySelector('#xpqNoteContent');
var noteList = document.querySelector('#xpqNoteList');
var noteTitles = noteList.querySelectorAll('li');

var saveBtn = document.querySelector('#xpqSaveNewNoteBtn');
var titleInput = document.querySelector('#xpqNewNoteTitleInput');
var contentTextarea = document.querySelector('#xpqNewNoteTextarea');

var selectedNoteIndex = -1;

function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}

function setNoteList(notes) {
  var list = '';
  notes.forEach(function (ele, index) {
    list += '<li class="note' + index + '">' + ele.title + '</li>';
  }, this);
  noteList.innerHTML = list;
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  var storage = window.localStorage;
  var notes = JSON.parse(storage.getItem('xpqNotes'));
  if (!notes) {
    var newNotes = [{ title: '使用说明', content: '点击上方按钮以使用便签功能' }, { title: '注意事项', content: '清除浏览器数据可能会删除便签内容, 请提前做好备份' }];
    storage.setItem('xpqNotes', JSON.stringify(newNotes));
    notes = newNotes;
  }
  setNoteList(notes)
}
else {
  // Too bad, no localStorage for us
  alert('您的浏览器暂不支持小皮球便签哦, 请更新浏览器后重试')
}

createBtn.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '-400px';
  deleteBtn.style.display = 'none';
  noteContent.style.display = 'none';
  newNoteContainer.style.display = 'block';
})

backBtn.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '0px';
  deleteBtn.style.display = 'block';
})

deleteBtn.addEventListener('click', function (e) {
  deleteBtn.style.display = 'none';
  confirmDeleteBtn.style.display = 'block';
})

confirmDeleteBtn.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '0px';
  deleteBtn.style.display = 'block';
  confirmDeleteBtn.style.display = 'none';
})

xpqNoteList.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '-400px';
  noteContent.style.display = 'block';
  deleteBtn.style.display = 'block';
  newNoteContainer.style.display = 'none';
  var index = e.target.className[e.target.className.length - 1]
  noteContent.innerHTML = notes[parseInt(index)].content;
  selectedNoteIndex = index
})

saveBtn.addEventListener('click', function (e) {
  console.info(titleInput.value)
  console.info(contentTextarea.value)
  let newNoteTitle = titleInput;
  if (titleInput.value) {
    notes.push({ title: titleInput.value, content: contentTextarea.value })
    storage.setItem('xpqNotes', JSON.stringify(notes));
  }
  setNoteList(notes)
  homeContainer.style.marginLeft = '0px';
})