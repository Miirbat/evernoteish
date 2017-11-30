// const notesList = new NotesList()
const adapter = new Adapter()

$(document).ready(
  function(){
  $(".new-note").hide()
  $("#whole-note").hide()
  $("#editing-notes").hide()
  $("#success").hide()
  $("#home-img").hide()
  newNoteButtonListener()
  createNote()
  adapter.getNotes(successCallbackGet)
  selectingANote()
  editEventListener()
  editNote()
  showHomeImg()
  deleteNote()
})

function showHomeImg(){
  $('#home-button').on("click", function(e){
    e.preventDefault()
    $("#whole-notes").hide()
    $("#editing-notes").hide()
    $(".new-note").hide()
    $("#home-img").show()
  })
}

function newNoteButtonListener(){
  $('#new-note-btn').on("click", function(e){
    e.preventDefault();
    $("#home-img").hide()
    $("#editing-notes").hide()
    $("#whole-notes").hide()
    $(".new-note").show()
  })
}

function createNote() {
  $('#create-note').on("submit", function(e) {
    e.preventDefault()
    $("#home-img").hide()
    let noteTitle = $('#create-note #noteTitle').val()
    let noteBody = $('#create-note #noteBody').val()
    adapter.postNote(noteTitle, noteBody, successCallbackPost)
    $('#create-note #noteTitle').val('')
    $('#create-note #noteBody').val('')
    $(".new-note").hide()
  })
}

  function successCallbackPost() {
    adapter.getNotes(successCallbackGet)
  }

  function successCallbackGet(data){
    let notesList = new NotesList()
    let idizzle = data[data.length-1].id
    let noteTitle = data[data.length-1].title
    let noteBody = data[data.length-1].body
    let obj = {id: idizzle, title: noteTitle, body: noteBody}
    data.forEach(
      noteItem => {
        notesList.addNote(noteItem.title, noteItem.body, noteItem.id)
    })
    $("#notes-list" ).html(notesList.renderShortNotesList());
    $("#whole-notes").show()
    $("#whole-notes").html(notesList.renderWholeNote(obj))
  }

function selectingANote(){
  $('ul#notes-list').on("click",".note", function(e){
    e.preventDefault()
    $("#home-img").hide()
    $("#editing-notes").hide()
    $(".new-note").hide()
    $("#whole-notes").show()
     if (e.target === e.currentTarget){
       return;
     }
    let idizzle = parseInt(e.target.dataset.id)
    adapter.getOneNote(idizzle, successCallbackGetWholeNote)
  })
}

function successCallbackGetWholeNote(data){
  let noteList = new NotesList()
  $("#whole-notes").html(noteList.renderWholeNote(data))
  $( "#editing-notes" ).html(noteList.renderEditNote(data))
}

function editEventListener(){
  $('#whole-notes').on("click",'#edit-note', function(e){
    $('#whole-notes').hide()
    $("#editing-notes").show()
  })
}

function editSuccessCallback(data){
  $("#success").show().fadeOut( "slow", function() {});
  $("#editing-notes").hide()
  adapter.getNotes(fillList)
}

function editNote(){
  $("#editing-notes").on("click", "#send-edited-note", function(e){
    e.preventDefault()
    let idizzle = parseInt(e.target.dataset.id)
    let noteTitle = $('#editing-notes #noteTitle').val()
    let noteBody = $('#myTextArea').val()
    adapter.editNote(idizzle, noteTitle, noteBody, editSuccessCallback)
  })
}

// function getLastId(data){
//   let idizzle = data[data.length-1].id
//   let noteTitle = data[data.length-1].title
//   let noteBody = data[data.length-1].body
//   let obj = {id: idzzle, title: noteTitle, body: noteBody}
//   renderWholeNote(obj)
// }

function deleteNote(){
  $('#whole-notes').on("click",'#delete-note', function(e){
    e.preventDefault()
    let idizzle = parseInt(e.target.dataset.id)
    adapter.deleteNote(idizzle, deleteSuccessCallback)
  })
}

function deleteSuccessCallback () {
  $("#whole-notes").hide()
  $("#home-img").show()
  adapter.getNotes(fillList)
}

function fillList(data){
  let notesList = new NotesList()
  data.forEach(noteItem => {
      notesList.addNote(noteItem.title, noteItem.body, noteItem.id)
  })
  $("#notes-list" ).html(notesList.renderShortNotesList());
}
