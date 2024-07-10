document.addEventListener('DOMContentLoaded', () => {
    // Функция для загрузки состояния из локального хранилища
    function loadState() {
        const state = localStorage.getItem('taskState');
        return state ? JSON.parse(state) : {};
    }

    // Функция для сохранения состояния в локальное хранилище
    function saveState(state) {
        localStorage.setItem('taskState', JSON.stringify(state));
    }

    // Загрузка состояния при загрузке страницы
    const state = loadState();

    // Восстановление состояния задач
    document.querySelectorAll('.task-button').forEach(button => {
        const taskId = button.getAttribute('Myauchello-data-task-id');
        if (state[taskId] && state[taskId].completed) {
            button.classList.add('completed');
            button.textContent = 'Выполнено';
            const listItem = button.closest('li');
            const counterSpan = listItem.querySelector('.counter');
            if (counterSpan) {
                counterSpan.textContent = state[taskId].counter;
                listItem.querySelectorAll('.counter-button').forEach(counterButton => {
                    counterButton.disabled = true;
                });
            }
        }
    });

    // Восстановление состояния счетчиков
    document.querySelectorAll('.counter').forEach(counterSpan => {
        const taskId = counterSpan.closest('li').querySelector('.task-button').getAttribute('Myauchello-data-task-id');
        if (state[taskId] && state[taskId].counter) {
            counterSpan.textContent = state[taskId].counter;
        }
    });

    // Переключение страниц для списков
    document.querySelectorAll('.page-button').forEach(button => {
        button.addEventListener('click', () => {
            const listContainer = button.closest('.list-container');
            const listId = button.dataset.listId;
            if (listContainer) {
                listContainer.querySelectorAll('.task-list').forEach(list => list.classList.remove('active'));
                listContainer.querySelector(`#task-list-${listId}-page-${button.dataset.page}`).classList.add('active');
            }
        });
    });

    // Управление выполнением задач и счетчиками
    document.querySelectorAll('.task-button').forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('Myauchello-data-task-id');
            const listItem = button.closest('li');
            const counterSpan = listItem.querySelector('.counter');

            let count = 0; // Объявляем переменную count здесь

            if (counterSpan) {
                count = parseInt(counterSpan.textContent.split('/')[1]);
            }

            if (button.classList.contains('completed')) {
                button.classList.remove('completed');
                button.textContent = 'Не выполнено';
                if (counterSpan) {
                    counterSpan.textContent = `0/${count}`;
                    listItem.querySelectorAll('.counter-button').forEach(counterButton => {
                        counterButton.disabled = false;
                    });
                }
                state[taskId] = { completed: false, counter: counterSpan ? `0/${count}` : null };
            } else {
                button.classList.add('completed');
                button.textContent = 'Выполнено';
                if (counterSpan) {
                    counterSpan.textContent = `${count}/${count}`;
                    listItem.querySelectorAll('.counter-button').forEach(counterButton => {
                        counterButton.disabled = true;
                    });
                }
                state[taskId] = { completed: true, counter: counterSpan ? `${count}/${count}` : null };
            }
            saveState(state);
        });
    });

    // Управление счетчиками
    document.querySelectorAll('.counter-button').forEach(button => {
        button.addEventListener('click', () => {
            const listItem = button.closest('li');
            const counterSpan = listItem.querySelector('.counter');
            const taskId = listItem.querySelector('.task-button').getAttribute('Myauchello-data-task-id');
            let [current, total] = counterSpan.textContent.split('/').map(Number);

            if (button.dataset.action === 'increment' && current < total) {
                current++;
            } else if (button.dataset.action === 'decrement' && current > 0) {
                current--;
            }

            counterSpan.textContent = `${current}/${total}`;

            const taskButton = listItem.querySelector('.task-button');
            if (current === total) {
                taskButton.classList.add('completed');
                taskButton.textContent = 'Выполнено';
                listItem.querySelectorAll('.counter-button').forEach(counterButton => {
                    counterButton.disabled = true;
                });
            } else {
                taskButton.classList.remove('completed');
                taskButton.textContent = 'Не выполнено';
                listItem.querySelectorAll('.counter-button').forEach(counterButton => {
                    counterButton.disabled = false;
                });
            }

            state[taskId] = { completed: current === total, counter: `${current}/${total}` };
            saveState(state);
        });
    });
});
