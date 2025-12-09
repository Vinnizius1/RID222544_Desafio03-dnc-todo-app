// script.js

// Seletores principais
const form = document.getElementById("add-task-form");
const taskNameInput = document.getElementById("task-name-input");
const taskLabelInput = document.getElementById("task-label-input");
const taskList = document.querySelector(".task-list");
const footer = document.querySelector("footer p");

// Chave para localStorage
const TASKS_STORAGE_KEY = "tasks";

// Estado das tarefas (array de objetos)
let tasks = [];

// Carrega tarefas do localStorage ou usa dados padrão
function loadTasks() {
  const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  } else {
    // Dados padrão para primeira visualização
    tasks = [
      {
        name: "Implementar tela de listagem de tarefas",
        label: "Frontend",
        dateISO: "2025-12-03",
        date: "03/12/2025",
        completed: true,
      },
      {
        name: "Implementar botão de concluir tarefa",
        label: "Frontend",
        dateISO: "2025-12-03",
        date: "03/12/2025",
        completed: false,
      },
    ];
  }
}

// Salva tarefas no localStorage
function saveTasks() {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

// Atualiza o contador do footer
function updateFooter() {
  const completedCount = tasks.filter((t) => t.completed).length;
  footer.textContent = `${completedCount} tarefa${
    completedCount !== 1 ? "s" : ""
  } concluída${completedCount !== 1 ? "s" : ""}`;
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

  // Botão de concluir / concluído
  const button = document.createElement("button");
  button.classList.add("complete-btn");
  button.setAttribute("type", "button");
  button.setAttribute("aria-pressed", task.completed ? "true" : "false");
  button.setAttribute(
    "title",
    task.completed ? "Tarefa concluída" : "Concluir tarefa"
  );

  // Define conteúdo e classe conforme estado
  if (task.completed) {
    button.classList.add("complete-btn--done");
    button.innerHTML = `<img src="assets/checked.svg" alt="Concluída" />`;
  } else {
    button.textContent = "Concluir";
  }

  // Alterna o estado ao clicar
  button.addEventListener("click", () => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  });

  article.appendChild(contentWrapper);
  article.appendChild(button);

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

// Inicializa
loadTasks();
renderTasks();
