document.addEventListener('DOMContentLoaded', () => {
    // Функция для сброса всех переменных и перезагрузки страницы
    function resetAndReload() {
        localStorage.removeItem('taskState');
        // Очищаем все задачи и счетчики на странице
        document.querySelectorAll('.task-button').forEach(button => {
            button.classList.remove('completed');
            button.textContent = 'Не выполнено';
        });
        document.querySelectorAll('.counter').forEach(counterSpan => {
            counterSpan.textContent = '0/0';
        });
        // Перезагружаем страницу
        location.reload();
    }

    // Кнопка для сброса состояния
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Сбросить все задачи и обновить страницу';
    resetButton.addEventListener('click', () => {
        resetAndReload();
    });

    // Добавляем кнопку в конец body
    document.body.appendChild(resetButton);
});
