// script.js

// DOM elements
const form = document.getElementById("add-task-form");
const taskNameInput = document.getElementById("task-name-input");
const taskLabelInput = document.getElementById("task-label-input");
const taskList = document.querySelector(".task-list");
const footer = document.querySelector("footer");
const footerContent = document.querySelector("footer p");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Persistência de dados
const TASKS_STORAGE_KEY = "tasks";

let tasks = [];

// Sanitiza input para prevenir injeção de caracteres perigosos
function sanitizeInput(value) {
  return value.trim().replace(/[<>\"']/g, "");
}

// Carrega tarefas do localStorage com tratamento de erro
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    tasks = savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Erro ao carregar tarefas do armazenamento:", error);
    tasks = [];
  }
}

// Salva tarefas no localStorage com validação de quota
function saveTasks() {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    if (error.name === "QuotaExceededError" || error.code === 22) {
      console.error("Limite de armazenamento local excedido.");
      alert("Limite de armazenamento atingido! Exclua algumas tarefas.");
    } else {
      console.error("Erro ao salvar tarefas:", error);
    }
  }
}

// Atualiza o contador do footer
function updateFooter() {
  const completedCount = tasks.filter((t) => t.completed).length;
  footerContent.textContent = `${completedCount} tarefa${
    completedCount !== 1 ? "s" : ""
  } concluída${completedCount !== 1 ? "s" : ""}`;

  deleteAllBtn.style.display = tasks.length > 0 ? "block" : "none";
}

// Cria o elemento de um card de tarefa
function createTaskElement(task, index) {
  const article = document.createElement("article");
  article.classList.add("task-card");
  if (task.completed) article.classList.add("completed");

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("task-content-wrapper");

  const header = document.createElement("div");
  header.classList.add("task-header");

  const h2 = document.createElement("h2");
  h2.textContent = task.name;

  header.appendChild(h2);

  const metadata = document.createElement("div");
  metadata.classList.add("task-metadata");

  const label = document.createElement("span");
  label.classList.add("task-label");
  label.textContent = task.label;

  const date = document.createElement("p");
  date.classList.add("task-date");
  // Para coerência visual, usamos data em PT-BR no display
  const timeElement = document.createElement("time");
  timeElement.setAttribute("datetime", task.dateISO);
  timeElement.textContent = task.date;

  const dateLabel = document.createTextNode("Criado em: ");
  date.appendChild(dateLabel);
  date.appendChild(timeElement);

  metadata.appendChild(label);
  metadata.appendChild(date);

  contentWrapper.appendChild(header);
  contentWrapper.appendChild(metadata);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("task-buttons");

  // Botão de concluir / concluído
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.setAttribute("type", "button");
  completeButton.setAttribute(
    "aria-pressed",
    task.completed ? "true" : "false"
  );
  completeButton.setAttribute(
    "title",
    task.completed ? "Tarefa concluída" : "Concluir tarefa"
  );

  // Define conteúdo e classe conforme estado
  if (task.completed) {
    completeButton.classList.add("complete-btn--done");
    completeButton.innerHTML = `<img src="assets/checked.svg" alt="Concluída" />`;
  } else {
    completeButton.textContent = "Concluir";
  }

  completeButton.addEventListener("click", () => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  });

  // Botão de deletar tarefa
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("title", "Deletar tarefa");
  deleteButton.setAttribute("aria-label", "Deletar tarefa");
  deleteButton.innerHTML = `<img src="assets/trash.svg" alt="Deletar" />`;

  // Confirma exclusão da tarefa
  deleteButton.addEventListener("click", () => {
    if (!confirm("Tem certeza que deseja deletar esta tarefa?")) return;
    deleteTask(index);
  });

  buttonsContainer.appendChild(completeButton);
  buttonsContainer.appendChild(deleteButton);

  article.appendChild(contentWrapper);
  article.appendChild(buttonsContainer);

  return article;
}

// Atualiza lista completa (renderização + persistência)
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const el = createTaskElement(task, index);
    taskList.appendChild(el);
  });
  updateFooter();
  saveTasks();
}

// Deleta uma tarefa específica
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Deleta todas as tarefas com confirmação
function deleteAllTasks() {
  if (tasks.length === 0) return;

  const confirmDelete = confirm(
    "Tem certeza que deseja deletar todas as tarefas? Esta ação não pode ser desfeita."
  );

  if (confirmDelete) {
    tasks = [];
    renderTasks();
  }
}

// Submissão do formulário: cria tarefa
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = sanitizeInput(taskNameInput.value);
  const label = sanitizeInput(taskLabelInput.value);

  if (!name || !label) {
    alert("Por favor, preencha nome e etiqueta da tarefa.");
    return;
  }

  const now = new Date();
  const dateISO = now.toISOString().split("T")[0];
  const dateDisplay = now.toLocaleDateString("pt-BR");

  const newTask = {
    name,
    label,
    dateISO,
    date: dateDisplay,
    completed: false,
  };

  tasks.push(newTask);

  taskNameInput.value = "";
  taskLabelInput.value = "";

  renderTasks();
});

deleteAllBtn.addEventListener("click", deleteAllTasks);

// Inicializa aplicação
loadTasks();
renderTasks();
