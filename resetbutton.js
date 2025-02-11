// Находим кнопку сброса прогресса
const resetButton = document.getElementById('reset-progress');

// Обработчик нажатия на кнопку
resetButton.addEventListener('click', () => {
    // Подтверждение сброса прогресса
    const isConfirmed = confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.');
    if (isConfirmed) {
        // Удаляем данные из локального хранилища
        localStorage.removeItem('levels');
        localStorage.removeItem('strategies');

        // Перезагружаем страницу
        location.reload();
    }
});