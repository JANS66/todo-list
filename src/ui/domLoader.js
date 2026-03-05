import { AppState } from '../logic/manager';

export const UI = {
    render() {
        const root = document.querySelector('#content');
        root.innerHTML = '';

        AppState.projects.forEach((project, pIndex) => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-card';
            projectDiv.innerHTML = `<h2>${project.name}</h2>`;

            const todoList = document.createElement('div');

            project.todos.forEach((todo) => {
                const todoCard = document.createElement('div');
                todoCard.className = `todo-card priority-${todo.priority.toLowerCase()}`;
                todoCard.id = `todo=${todo.id}`;

                todoCard.innerHTML = `
                    <div class="todo-summary">
                        <span class="title">${todo.title}</span>
                        <span class="date">${todo.dueDate}</span>
                        <button class="expand-btn">Details</button>
                        <button class="delete-btn" data-p="${pIndex}" data-t=${todo.id}">Delete</button>
                    </div>
                    <div class="todo-details hidden">
                        <p><strong>Description:</strong>${todo.description}</p>
                        <p><strong>Notes:</strong>${todo.notes}</p>
                        <button class="edit-btn">Edit (Not Implemented)</button>
                    </div>
                `;

                todoCard.querySelector('.expand-btn').onclick = () => {
                    todoCard.querySelector('.todo-details').classList.toggle('hidden');
                };

                todoCard.querySelector('.delete-btn').onclick = (e) => {
                    const pIdx = e.target.dataset.p;
                    const tId = e.target.dataset.t;
                    AppState.projects[pIdx].removeTodo(parseInt(tId));
                    this.render();
                };

                todoList.appendChild(todoCard);
            });

            projectDiv.appendChild(todoList);
            root.appendChild(projectDiv);
        });
    }
}