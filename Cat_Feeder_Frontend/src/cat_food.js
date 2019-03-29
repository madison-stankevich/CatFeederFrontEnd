class catFood {
  constructor(object) {
    this.imageUrl = object.image_url
    this.name = object.name
    this.description = object.description
    this.price = object.price
  }

  renderInformation(){
    while(information.firstChild){
      information.removeChild(information.firstChild)
    }

    let picture = document.createElement('img')
    let name = document.createElement('h3')
    let description = document.createElement('p')

    picture.src = this.imageUrl
    picture.classList.add("information-image")
    name.textContent = `${this.name}: ${this.price}`
    description.textContent = this.description

    name.classList.add("infoName")
    description.classList.add("infoDescription")
    picture.classList.add("inforPic")

    information.appendChild(document.createElement("br"));
    information.appendChild(name)
    information.appendChild(picture)
    information.appendChild(description)
  }
}
