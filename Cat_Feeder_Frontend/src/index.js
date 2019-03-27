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

let catMode = true
modeToggle.addEventListener('click', () =>{
  catMode = !catMode;
  if(catMode){
    list clear
    profile clear
    information clear
    formToggle clear
    call catfeeder
  }else{
    list clear
    profile clear
    information clear
    formToggle clear
    call hitlist
  }
})
// catAdapter.fetchItems().then(addItemsToList)
//
// async function addItemsToList(items){
//   await items.forEach( item => {
//     let cat = new Cat(item)
//     cat.renderLi()
//     // cat.renderProfile()
//   })
//   list.appendChild(newCatButton)
// }
//
// let newCatButton = document.createElement('button')
// newCatButton.textContent = "add new cat"
// formContainer.style.display = 'none'
//
// let addCat = false;
//
// newCatButton.addEventListener('click', () => {
//   addCat = !addCat
//   if (addCat){
//     formContainer.style.display = 'block'
//   }else{
//     formContainer.style.display = 'none'
//   }
// })
//
// newCatForm.addEventListener('submit', (ev)=>{
//   ev.preventDefault();
//   let newCat = {
//     name: ev.target.name.value,
//     image_url: ev.target.picture.value,
//     description: ev.target.description.value,
//     assassin_id: ev.target.catFoodId.value
//   }
//   markAdapter.addItem(newCat).then(json => {
//     let newCat = new Cat(json)
//     newCat.renderLi()
//   })
// })
//
//
// catFoodAdapter.fetchItems().then( json => {
//   json.forEach((catFood) => {
//     let radio = document.createElement('input')
//     let label = document.createElement('label')
//
//     radio.type = 'radio'
//     radio.value = catFood.id
//     radio.name = "catFoodId"
//
//     label.textContent = catFood.name
//
//     newCatForm.appendChild(radio)
//     newCatForm.appendChild(label)
//   })
//   let submit = document.createElement('input')
//   submit.type = "submit"
//   submit.value = "Submit"
//
//   newCatForm.appendChild(submit)
// })
function hitList(){
  markAdapter.fetchItems().then(addItemsToList)

  async function addItemsToList(items){
    await items.forEach( item => {
      let mark = new Mark(item)
      mark.renderLi()
      // cat.renderProfile()
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
