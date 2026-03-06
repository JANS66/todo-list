import { AppState } from '../logic/manager';
import { Todo } from '../logic/todo';
import { format, parseISO, isToday } from 'date-fns';

export const UI = {
    init() {
        const modal = document.querySelector('#todo-modal');
        const openBtn = document.querySelector('#open-modal-btn');
        const closeBtn = document.querySelector('#close-modal');
        const form = document.querySelector('#todo-form');

        openBtn.addEventListener('click', () => modal.showModal());
        closeBtn.addEventListener('click', () => modal.close());

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.querySelector('#form-title').value;
            const desc = document.querySelector('#form-desc').value;
            const date = document.querySelector('#form-date').value;
            const priority = document.querySelector('#form-priority').value;

            const newTodo = new Todo(title, desc, date, priority);

            AppState.addTodoToProject(0, newTodo);

            form.reset();
            modal.close();
            this.render();
        });
    },

    render() {
        const container = document.querySelector('#todo-container');
        container.innerHTML = '';

        const project = AppState.projects[0];

        project.todos.forEach((todo, index) => {
            let dateDisplay = todo.dueDate;
            if (todo.dueDate) {
                const dateObj = parseISO(todo.dueDate);
                dateDisplay = isToday(dateObj) ? 'Today' : format(dateObj, 'MMM do');
            }

            const card = document.createElement('div');
            card.className = `todo-card priority-${todo.priority.toLowerCase()}`;
            card.innerHTML = `
                <div class="todo-main">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="title">${todo.title}</span>
                    <span class="date">${dateDisplay}</span>
                    <button class="del-btn" data-index="${index}">X</button>
                </div>
            `;

            card.querySelector('.del-btn').onclick = () => {
                AppState.deleteTodoFromProject(0, todo.id);
                this.render();
            };

            container.appendChild(card);
        });
    }
};