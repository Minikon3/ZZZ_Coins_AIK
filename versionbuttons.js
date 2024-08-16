function switchVersion(version) {
    // Скрываем все контейнеры версий
    document.querySelectorAll('.version-container').forEach(container => {
        container.style.display = 'none';
    });

    // Показываем выбранный контейнер версии
    const selectedContainer = document.querySelector(`.version-container[data-version="${version}"]`);
    // Определяем нужное значение display в зависимости от ширины экрана
    if (window.innerWidth <= 768) {
        selectedContainer.style.display = 'block';  // Мобильные устройства
        selectedContainer.style.width = '100%'
    } else {
        selectedContainer.style.display = 'flex';   // Десктопы
    }
}

// Привязка события к кнопкам
document.querySelectorAll('.version-button').forEach(button => {
    button.addEventListener('click', () => {
        const version = button.getAttribute('data-version');
        switchVersion(version);

        // Сохраняем выбранную версию в localStorage
        localStorage.setItem('selectedVersion', version);
    });
});

// Восстанавливаем версию при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const savedVersion = localStorage.getItem('selectedVersion') || '1.0';
    switchVersion(savedVersion);
});
// Обработчик для изменения ориентации устройства или изменения размера окна
window.addEventListener('resize', () => {
    const savedVersion = localStorage.getItem('selectedVersion') || '1.0';
    switchVersion(savedVersion);
});
