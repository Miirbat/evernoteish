class Note {
  constructor(title, body, id) {
     this.title = title
     this.body = body
     this.id = id
   }

   renderShortNote() {
     return(
       `<a class="item note">
        <li data-id=${this.id}>
        ${this.title}:<br>
        ${this.body.slice(0,30)}...
       </li>
       </a>`
        )
      }

}
