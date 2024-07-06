document.addEventListener('DOMContentLoaded', function() {
    const taskButtons = document.querySelectorAll('.task-button');

    // Load saved tasks from localStorage
    taskButtons.forEach(button => {
        const taskId = button.getAttribute('data-task-id');
        const taskStatus = localStorage.getItem(`task-${taskId}`);
        if (taskStatus === 'done') {
            button.textContent = 'Выполнено';
            button.classList.add('done');
        }
    });

    // Add event listeners to task buttons
    taskButtons.forEach(button => {
        button.addEventListener('click', function() {
            const taskId = this.getAttribute('data-task-id');
            if (this.classList.contains('done')) {
                this.textContent = 'Не выполнено';
                this.classList.remove('done');
                localStorage.setItem(`task-${taskId}`, 'not-done');
            } else {
                this.textContent = 'Выполнено';
                this.classList.add('done');
                localStorage.setItem(`task-${taskId}`, 'done');
            }
        });
    });
});
