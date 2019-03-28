class Mark {
  constructor(object) {
    this.alive = object.alive
    this.name = object.name
    this.description = object.description
    this.imageUrl = object.image_url
    this.assassinId = object.assassin_id
    this.id = object.id
    this.catId = object.cat_id
  }

  get status(){
    if (this.alive){
      return "This issue has not been dealt with"
    }else{
      return `${this.name} is sleeping with the fishes`
    }
  }

  alternateStatus(){
    this.alive = !this.alive
  }

  renderProfile(){
    while(profile.firstChild){
      profile.removeChild(profile.firstChild)
    }

    let div = document.createElement('div')
    let name = document.createElement('h2')
    let picture = document.createElement('img')
    let description = document.createElement('p')
    let renderAssassinForm = document.createElement('button')
    let status = document.createElement('p')
    let deleteButton = document.createElement('button')

    name.textContent = this.name
    description.textContent = this.description
    status.textContent = this.status
    picture.src = this.imageUrl
    renderAssassinForm.textContent = "update assassin"
    renderAssassinForm.id = "assassin-button"
    deleteButton.textContent = "forgiven"
    deleteButton.id = "delete-mark"

    deleteButton.addEventListener('click', () =>{
      markAdapter.deleteItem(this.id).then(res => {
        if(res.ok){
          clearPage()
          hitList()
        }
      })
    })
    renderAssassinForm.addEventListener('click', () => {
      renderAssassinForm.style.display = 'none'
      this.renderForm.apply(this)
    })

    div.appendChild(name)
    div.appendChild(picture)
    div.appendChild(description)
    div.appendChild(renderAssassinForm)
    div.appendChild(status)
    div.appendChild(deleteButton)


    if (this.alive){
      let statusButton = document.createElement('button')
      let kill = function() {
        this.alive = !this.alive
        statusButton.remove();
        status.textContent = this.status
      }
      statusButton.textContent = "it has been handled"
      statusButton.addEventListener('click', kill.bind(this))
      div.appendChild(statusButton)
    }

    profile.appendChild(div)
  }

  renderLi(){
    let li = document.createElement('li')
    li.dataset.markId = this.id
    li.textContent = this.name
    li.addEventListener('click', this.renderShowPages.bind(this));
    list.appendChild(li);
  }

  renderShowPages(){
    this.renderProfile()
    assassinAdapter.fetchItem(this.assassinId).then(json => {
      let newAssassin = new Assassin(json)
      newAssassin.renderInformation()
    });
    alternateId = this.catId
  }

  async renderForm(){
    let form = document.createElement('form')
    await assassinAdapter.fetchItems().then( json => {
      json.forEach((assassin) => {
        let radio = document.createElement('input')
        let label = document.createElement('label')

        radio.type = 'radio'
        radio.value = assassin.id
        radio.name = "assassinId"

        label.textContent = assassin.name

        form.appendChild(radio)
        form.appendChild(label)
      })
    })
    let submit = document.createElement('input')
    submit.type = "submit"
    submit.value = "Submit"

    form.appendChild(submit)
    profile.appendChild(form)

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      document.getElementById('assassin-button').style.display = 'block'
      assassinAdapter.fetchItem(ev.target.assassinId.value).then(json => {
        let newAssassin = new Assassin(json)
        newAssassin.renderInformation()
      })
      this.assassinId = ev.target.assassinId.value
      markAdapter.updateItem(this.id, {assassin_id: this.assassinId})

      form.remove();
    });
  }

}
