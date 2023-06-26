const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

window.addEventListener("DOMContentLoaded", loadTodos);

addButton.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		addTodo();
	}
});

function addTodo() {
	const todoText = todoInput.value.trim();
	if (todoText !== "") {
	  const todos = getSavedTodos();
	  const newIndex = todos.length;
	  const todoItem = createTodoItem(todoText, newIndex);
	  todoList.appendChild(todoItem);
	  todoInput.value = "";
	  saveTodoToLocalStorage(todoItem);
	}
  }
  

function createTodoItem(text, index) {
	const listItem = document.createElement("li");
	listItem.innerHTML = `
      <div class="title">Todo ${index + 1}</div>
      <div class="functions">
        <i class="uil uil-pen"></i>
        <i class="uil uil-trash"></i>
        <i class="uil uil-angle-down"></i>
      </div>
      <div class="paragraph">${text}</div>
    `;
	if (todoList.children.length % 2 === 0) {
		listItem.classList.add("odd");
	} else {
		listItem.classList.add("even");
	}
	const paragraph = listItem.querySelector(".paragraph");
	const editButton = listItem.querySelector(".uil-pen");
	editButton.addEventListener("click", function () {
		paragraph.innerHTML = "";
	});
	const deleteButton = listItem.querySelector(".uil-trash");
	deleteButton.addEventListener("click", function () {
		listItem.remove();
		removeTodoFromLocalStorage(listItem);
	});
	return listItem;
}

function saveTodoToLocalStorage(todoItem) {
	const todoText = todoItem.querySelector(".paragraph").textContent;
	const todos = getSavedTodos();
	todos.push(todoText);
	localStorage.setItem("todos", JSON.stringify(todos));
  
	updateTodoIndexes();
  }
  

  function removeTodoFromLocalStorage(todoItem) {
	const todoText = todoItem.querySelector(".paragraph").textContent;
	const todos = getSavedTodos();
	const updatedTodos = todos.filter((todo) => todo !== todoText);
	localStorage.setItem("todos", JSON.stringify(updatedTodos));
  
	updateTodoIndexes();
  }

  function updateTodoIndexes() {
	const todoItems = todoList.querySelectorAll("li");
	todoItems.forEach((item, index) => {
	  const title = item.querySelector(".title");
	  title.textContent = `Todo ${index + 1}`;
	});
}
  
function loadTodos() {
	const todos = getSavedTodos();
	todos.forEach((todoText, index) => {
	  const todoItem = createTodoItem(todoText, index);
	  todoList.appendChild(todoItem);
	});
  }

function getSavedTodos() {
	const savedTodos = localStorage.getItem("todos");
	return savedTodos ? JSON.parse(savedTodos) : [];
}
