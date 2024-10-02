"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "http://localhost:8080/todos";
const todos = [];
function fetchTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        todos.push(...(yield response.json()));
        renderTodos();
    });
}
function renderTodos() {
    const todoList = document.getElementById("todo-list");
    if (!todoList)
        return;
    todoList.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className =
            "bg-gray-100 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out";
        li.innerHTML = `
                    <div class="todo-content flex items-center justify-between p-4">
                        <div class="flex items-center space-x-3 flex-grow">
                            <input id={todo.id} type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleComplete(${todo.id}, this.checked)" class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out">
                            <label for={todo.id} class="todo-text ${todo.completed
            ? "line-through text-gray-500"
            : "text-gray-800"}">${todo.title}</label>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="startEdit(this.closest('li'), ${todo.id})" class="edit-btn text-blue-500 hover:text-blue-600">Edit</button>
                            <button onclick="deleteTodo(${todo.id})" class="text-red-500 hover:text-red-600">Delete</button>
                        </div>
                    </div>
                    <div class="edit-content hidden p-4 bg-blue-100">
                        <input type="text" class="edit-input w-full p-2 mb-2 border rounded" value="${todo.title}">
                        <div class="flex justify-end space-x-2">
                            <button onclick="saveEdit(this.closest('li'), ${todo.id})" class="save-btn bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">Done</button>
                            <button onclick="cancelEdit(this.closest('li'))" class="cancel-btn bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded">Cancel</button>
                        </div>
                    </div>
                `;
        todoList.appendChild(li);
    });
}
function addTodo(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL, {
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
    });
}
function startEdit(li, id) {
    const todoContent = li.querySelector(".todo-content");
    const editContent = li.querySelector(".edit-content");
    todoContent.classList.add("hidden");
    editContent.classList.remove("hidden");
}
function saveEdit(li, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const editInput = li.querySelector(".edit-input");
        const newTitle = editInput.value.trim();
        if (newTitle) {
            const response = yield fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle }),
            });
            if (response.ok) {
                fetchTodos();
            }
        }
    });
}
function cancelEdit(li) {
    const todoContent = li.querySelector(".todo-content");
    const editContent = li.querySelector(".edit-content");
    if (todoContent && editContent) {
        // type guarding
        todoContent.classList.remove("hidden");
        editContent.classList.add("hidden");
    }
}
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (response.ok) {
            fetchTodos();
        }
    });
}
function toggleComplete(id, completed) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed }),
        });
        if (response.ok) {
            fetchTodos();
        }
    });
}
(function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    if (todoForm && todoInput) {
        todoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (todoInput.value.trim()) {
                addTodo(todoInput.value.trim());
                todoInput.value = "";
            }
        });
        fetchTodos();
    }
})();
