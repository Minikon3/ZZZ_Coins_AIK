document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("screenshot-modal");
    const modalContent = modal.querySelector(".modal-content");
    const modalImage = document.getElementById("modal-image");
    const zoomRange = document.getElementById("zoom-range");
    const closeButton = document.querySelector(".close-button");
    const navigationButtons = document.querySelector(".navigation-buttons");

    // Установить сохранённый масштаб
    const savedZoom = localStorage.getItem("imageZoom") || 1;
    zoomRange.value = savedZoom;
    updateModalAndImageSize(savedZoom);

    // Событие изменения масштаба
    zoomRange.addEventListener("input", (event) => {
        const zoomValue = parseFloat(event.target.value); // Масштаб изображения
        updateModalAndImageSize(zoomValue);
        localStorage.setItem("imageZoom", zoomValue); // Сохраняем масштаб изображения
    });

    // Функция обновления размеров изображения и модального окна
    function updateModalAndImageSize(zoomValue) {
        // Масштабируем изображение
        modalImage.style.transform = `scale(${zoomValue*0.8})`;

        // Обновляем высоту контейнера кнопок
        const imageHeight = modalImage.getBoundingClientRect().height;
        navigationButtons.style.marginTop = `${imageHeight * 0.05}px`; // Отступ кнопок (5% от высоты изображения)

        // Вычисляем масштаб для модального окна
        const modalZoomFactor = 1 + (zoomValue - 1) * 2; // УВЕЛИЧИНЫЙ ШАГ!

        // Вычислить новые размеры модального окна
        const baseWidth = 600; // Базовая ширина контента
        const baseHeight = 400; // Базовая высота контента
        const padding = 80; // Дополнительный отступ внутри модального окна

        const newWidth = baseWidth * modalZoomFactor + padding;
        const newHeight = baseHeight * modalZoomFactor + padding;

        // Применить размеры к модальному контенту
        modalContent.style.width = `${newWidth}px`;
        modalContent.style.height = `${newHeight}px`;
    }
});
