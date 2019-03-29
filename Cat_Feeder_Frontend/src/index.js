console.log("hello")
const list = document.getElementById('list');
const formContainer = document.getElementById('form-contianer')
const profile = document.getElementById('profile');
const information = document.getElementById('information');
const newMarkForm = document.getElementById('new-cat-form');
const formToggle = document.getElementById('form-toggle');
const modeToggle = document.getElementById('toggle');
const cssMode = document.getElementById('css-mode');
const updateCatFood = document.getElementById('update-information');

const navBar = document.getElementById('navBar')
const navBarStyle = document.getElementById('navBarStyle')
const navBarLogo = document.getElementById('navBarLogo')
const navBarButton = document.getElementById('navbar-button');

const catAdapter = new Adapter('cats')
const markAdapter = new Adapter('marks')
const catFoodAdapter = new Adapter('cat_foods')
const assassinAdapter = new Adapter('assassins')

let alternateId = null
let catModeToggle = true
catMode()

navBarButton.addEventListener('click', pageToggle)

function pageToggle(){
  catModeToggle = !catModeToggle;
  if(catModeToggle){
    clearPage()
    catMode(alternateId)
    alternateNavBar()
  }else{
    clearPage()
    hitList(alternateId)
    alternateNavBar()
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
  while(updateCatFood.firstChild){
    updateCatFood.removeChild(updateCatFood.firstChild)
  }
  if(document.getElementById('new-mark-button')){
    formToggle.removeChild(document.getElementById('new-mark-button'));
    formContainer.style.display = 'none'
  }
}

function catMode(currentCatId = null){
  catAdapter.fetchItems().then(addItemsToList)
  cssMode.href = 'css/catmode.css'

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
  cssMode.href = 'css/hitlist.css'

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
  newMarkButton.id = "new-mark-button"
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

}

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
  formContainer.style.display = 'none'
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

function alternateNavBar() {
  if(catModeToggle){
    navBarStyle.style = "background-color: #00E5EE;"
    navBarLogo.src = "./css/logos/WhitePawsLogo.png"
    navBarAppName.innerText = "Cat Feeder"
    navBarAppName.className = "appName"
  }else{
    navBarStyle.style = "background-color: #606363;"
    navBarLogo.src = "./css/logos/HitListLogo.png"
    navBarAppName.innerText = "The Hit List"
    navBarAppName.color = "white"

  }
}
