class Cat {
  constructor(object) {
    this.hungry = object.alive
    this.name = object.name
    this.description = object.description
    this.imageUrl = object.image_url
    this.catFoodId = object.cat_food_id
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

    renderCatFoodForm.addEventListener('click', this.renderForm)

    div.appendChild(name)
    div.appendChild(picture)
    div.appendChild(description)
    div.appendChild(renderCatFoodForm)
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

  async renderForm(){
    let form = document.createElement('form')
    await catFoodAdapter.fetchItems().then( json => {
      json.forEach((catFood) => {
        debugger
        let radio = document.createElement('input')
        radio.type = 'radio'
        radio.value = catFood.id
        let label = document.createElement('label')
        label.textContent = catFood.name
        form.appendChild(radio)
        form.appendChild(label)
      })
    })
    let submit = document.createElement('input')
    submit.type = "submit"
    submit.value = "Submit"
    form.appendChild(submit)
    profile.appendChild(form)
  }

  renderLi(){
    let li = document.createElement('li')

    li.textContent = this.name

    li.addEventListener('click', () =>{
      this.renderProfile()
      catFoodAdapter.fetchItem(this.catFoodId).then(json => {
        let newCatFood = new catFood(json)
        newCatFood.renderInformation()
      });
    });

    list.appendChild(li);
  }


}
