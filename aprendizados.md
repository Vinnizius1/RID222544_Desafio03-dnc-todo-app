##  HTML Semântico vs. "Div Soup"

Use tags semânticas (`<article>`, `<header>`, `<footer>`) em vez de excesso de `<div>`. Isso melhora:
- Legibilidade do código
- Acessibilidade e SEO
- Possibilidade de layout com Flexbox/Grid direto nas tags semânticas

**Regra:** `<div>` apenas quando não houver tag semântica apropriada.

---

##  Sistema de Espaçamento (1rem = 10px)

Com `font-size: 62.5%` no `:root`, use múltiplos de 0.4rem:
- `0.8rem` = 8px (padding padrão)
- `1.2rem` = 12px (gaps)
- `1.6rem` = 16px (gaps maiores)
- `2.4rem` = 24px (containers)

Mantém harmonia visual e facilita ajustes futuros.

---

##  Tipografia e Cores

**Google Fonts:** Use `<link preconnect>` antes do import para melhor performance. Carregue apenas os pesos necessários (ex: `wght@400;500;600;700`).

**Paleta:**
- **Azul primário:** `#2d70fd` (botões principais)
- **Vermelho:** `#d32f2f` (ações destrutivas)
- **Texto:** `#001747` (alto contraste)
- **Cinza:** `#b1bacb` (metadados)

---

##  Detalhes que Fazem Diferença

1. **`box-sizing: border-box`**  Padding e border não aumentam a largura
2. **Letter-spacing negativo** (`-0.3px`) em títulos  Aparência mais refinada
3. **Sombras leves** (`box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08)`)  Profundidade
4. **Transições suaves** (`0.2s ease`)  Feedback visual sem delay
5. **Feedback visual em interações**  Hover, focus, active com `transform` e cores

---

##  Mobile-First com Flexbox

- Mobile: `flex-direction: column`
- Desktop: `flex-direction: row` com `@media (min-width: 1024px)`

Sem necessidade de múltiplas media queries.

---

##  Padrão Reutilizável

Este projeto serve como base para CRUD simples com:
- HTML semântico + BEM leve (`.task-card`, `.complete-btn`)
- CSS com sistema de espaçamento consistente
- LocalStorage para persistência
- Padrão mobile-first
