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
    while(updateCatFood.firstChild){
      updateCatFood.removeChild(updateCatFood.firstChild)
    }

    let div = document.createElement('div')
    let name = document.createElement('h2')

    let pictureConatiner = document.createElement('div')
    let picture = document.createElement('img')
    let pictureOverlay = document.createElement('img')

    let description = document.createElement('p')
    let renderAssassinForm = document.createElement('button')
    let status = document.createElement('p')
    let deleteButton = document.createElement('button')

    name.textContent = this.name
    description.textContent = this.description
    status.textContent = this.status
    picture.src = this.imageUrl
    pictureOverlay.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/1024px-Red_X.svg.png"
    picture.classList.add("profile-image")
    renderAssassinForm.textContent = "update assassin"
    renderAssassinForm.id = "assassin-button"
    deleteButton.textContent = "forgiven"
    deleteButton.id = "delete-mark"

    deleteButton.classList.add("btn-success")
    deleteButton.classList.add("btn")
    deleteButton.classList.add("markModeButtons")


    renderAssassinForm.classList.add("btn-danger")
    renderAssassinForm.classList.add("btn")
    renderAssassinForm.classList.add("markModeButtons")

    name.classList.add("nameProfileHL")
    picture.classList.add("profile-image")
    pictureOverlay.className = "mark-overlay"
    pictureConatiner.className = "container"
    description.classList.add("descriptionProfileHL")
    profile.classList.add("statusProfileHL")

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
    pictureConatiner.appendChild(picture)
    pictureConatiner.appendChild(pictureOverlay)
    div.appendChild(pictureConatiner)
    div.appendChild(description)
    updateCatFood.appendChild(renderAssassinForm)
    div.appendChild(status)
    div.appendChild(deleteButton)


    if (this.alive){
      let statusButton = document.createElement('button')
      pictureOverlay.className = "hidden-overlay"
      let kill = function() {
        this.alive = !this.alive
        statusButton.remove();
        renderAssassinForm.remove();
        deleteButton.remove();
        pictureOverlay.className = "mark-overlay"
        status.textContent = this.status
        markAdapter.updateItem(this.id, {alive: false})
      }
      statusButton.textContent = "This has been handled"
      statusButton.classList.add("btn-danger")
      statusButton.classList.add("btn")
      statusButton.classList.add("markModeButtons")


      statusButton.addEventListener('click', kill.bind(this))
      div.appendChild(statusButton)
    }else{
      renderAssassinForm.remove();
      deleteButton.remove();
    }

    profile.appendChild(div)
  }

  renderLi(){
    let li = document.createElement('li')
    let thumbnail = document.createElement('img')
    let name = document.createElement('span')

    li.className = "nameLiHL"
    name.className = "nameLiTextHL"

    thumbnail.src = this.imageUrl
    thumbnail.classList.add('thumbnail')
    name.textContent = this.name

    li.addEventListener('click', this.renderShowPages.bind(this));

    li.appendChild(thumbnail);
    li.appendChild(name);
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

        label.textContent = `.        ${assassin.name}`

        form.appendChild(radio);
        form.appendChild(label);
        form.appendChild(document.createElement("br"));

      })
    })
    let submit = document.createElement('input')
    submit.type = "submit"
    submit.value = "Submit"

    submit.classList.add("btn-danger")
    submit.classList.add("btn")
    submit.classList.add("markModeButtons")


    form.appendChild(submit)
    updateCatFood.appendChild(form)

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
