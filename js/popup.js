var createBtn = $('#xpqCreateNewNote');
var backBtn = $('#xpqBackHomeBtn');
var homeContainer = $('#xpqHomeContainer');
var notesDetailContainer = $('#xpqNotesDetailContainer');

createBtn.click(function(e){
  homeContainer.css('marginLeft','-400px');
})

backBtn.click(function(e){
  homeContainer.css('marginLeft','0px');
})
