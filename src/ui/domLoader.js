import { AppState } from '../logic/manager';
import { Todo } from '../logic/todo';
import { format, parseISO, isToday } from 'date-fns';

export const UI = {
    init() {
        const modal = document.querySelector('#todo-modal');
        const openBtn = document.querySelector('#open-modal-btn');
        const closeBtn = document.querySelector('#close-modal');
        const form = document.querySelector('#todo-form');
        const projectBtn = document.querySelector('#add-project-btn');

        projectBtn.onclick = () => {
            const name = prompt("Enter Project Name:");
            if (name) {
                AppState.addProject(name);
                this.render();
            }
        };

        openBtn.addEventListener('click', () => modal.showModal());
        closeBtn.addEventListener('click', () => modal.close());

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.querySelector('#form-title').value;
            const desc = document.querySelector('#form-desc').value;
            const date = document.querySelector('#form-date').value;
            const priority = document.querySelector('#form-priority').value;

            const newTodo = new Todo(title, desc, date, priority);
            AppState.addTodoToProject(AppState.activeProjectIndex, newTodo);

            form.reset();
            modal.close();
            this.render();
        });
    },

    render() {
        this.renderSidebar();
        this.renderTodos();
    },

    renderSidebar() {
        const list = document.querySelector('#project-list');
        list.innerHTML = '';

        AppState.projects.forEach((proj, index) => {
            const btn = document.createElement('button');
            btn.textContent = proj.name;
            btn.className = index === AppState.activeProjectIndex ? 'active' : '';
            btn.onclick = () => {
                AppState.activeProjectIndex = index;
                this.render();
            };
            list.appendChild(btn);
        });
    },

    renderTodos() {
        const container = document.querySelector('#todo-container');
        const title = document.querySelector('#current-project-title');
        const project = AppState.projects[AppState.activeProjectIndex];

        title.textContent = project.name;
        container.innerHTML = '';

        project.todos.forEach((todo) => {
            let dateDisplay = todo.dueDate;

            if (todo.dueDate) {
                try {
                    const dateObj = parseISO(todo.dueDate);
                    dateDisplay = isToday(dateObj) ? 'Today' : format(dateObj, 'MMM do');
                } catch (e) {
                    dateDisplay = todo.dueDate;
                }
            }

            const card = document.createElement('div');
            card.className = `todo-card priority-${todo.priority.toLowerCase()}`;

            card.innerHTML = `
                <input type="checkbox" class="status-check" ${todo.isComplete ? 'checked' : ''}>
                <span class="${todo.isComplete ? 'completed' : ''}">${todo.title}</span>
                <span class="todo-date">${dateDisplay}</span>
                <button class="del-btn">x</button>
            `;

            card.querySelector('.status-check').onchange = () => {
                AppState.toggleTodoStatus(AppState.activeProjectIndex, todo.id);
                this.render();
            };

            card.querySelector('.del-btn').onclick = () => {
                AppState.deleteTodoFromProject(AppState.activeProjectIndex, todo.id);
                this.render();
            };

            container.appendChild(card);
        });
    }
};