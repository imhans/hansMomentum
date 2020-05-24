const todoForm = document.querySelector(".js-todoForm"),
todoInput = todoForm.querySelector("input"),
UL_todoList = document.querySelector(".todoList");

const LS_TODOs = "To-do List"; //To-do List Local Storage
const ARRAY_ToDos = [];

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    UL_todoList.removeChild(li);``
    
    let itemIndex = ARRAY_ToDos.findIndex(function getIndex(toDo) {
        return toDo.id === parseInt(li.id)
    }); //This method gets the index of array that has to get removed
    ARRAY_ToDos.splice(itemIndex, 1);
    saveTodos();
}

function saveTodos() { //Save & Update To-do List Local Storage
    localStorage.setItem(LS_TODOs, JSON.stringify(ARRAY_ToDos));
}

function createTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = getRandomInt(999)
    delBtn.innerText = "✅";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.id = newId;

    const todoObj = {
        id: newId,
        text: text
    }

    li.appendChild(delBtn);
    li.appendChild(span);
    UL_todoList.appendChild(li);
    ARRAY_ToDos.push(todoObj);
    saveTodos();
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    createTodo(currentValue);
    todoInput.value = "";
}

function loadTodo() {
    const storedTodos = localStorage.getItem(LS_TODOs);
    if (storedTodos !== null) { //Load to-do list stored in the LocalStorage
        const parsedTodos = JSON.parse(storedTodos); //LS_TODOs is parsed as an array of object from a string
        parsedTodos.forEach(function(toDo) {
            createTodo(toDo.text);
        });
    }
}

function init() {
    loadTodo();
    todoForm.addEventListener("submit", handleTodoSubmit);
}
init();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}