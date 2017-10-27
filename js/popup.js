'use strict'

var createBtn = document.querySelector('#xpqCreateNewNote');
var backBtn = document.querySelector('#xpqBackHomeBtn');
var homeContainer = document.querySelector('#xpqHomeContainer');
var notesDetailContainer = document.querySelector('#xpqNotesDetailContainer');

createBtn.addEventListener('click',function(e){
  homeContainer.style.marginLeft = '-400px';
})

backBtn.addEventListener('click',function(e){
  homeContainer.style.marginLeft = '0px';
})