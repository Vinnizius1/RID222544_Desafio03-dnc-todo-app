// script.js

// Seletores principais
const form = document.getElementById("add-task-form");
const taskNameInput = document.getElementById("task-name-input");
const taskLabelInput = document.getElementById("task-label-input");
const taskList = document.querySelector(".task-list");
const footer = document.querySelector("footer");
const footerContent = document.querySelector("footer p");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Chave para localStorage
const TASKS_STORAGE_KEY = "tasks";

// Estado das tarefas (array de objetos)
let tasks = [];

// Carrega tarefas do localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  // Se existe algo no localStorage, carrega, senão inicia com array vazio
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
}

// Salva tarefas no localStorage
function saveTasks() {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

// Atualiza o contador do footer
function updateFooter() {
  const completedCount = tasks.filter((t) => t.completed).length;
  footerContent.textContent = `${completedCount} tarefa${
    completedCount !== 1 ? "s" : ""
  } concluída${completedCount !== 1 ? "s" : ""}`;

  // Mostra ou esconde botão de deletar todas conforme há tarefas
  deleteAllBtn.style.display = tasks.length > 0 ? "block" : "none";
}

// Cria o elemento de um card de tarefa
function createTaskElement(task, index) {
  const article = document.createElement("article");
  article.classList.add("task-card");
  if (task.completed) article.classList.add("completed");

  // Conteúdo
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
  date.innerHTML = `Criado em: <time datetime="${task.dateISO}">${task.date}</time>`;

  metadata.appendChild(label);
  metadata.appendChild(date);

  contentWrapper.appendChild(header);
  contentWrapper.appendChild(metadata);

  // Container de botões
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

  // Alterna o estado ao clicar
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

  // Remove a tarefa ao clicar
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

// Renderiza toda a lista
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

  const name = taskNameInput.value.trim();
  const label = taskLabelInput.value.trim();

  if (!name || !label) {
    alert("Por favor, preencha nome e etiqueta da tarefa.");
    return;
  }

  // Data em dois formatos: ISO para atributo e exibida em PT-BR
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

// Event listener para deletar todas as tarefas
deleteAllBtn.addEventListener("click", deleteAllTasks);

// Inicializa
loadTasks();
renderTasks();
