const API_URL = "http://localhost:8080/todos";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [];

async function fetchTodos() {
  const response = await fetch(API_URL);
  todos.push(...(await response.json()));
  renderTodos();
}

function renderTodos() {
  const todoList: HTMLUListElement | null = document.getElementById(
    "todo-list"
  ) as HTMLUListElement;

  if (!todoList) return;

  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className =
      "bg-gray-100 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out";
    li.innerHTML = `
                    <div class="todo-content flex items-center justify-between p-4">
                        <div class="flex items-center space-x-3 flex-grow">
                            <input id={todo.id} type="checkbox" ${
                              todo.completed ? "checked" : ""
                            } onchange="toggleComplete(${
      todo.id
    }, this.checked)" class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out">
                            <label for={todo.id} class="todo-text ${
                              todo.completed
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }">${todo.title}</label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="startEdit(this.closest('li'), ${
                              todo.id
                            })" class="edit-btn text-blue-500 hover:text-blue-600">Edit</button>
                            <button onclick="deleteTodo(${
                              todo.id
                            })" class="text-red-500 hover:text-red-600">Delete</button>
                        </div>
                    </div>
                    <div class="edit-content hidden p-4 bg-blue-100">
                        <input type="text" class="edit-input w-full p-2 mb-2 border rounded" value="${
                          todo.title
                        }">
                        <div class="flex justify-end space-x-2">
                            <button onclick="saveEdit(this.closest('li'), ${
                              todo.id
                            })" class="save-btn bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">Done</button>
                            <button onclick="cancelEdit(this.closest('li'))" class="cancel-btn bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded">Cancel</button>
                        </div>
                    </div>
                `;
    todoList.appendChild(li);
  });
}

async function addTodo(title: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: Date.now().toString(),
      title,
      completed: false,
    }),
  });
  if (response.ok) {
    // fetchTodos();
    todos.push({ id: Date.now().toString(), title, completed: false });
  }
}

function startEdit(li: HTMLLIElement, id: string) {
  const todoContent = li.querySelector(".todo-content") as HTMLElement;
  const editContent = li.querySelector(".edit-content") as HTMLElement;

  todoContent.classList.add("hidden");
  editContent.classList.remove("hidden");
}

async function saveEdit(li: HTMLLIElement, id: string) {
  const editInput = li.querySelector(".edit-input") as HTMLInputElement;
  const newTitle = editInput.value.trim();
  if (newTitle) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    if (response.ok) {
      fetchTodos();
    }
  }
}

function cancelEdit(li: HTMLLIElement): void {
  const todoContent = li.querySelector(".todo-content");
  const editContent = li.querySelector(".edit-content");

  if (todoContent && editContent) {
    // type guarding
    todoContent.classList.remove("hidden");
    editContent.classList.add("hidden");
  }
}

async function deleteTodo(id: string) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (response.ok) {
    fetchTodos();
  }
}

async function toggleComplete(id: string, completed: boolean) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (response.ok) {
    fetchTodos();
  }
}

(function () {
  const todoForm = document.getElementById("todo-form") as HTMLFormElement;
  const todoInput = document.getElementById("todo-input") as HTMLInputElement;

  if (todoForm && todoInput) {
    todoForm.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      if (todoInput.value.trim()) {
        addTodo(todoInput.value.trim());
        todoInput.value = "";
      }
    });

    fetchTodos();
  }
})();
