const form = document.querySelector("form");
const input = document.querySelector(".todo-input");
const ul = document.querySelector(".todo-list");
const filterBtns = document.querySelectorAll(".filter-button");

// function to create a new todo item
function createTodo() {
  // create a new li element
  const li = document.createElement("li");
  li.classList.add("todo");

  // create a new span element for the todo text
  const span = document.createElement("span");
  span.innerText = input.value.trim();
  li.appendChild(span);

  // create a new button for completing the todo item
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.classList.add("complete-btn");
  li.appendChild(completeBtn);

  // create a new button for deleting the todo item
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  li.appendChild(trashBtn);

  // add the new todo item to the ul
  ul.appendChild(li);

  // clear the input field
  input.value = "";
}

// add an event listener to the form to create a new todo item
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createTodo();
});

// function to delete a todo item
function deleteTodoItem(item) {
  const todo = item.parentElement;
  todo.classList.add("fall");
  todo.addEventListener("transitionend", () => {
    todo.remove();
  });
}

// function to complete a todo item
function completeTodoItem(item) {
  const todo = item.parentElement;
  todo.classList.toggle("complete");
}

// add event listeners to the ul for deleting and completing todo items
ul.addEventListener("click", (e) => {
  const item = e.target;
  if (item.classList.contains("trash-btn")) {
    deleteTodoItem(item);
  } else if (item.classList.contains("complete-btn")) {
    completeTodoItem(item);
  }
});

// function to filter the todo items
function filterTodoItems(e) {
  const todos = ul.children;
  for (const todo of todos) {
    switch (e.target.classList[1]) {
      case "all-filter":
        todo.style.display = "flex";
        break;
      case "complete-filter":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "not-complete-filter":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        todo.style.display = "flex";
        break;
    }
  }
}

// add event listeners to the filter buttons
for (const btn of filterBtns) {
  btn.addEventListener("click", filterTodoItems);
}
