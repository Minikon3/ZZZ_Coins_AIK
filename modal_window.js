document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('screenshot-modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const imageCounter = document.getElementById('image-counter');
    
    let currentImages = [];
    let currentIndex = 0;

    document.querySelectorAll('.screenshot-button').forEach(button => {
        button.addEventListener('click', () => {
            currentImages = button.getAttribute('data-screenshots').split(',');
            currentIndex = 0;
            showImage();
            modal.classList.add('show'); // Добавляем класс для показа модального окна с анимацией
            updateNavigationButtons();
            updateImageCounter();
        });
    });

    closeButton.addEventListener('click', () => {
        closeModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage();
        updateImageCounter();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage();
        updateImageCounter();
    });

    function showImage() {
        modalImage.src = currentImages[currentIndex];
    }

    function updateNavigationButtons() {
        if (currentImages.length > 1) {
            prevButton.style.display = 'inline-block';
            nextButton.style.display = 'inline-block';
        } else {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    function updateImageCounter() {
        imageCounter.textContent = `Изображение ${currentIndex + 1} из ${currentImages.length}`;
    }

    function closeModal() {
        modal.classList.remove('show'); // Убираем класс "show" для скрытия
    }
});
