console.log("hello")
const list = document.getElementById('list');
const profile = document.getElementById('profile');
const information = document.getElementById('information');

const catAdapter = new Adapter('cats')
const catFoodAdapter = new Adapter('cat_foods')

catAdapter.fetchItems().then(addItemsToList)

function addItemsToList(items){
  items.forEach( item => {
    let cat = new Cat(item)
    cat.renderLi()
    // cat.renderProfile()
  })
}
