console.log("hello")
const list = document.getElementById('list');
const profile = document.getElementById('profile');

catAdapter = new Adapter('cats')

catAdapter.fetchItems().then(addItemsToList)

function addItemsToList(items){
  items.forEach( item => {
    let cat = new Cat(item)
    cat.renderLi()
    // cat.renderProfile()
  })
}
