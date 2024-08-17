document.querySelectorAll('.task-button').forEach(button => {
    button.addEventListener('click', function() {
        this.textContent = this.textContent === 'Не выполнено' ? 'Выполнено' : 'Не выполнено';
        updateProgress();
    });
});

function updateProgress() {
    // Обновление прогресса для каждого списка
    document.querySelectorAll('.list-container').forEach(container => {
        const tasks = container.querySelectorAll('.task-button');
        const completedTasks = Array.from(tasks).filter(task => task.textContent === 'Выполнено').length;
        const progress = (completedTasks / tasks.length) * 100;

        const progressBar = container.querySelector('.list-progress');
        const progressPercentage = container.querySelector('.list-progress-percentage');

        if (progressBar) { // Проверяем, существует ли элемент progressBar
            progressBar.value = progress;
        }
        if (progressPercentage) { // Проверяем, существует ли элемент progressPercentage
            progressPercentage.textContent = `${Math.round(progress)}%`;
        }
    });

    // Обновление общего прогресса
    const allTasks = document.querySelectorAll('.task-button');
    const allCompletedTasks = Array.from(allTasks).filter(task => task.textContent === 'Выполнено').length;
    const overallProgress = (allCompletedTasks / allTasks.length) * 100;

    const overallProgressBar = document.getElementById('overall-progress');
    const overallProgressPercentage = document.getElementById('overall-progress-percentage');

    if (overallProgressBar) { // Проверяем, существует ли элемент overallProgressBar
        overallProgressBar.value = overallProgress;
    }
    if (overallProgressPercentage) { // Проверяем, существует ли элемент overallProgressPercentage
        overallProgressPercentage.textContent = `${Math.round(overallProgress)}%`;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    updateProgress();
});
    