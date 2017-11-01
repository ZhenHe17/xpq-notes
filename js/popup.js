'use strict'

var createBtn = document.querySelector('#xpqCreateNewNote');
var backBtn = document.querySelector('#xpqBackHomeBtn');
var deleteBtn = document.querySelector('#xpqDeleteNoteBtn');
var homeContainer = document.querySelector('#xpqHomeContainer');
var notesDetailContainer = document.querySelector('#xpqNotesDetailContainer');
var noteContent = document.querySelector('#xpqNoteContent');
var todoList = document.querySelector('#xpqTodoList');
var noteTitles = todoList.querySelectorAll('li');

function storageAvailable(type) {
  try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
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

createBtn.addEventListener('click',function(e){
  homeContainer.style.marginLeft = '-400px';
  noteContent.innerHTML = '<textarea placeholder="请输入便签内容..."></textarea>'
})

backBtn.addEventListener('click',function(e){
  homeContainer.style.marginLeft = '0px';
})

deleteBtn.addEventListener('click',function(e){
  homeContainer.style.marginLeft = '0px';
})

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  var storage = window.localStorage;
  // var newNotes = [{title:'使用说明',content:'点击上方按钮以使用便签功能'},{title:'注意事项',content:'清除浏览器数据可能会删除便签内容, 请提前做好备份'}];
  // storage.setItem('xpqNotes', JSON.stringify(newNotes));
  var notes = JSON.parse(storage.getItem('xpqNotes'));
  var list = '';
  notes.forEach(function(ele) {
    list+='<li>'+ele.title+'</li>'
  }, this);
  todoList.innerHTML = list
}
else {
  // Too bad, no localStorage for us
}