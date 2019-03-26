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

  makeLi(){
    let li = document.createElement('li')
    let name = document.createElement('h3')
    let picture = document.createElement('img')
    let description = document.createElement('p')
    let status = document.createElement('p')
    let statusButton = document.createElement('button')

    name.textContent = this.name
    description.textContent = this.description
    status.textContent = this.status
    picture.src = this.image_url
    statusButton.textContent = "feed this cat"

    statusButton.addEventListener('click', () =>{
      this.alternateStatus()
      status.textContent = this.status
    })

    li.appendChild(name)
    li.appendChild(picture)
    li.appendChild(description)
    li.appendChild(status)
    li.appendChild(statusButton)

    list.appendChild(li)

  }
}
