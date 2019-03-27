class catFood {
  constructor(object) {
    this.imageUrl = object.image_url
    this.name = object.name
    this.description = object.description
  }

  renderInformation(){
    while(information.firstChild){
      information.removeChild(information.firstChild)
    }

    let picture = document.createElement('img')
    let name = document.createElement('h3')
    let description = document.createElement('p')

    picture.src = this.imageUrl
    name.textContent = this.name
    description.textContent = this.description

    information.appendChild(name)
    information.appendChild(picture)
    information.appendChild(description)
  }
}