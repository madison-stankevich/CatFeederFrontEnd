class Assassin {
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
    picture.classList.add("information-image")
    let name = document.createElement('h3')
    let description = document.createElement('p')

    name.classList.add("favFoodName")
    description.classList.add("infoDescription")
    picture.classList.add("inforPic")

    picture.src = this.imageUrl
    name.textContent = `${this.name}: ${this.price}`
    description.textContent = this.description

    information.appendChild(name)
    information.appendChild(picture)
    information.appendChild(description)
  }
}
