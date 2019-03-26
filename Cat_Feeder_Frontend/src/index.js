console.log("hello")
const list = document.getElementById('list');

fetch('http://localhost:3000/api/v1/cats')
  .then(res => res.json())
  .then(json => addItemsToList(json))

function addItemsToList(items){
  items.forEach( item => {
    let cat  = new Cat(item)
    makeLi(cat)
  })
}
