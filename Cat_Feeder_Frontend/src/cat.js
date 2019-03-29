class Cat {
  constructor(object) {
    this.hungry = object.alive
    this.name = object.name
    this.description = object.description
    this.imageUrl = object.image_url
    this.catFoodId = object.cat_food_id
    this.id = object.id
    this.markId = object.mark_id
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
    while(updateCatFood.firstChild){
      updateCatFood.removeChild(updateCatFood.firstChild)
    }

    let div = document.createElement('div')
    let name = document.createElement('h2')
    let picture = document.createElement('img')
    let description = document.createElement('p')
    let renderCatFoodForm = document.createElement('button')
    let status = document.createElement('p')

    name.textContent = this.name
    description.textContent = this.description
    status.textContent = this.status
    picture.src = this.imageUrl
    renderCatFoodForm.textContent = "update favorite food"
    renderCatFoodForm.id = "cat-food-button"

    name.classList.add("nameProfile")
    picture.classList.add("profile-image")
    description.classList.add("descriptionProfile")
    profile.classList.add("statusProfile")

    renderCatFoodForm.addEventListener('click', () => {
      renderCatFoodForm.style.display = 'none'
      this.renderForm.apply(this)
    })

    div.appendChild(name)
    div.appendChild(picture)
    div.appendChild(description)
    updateCatFood.appendChild(renderCatFoodForm)
    div.appendChild(status)


    if (this.hungry){
      let statusButton = document.createElement('button')
      let feed = function() {
        this.hungry = !this.hungry;
        statusButton.remove();
        status.textContent = this.status;
        markAdapter.updateItem(this.markId, {alive: false})
      }
      statusButton.textContent = "feed this cat"
      statusButton.addEventListener('click', feed.bind(this))
      div.appendChild(statusButton)
    }
    profile.appendChild(div)
  }

  renderLi(){
    let li = document.createElement('li')
    let thumbnail = document.createElement('img')
    let name = document.createElement('span')

    li.className = "nameLi"
    name.className = "nameLiText"

    thumbnail.src = this.imageUrl
    thumbnail.classList.add('thumbnail')
    name.textContent = `         ${this.name}`

    li.addEventListener('click', this.renderShowPages.bind(this));

    li.appendChild(thumbnail)
    li.appendChild(name)
    list.appendChild(li);
  }

  renderShowPages(){
    this.renderProfile()
    catFoodAdapter.fetchItem(this.catFoodId).then(json => {
      let newCatFood = new catFood(json)
      newCatFood.renderInformation()
    });
    alternateId = this.markId
  }

  async renderForm(){
    let form = document.createElement('form')

    await catFoodAdapter.fetchItems().then( json => {
      json.forEach((catFood) => {
        let radio = document.createElement('input')
        let label = document.createElement('label')

        radio.type = 'radio'
        radio.value = catFood.id
        radio.name = "catFoodId"

        label.textContent = `  ${catFood.name}`

        form.appendChild(radio);
        form.appendChild(label);
        form.appendChild(document.createElement("br"));
      })
    })
    let submit = document.createElement('input')
    submit.type = "submit"
    submit.value = "Submit"

    form.appendChild(submit)
    updateCatFood.appendChild(form)

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      document.getElementById('cat-food-button').style.display = 'block'
      catFoodAdapter.fetchItem(ev.target.catFoodId.value).then(json => {
        let newCatFood = new catFood(json)
        newCatFood.renderInformation()
      })
      this.catFoodId = ev.target.catFoodId.value
      catAdapter.updateItem(this.id, {cat_food_id: this.catFoodId})

      form.remove();
    });
  }

}
