class Adapter {
  constructor(){}

  getNotes(callback){
    fetch("http://localhost:3000/api/v1/notes")
    .then(response => response.json())
    .then(callback)
    .catch(error => console.log(error))
  }

  postNote(title, noteBody, callback) {
    fetch("http://localhost:3000/api/v1/notes", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: 1,
        title: title,
        body: noteBody
      })
    })
    .then(response => response.json())
    .then(callback)
    .catch(error => console.log(error))
  }

  getOneNote(id, callback){
    const url = "http://localhost:3000/api/v1/notes/"
    fetch(url + id)
    .then(response => response.json())
    .then(callback)
    .catch(error => console.log(error))
  }

  editNote(id, noteTitle, noteBody, callback){
    const url = `http://localhost:3000/api/v1/notes/${id}`
    fetch(url, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: 1,
        title: noteTitle,
        body: noteBody
      })
    })
    .then(response => response.json())
    .then(function(data){
      console.log(data)
    })
    .then(callback)
    .catch(error => console.log(error))
  }

  deleteNote(id, callback) {
    const url = `http://localhost:3000/api/v1/notes/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(callback)
  }
}
