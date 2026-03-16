# Modern Todo List

A clean, responsive project-based task manager built with vanilla JavaScript. Organize your work across multiple projects, manage tasks with priorities and due dates, and pick up right where you left off thanks to persistent localStorage storage.

---

## Features

- **Multiple projects** — create, switch between, and delete projects from a slide-out sidebar
- **Task management** — add, edit, delete, and complete tasks with title, description, due date, and priority
- **Expandable task cards** — click any card to reveal details inline; click again to collapse
- **Priority badges** — Low / Medium / High with color-coded labels
- **Date validation** — prevents setting due dates in the past
- **Persistent state** — all data is saved to `localStorage` and rehydrated on reload
- **Responsive design** — collapsible sidebar with mobile hamburger menu for screens under 768px

---

## Tech Stack

| Tool                      | Purpose                      |
| ------------------------- | ---------------------------- |
| Vanilla JS (ES Modules)   | App logic                    |
| Webpack 5                 | Bundling & dev server        |
| `html-webpack-plugin`     | HTML templating              |
| `mini-css-extract-plugin` | CSS extraction               |
| `date-fns`                | Date formatting & validation |
| CSS custom properties     | Theming                      |
| Prettier                  | Code formatting              |

---

## Project Structure

```
src/
├── index.js              # Entry point — wires state, DOM, and events
├── index.html            # HTML shell with <template> elements
├── style.css             # Global styles & responsive layout
├── models/
│   ├── project.js        # Project class (name, id, todos[])
│   └── todo.js           # Todo class (title, description, dueDate, priority, complete)
└── modules/
    ├── state.js          # App state, pub/sub, and all mutations
    ├── storage.js        # localStorage persistence + class rehydration
    ├── dom.js            # Pure render functions (projects, todos, dialog)
    ├── events.js         # Event delegation setup
    └── controller.js     # Validation logic bridging events ↔ state
```

### Architecture

The app follows a unidirectional data flow:

```
User Interaction
      ↓
  events.js  (listens, delegates)
      ↓
controller.js  (validates input)
      ↓
   state.js  (mutates data, notifies)
      ↓
    dom.js  (re-renders UI)
```

State changes trigger a `notify()` call that saves to `localStorage` and fires all registered subscriber callbacks. The single subscriber in `index.js` re-renders both the project list and the active todo list on every change.

---

## Getting Started

### Prerequisites

- Node.js v16+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm start
```

Starts the Webpack dev server at `http://localhost:8080` with live reloading.

### Build

```bash
npm run build
```

Outputs production-ready files to `dist/`.

---

## Code Style

Prettier is configured via `.prettierrc`:

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "tabWidth": 2
}
```

Run `npx prettier --write src/` to format all source files.

---

## Key Implementation Notes

**Dialog system** — a single `<dialog>` element is reused for all modal interactions (new task, edit task, new project, delete confirmation, alerts). `renderDialog()` in `dom.js` clears and re-populates it from `<template>` elements on each open.

**Event delegation** — rather than attaching listeners to individual cards or buttons, all clicks are handled at the list-container level and routed by class name or `closest()` traversal.

**Class rehydration** — `localStorage` stores plain JSON. On load, `storage.js` reconstructs full `Project` and `Todo` class instances so that methods like `toggleComplete()` and `addTodo()` remain available.
