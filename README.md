# Gerenciador de Tarefas

Um aplicativo moderno e intuitivo para gerenciar suas tarefas do dia a dia. Com interface limpa, HTML semântico, CSS responsivo e JavaScript funcional.

---

## Live Demo & Figma

- **Live Site**: Abra `index.html` localmente no seu navegador
- **Figma Design**: [Acesse o protótipo do projeto](https://www.figma.com/design/GZzqLg5ATOLfOh7Ea7Guee/Desafio---Board-de-Tarefas-DNC?node-id=1-49&t=gEFDeujY2VrhSM6S-1)

---

## Tecnologias & Conceitos

Este projeto foi construído com as seguintes tecnologias e conceitos:

- **HTML5**: Marcação semântica e acessível
- **CSS3**: Estilização moderna com propriedades customizadas
- **Flexbox**: Para layout flexível e robusto
- **JavaScript Vanilla**: Sem dependências, 100% puro
- **LocalStorage**: Para persistência de dados no navegador
- **Responsive Design**: Adaptável a todos os dispositivos
- **Mobile-First**: Desenvolvido primeiramente para mobile

---

## Critérios de Avaliação

Este projeto atende aos seguintes critérios de avaliação da DNC:

- **Semântica HTML5**: Uso correto de tags como `<header>`, `<footer>`, `<main>`, `<article>`
- **Responsividade**: Site testado e funcional de 320px (mobile) até 2560px (ultrawide)
- **Unidades Relativas**: Todas as medidas usam `rem` para escalabilidade
- **Funcionalidades**: Todas as operações CRUD (Create, Read, Update, Delete) implementadas
- **Boas Práticas**: Código limpo, comentários claros, e responsabilidade única das funções

---

## Funcionalidades

### Recursos Principais

**Criar Tarefas** Adicione novas tarefas com nome e etiqueta
**Marcar Concluídas** Clique para completar/desconcluir tarefas
**Deletar Tarefas** Remova tarefas individuais com confirmação
**Deletar Todas** Limpe todas as tarefas em um clique
**Contador Dinâmico** Acompanhe quantas tarefas foram concluídas
**Persistência de Dados** Suas tarefas são salvas no localStorage
**Interface Responsiva** Funciona perfeitamente em qualquer tela

---

## Fluxo da Aplicação

Para uma documentação detalhada sobre o fluxo completo da aplicação, incluindo diagramas visuais e estados, consulte [FLOW.md](FLOW.md).

---

## Funções Principais

| Função                | Descrição                                  |
| --------------------- | ------------------------------------------ |
| `loadTasks()`         | Carrega tarefas do localStorage            |
| `saveTasks()`         | Salva tarefas no localStorage              |
| `renderTasks()`       | Renderiza lista completa + atualiza footer |
| `createTaskElement()` | Cria o HTML de um card de tarefa           |
| `updateFooter()`      | Atualiza contador de tarefas concluídas    |
| `deleteTask(index)`   | Remove uma tarefa específica               |
| `deleteAllTasks()`    | Remove todas as tarefas (com confirmação)  |

---

## Destaques Técnicos

```

### JavaScript Funcional
- Sem jQuery ou frameworks
- DOM manipulado com seletores simples
- Event listeners bem organizados
- Funções com responsabilidade única

### CSS Moderno
- Flexbox para layouts flexíveis
- Unidades `rem` para escalabilidade
- Mobile-first approach
- Transições suaves
- Sombras leves para profundidade

---

##  Identificação

**Desafio**: 03 - Gerenciador de Tarefas

TODO: TERMINAR AQUI

---

##  Próximos Passos

Possíveis melhorias e extensões:

- [ ] Adicionar filtros (todas, concluídas, pendentes)
- [ ] Drag and drop entre tarefas
- [ ] Editar tarefas existentes
- [ ] Categorias com cores diferentes
- [ ] Busca e filtro por nome
- [ ] Sincronização com banco de dados
- [ ] Modo escuro
- [ ] Notificações
```
