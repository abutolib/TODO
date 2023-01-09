const elForm = document.querySelector('.js-form')
const elList = document.querySelector('.js-list')
const elInput = document.querySelector('.js-input');
const newDeleteBtn = document.querySelector('.js-delete-btn')
const newEditBtn = document.querySelector('.js-edit-btn')
const newChBtn = document.querySelector('.js-edit-btn')
const elCheckbox = document.querySelector('.js-checkbox')

const elAllCount = document.querySelector('.js-all-count')
const elCompletedCount = document.querySelector('.js-completed-count')
const elUncompletedCount = document.querySelector('.js-uncompleted-count')

const elAllBtns= document.querySelector('.js-btns')

const localData = JSON.parse(window.localStorage.getItem('todos'))

const todos = localData || [];


const renderTodo = (array,node)=>{
  window.localStorage.setItem('todos',JSON.stringify(todos))

  elAllCount.textContent = todos.length
  elCompletedCount.textContent = todos.filter((item) => item.isCompleted).length;
  elUncompletedCount.textContent = todos.filter((item) => !item.isCompleted).length
  
  node.innerHTML = '';
  
  array.forEach((item)=> {
    const newItem = document.createElement('li');
    const newInput = document.createElement('input')
    const newSpan = document.createElement('span')
    const newEditBtn = document.createElement('button')
    const newDeleteBtn = document.createElement('button')
    
    newItem.setAttribute('class','list-group-item d-flex align-items-center ');
    newInput.setAttribute('class','form-check-input me-3 js-chechbox');
    newSpan.setAttribute('class','flex-grow-1')
    newEditBtn.setAttribute('class','btn btn-warning me-2 js-edit-btn')
    newDeleteBtn.setAttribute('class','btn btn-danger js-delete-btn')
    
    newSpan.textContent = item.text;
    newInput.type = 'checkbox';
    newEditBtn.textContent = "EDIT";
    newDeleteBtn.textContent = "DELETE";
    
    newDeleteBtn.dataset.todoId = item.id;
    newEditBtn.dataset.todoId = item.id;
    newInput.dataset.todoId = item.id;
    
    
    newItem.appendChild(newInput);
    newItem.appendChild(newSpan);
    newItem.appendChild(newEditBtn);
    newItem.appendChild(newDeleteBtn);
    
    if(item.isCompleted){
      newInput.checked = true;
      newSpan.style.textDecoration = 'line-through';
    }
    
    node.appendChild(newItem);  
  });
}
 
renderTodo(todos,elList)

elList.addEventListener('click',function(evt){
  evt.preventDefault();
  if(evt.target.matches('.js-delete-btn')){
    const todoId = evt.target.dataset.todoId;
    
    const findedIndex = todos.findIndex((item) => item.id == todoId)

    todos.splice(findedIndex,1);
    renderTodo(todos,elList);
  }

  if(evt.target.matches('.js-edit-btn')){
    const todoId = evt.target.dataset.todoId;

    const findedItem = todos.find((item) => item.id == todoId)

    const newTodo = prompt("Yangi todo kiriting:",findedItem.text)

    findedItem.text = newTodo;

    renderTodo(todos,elList);
  }

  if(evt.target.matches('.js-chechbox')){

    const todoId = evt.target.dataset.todoId;

    const findedItem = todos.find((item) => item.id == todoId)
    findedItem.isCompleted = !findedItem.isCompleted;

    renderTodo(todos,elList);
  }
})

elForm.addEventListener('submit',function(evt){
  evt.preventDefault();

  const newTodo = {
    id : todos.length ? todos[todos.length - 1].id + 1 : 1 ,
    text : elInput.value,
    isCompleted : false,
  }

  elInput.value ='';
  todos.push(newTodo);

  renderTodo(todos,elList);

  

})


elAllBtns.addEventListener('click',function(evt){
  if(evt.target.matches('.js-all')){
    renderTodo(todos,elList)
  }
  if(evt.target.matches('.js-completed')){
    const filteredTodos = todos.filter((item) => item.isCompleted)
    renderTodo(filteredTodos,elList)
  }
  if(evt.target.matches('.js-uncompleted')){
    const filteredTodos = todos.filter((item) => !item.isCompleted)
    renderTodo(filteredTodos,elList)
  }
  if(evt.target.matches('.js-delete-all')){
    window.localStorage.removeItem('todos');
    renderTodo(todos,elList);
  }

})