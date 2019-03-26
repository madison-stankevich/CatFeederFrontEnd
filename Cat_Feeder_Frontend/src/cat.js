class Cat {
  constructor(object) {
    this.hungry = object.alive
    this.name = object.name
    this.description = object.description
    this.imageUrl = object.image_url
  }

  get status(){
    if (this.hungry){
      return "This cat has not been fed"
    }else{
      return "This cat has been fed"
    }
  }

  alternateStatus(){
    this.hungry = !this.hungry
  }

  renderProfile(){
    while(profile.firstChild){
      profile.removeChild(profile.firstChild)
    }

    let div = document.createElement('div')
    let name = document.createElement('h3')
    let picture = document.createElement('img')
    let description = document.createElement('p')
    let status = document.createElement('p')

    name.textContent = this.name
    description.textContent = this.description
    status.textContent = this.status
    picture.src = this.imageUrl

    div.appendChild(name)
    div.appendChild(picture)
    div.appendChild(description)
    div.appendChild(status)

    if (this.hungry){
      let statusButton = document.createElement('button')
      statusButton.textContent = "feed this cat"
      statusButton.addEventListener('click', () =>{
        this.hungry = !this.hungry
        statusButton.remove();
        status.textContent = this.status
      })
      div.appendChild(statusButton)
    }


    profile.appendChild(div)
  }

  renderLi(){
    let li = document.createElement('li')

    li.textContent = this.name

    li.addEventListener('click', () =>{
      this.renderProfile()
    })

    list.appendChild(li);
  }


}
