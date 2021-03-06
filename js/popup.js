'use strict'

var createBtn = document.querySelector('#xpqCreateNewNote');
var backBtn = document.querySelector('#xpqBackHomeBtn');

// 编辑便签、删除便签、确认删除三个按钮 同时只有一个显示
var theThreeBtns = {
  editBtn: document.querySelector('#xpqEditNoteBtn'),
  deleteBtn: document.querySelector('#xpqDeleteNoteBtn'),
  confirmDeleteBtn: document.querySelector('#xpqConfirmDeleteNoteBtn')
}

var homeContainer = document.querySelector('#xpqHomeContainer');
var notesDetailContainer = document.querySelector('#xpqNotesDetailContainer');
var newNoteContainer = document.querySelector('#xpqNewNoteContainer');
var noteWrapper = document.querySelector('#xpqNoteWrapper');
var noteTitle = document.querySelector('#xpqNoteTitle');
var noteContent = document.querySelector('#xpqNoteContent');
var noteList = document.querySelector('#xpqNoteList');
var noteTitles = noteList.querySelectorAll('li');

var saveBtn = document.querySelector('#xpqSaveNewNoteBtn');
var titleInput = document.querySelector('#xpqNewNoteTitleInput');
var contentTextarea = document.querySelector('#xpqNewNoteTextarea');

var selectedNoteIndex = -1;
var isEditing = false;

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
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage.length !== 0;
  }
}

// 编辑便签、删除便签、确认删除三个按钮 同时只有一个显示
function showBtnBetweenTheThree(btnName) {
  theThreeBtns.editBtn.style.display = 'none';
  theThreeBtns.deleteBtn.style.display = 'none';
  theThreeBtns.confirmDeleteBtn.style.display = 'none';
  if (btnName) {
    theThreeBtns[btnName].style.display = 'block';
  }
}

function setNoteList(notes) {
  var list = '';
  storage.setItem('xpqNotes', JSON.stringify(notes));
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
  selectedNoteIndex = null;
  showBtnBetweenTheThree(null)
  noteWrapper.style.display = 'none';
  newNoteContainer.style.display = 'block';
  isEditing = false;
  titleInput.value = '';
  contentTextarea.value = '';
})

backBtn.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '0px';
})

theThreeBtns.editBtn.addEventListener('click', function (e) {
  showBtnBetweenTheThree('deleteBtn');
  noteWrapper.style.display = 'none';
  newNoteContainer.style.display = 'block';
  isEditing = true;
  titleInput.value = notes[parseInt(selectedNoteIndex)].title;
  contentTextarea.value = notes[parseInt(selectedNoteIndex)].content;
})

theThreeBtns.deleteBtn.addEventListener('click', function (e) {
  showBtnBetweenTheThree('confirmDeleteBtn');
})

theThreeBtns.confirmDeleteBtn.addEventListener('click', function (e) {
  notes.splice(selectedNoteIndex, 1);
  setNoteList(notes)
  homeContainer.style.marginLeft = '0px';
})

xpqNoteList.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '-400px';
  noteWrapper.style.display = 'block';
  showBtnBetweenTheThree('editBtn');
  newNoteContainer.style.display = 'none';
  var index = e.target.className[e.target.className.length - 1]
  noteTitle.innerHTML = notes[parseInt(index)].title;
  noteContent.innerHTML = notes[parseInt(index)].content;
  selectedNoteIndex = index;
})

saveBtn.addEventListener('click', function (e) {
  if (titleInput.value) {
    var savingNote = { title: titleInput.value, content: contentTextarea.value }
    if (isEditing) {
      notes[selectedNoteIndex] = savingNote
    } else {
      notes.push(savingNote)
    }
    storage.setItem('xpqNotes', JSON.stringify(notes));
    setNoteList(notes)
  }
  homeContainer.style.marginLeft = '0px';
})