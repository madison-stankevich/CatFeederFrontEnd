console.log("hello")
const list = document.getElementById('list');
const formContainer = document.getElementById('form-contianer')
const profile = document.getElementById('profile');
const information = document.getElementById('information');
const newMarkForm = document.getElementById('new-cat-form');
const formToggle = document.getElementById('form-toggle');
const modeToggle = document.getElementById('toggle');


const catAdapter = new Adapter('cats')
const markAdapter = new Adapter('marks')
const catFoodAdapter = new Adapter('cat_foods')
const assassinAdapter = new Adapter('assassins')

let alternateId = null

let catModeToggle = true
modeToggle.addEventListener('click', pageToggle)

catMode()

function pageToggle(){
  catModeToggle = !catModeToggle;
  if(catModeToggle){
    clearPage()
    catMode(alternateId)
  }else{
    clearPage()
    hitList(alternateId)
  }
}

function clearPage(){
  while(information.firstChild){
    information.removeChild(information.firstChild)
  }
  while(profile.firstChild){
    profile.removeChild(profile.firstChild)
  }
  while(list.firstChild){
    list.removeChild(list.firstChild)
  }
  while(formToggle.firstChild){
    formToggle.removeChild(formToggle.firstChild)
  }
}

function catMode(currentCatId = null){
  catAdapter.fetchItems().then(addItemsToList)

  async function addItemsToList(items){
    await items.forEach( item => {
      let cat = new Cat(item)
      cat.renderLi()
      if (cat.id === currentCatId){
        cat.renderShowPages()
      }
    })
  }
}

function hitList(currentMarkId = null){
  markAdapter.fetchItems().then(addItemsToList)

  async function addItemsToList(items){
    await items.forEach( item => {
      let mark = new Mark(item)
      mark.renderLi()
      if (mark.id === currentMarkId){
        mark.renderShowPages()
      }
    })
  }

  let newMarkButton = document.createElement('button')
  newMarkButton.textContent = "add new mark"
  formContainer.style.display = 'none'
  formToggle.appendChild(newMarkButton)

  let addMark = false;

  newMarkButton.addEventListener('click', () => {
    addMark = !addMark
    if (addMark){
      formContainer.style.display = 'block'
    }else{
      formContainer.style.display = 'none'
    }
  })

  newMarkForm.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    let newMark = {
      name: ev.target.name.value,
      image_url: ev.target.picture.value,
      description: ev.target.description.value,
      assassin_id: ev.target.assassinId.value
    }
    markAdapter.addItem(newMark).then(json => {
      let newMark = new Mark(json)
      newMark.renderLi()
    })
  })


  assassinAdapter.fetchItems().then( json => {
    json.forEach((assassin) => {
      let radio = document.createElement('input')
      let label = document.createElement('label')

      radio.type = 'radio'
      radio.value = assassin.id
      radio.name = "assassinId"

      label.textContent = assassin.name

      newMarkForm.appendChild(radio)
      newMarkForm.appendChild(label)
    })
    let submit = document.createElement('input')
    submit.type = "submit"
    submit.value = "Submit"

    newMarkForm.appendChild(submit)
  })
}
