'use strict'

var createBtn = document.querySelector('#xpqCreateNewNote');
var backBtn = document.querySelector('#xpqBackHomeBtn');
var deleteBtn = document.querySelector('#xpqDeleteNoteBtn');

var homeContainer = document.querySelector('#xpqHomeContainer');
var notesDetailContainer = document.querySelector('#xpqNotesDetailContainer');
var newNoteContainer = document.querySelector('#xpqNewNoteContainer');
var noteContent = document.querySelector('#xpqNoteContent');
var noteList = document.querySelector('#xpqNoteList');
var noteTitles = noteList.querySelectorAll('li');

var saveBtn = document.querySelector('#xpqSaveNewNoteBtn');
var titleInput = noteList.querySelector('#xpqNewNoteTitleInput');
var contentTextarea = noteList.querySelector('#xpqNewNoteTextarea');

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

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  var storage = window.localStorage;
  var notes = JSON.parse(storage.getItem('xpqNotes'));
  var list = '';
  if (!notes) {
    var newNotes = [{ title: '使用说明', content: '点击上方按钮以使用便签功能' }, { title: '注意事项', content: '清除浏览器数据可能会删除便签内容, 请提前做好备份' }];
    storage.setItem('xpqNotes', JSON.stringify(newNotes));
  }
  notes.forEach(function (ele, index) {
    list += '<li class="note' + index + '">' + ele.title + '</li>';
  }, this);
  noteList.innerHTML = list;
}
else {
  // Too bad, no localStorage for us
  alert('您的浏览器暂不支持小皮球便签哦, 请更新浏览器后重试')
}

createBtn.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '-400px';
})

backBtn.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '0px';
})

deleteBtn.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '0px';
})

xpqNoteList.addEventListener('click', function (e) {
  homeContainer.style.marginLeft = '-400px';
  console.info(e);
  var index = e.target.className[e.target.className.length - 1]
  noteContent.innerHTML = notes[parseInt(index)].content;
})

saveBtn.addEventListener('click', function (e) {
  console.info(titleInput)
  console.info(contentTextarea)
  let newNoteTitle = titleInput;
  notes.push({})
  alert('保存便签成功!');
  homeContainer.style.marginLeft = '0px';
})