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
            modal.style.display = 'block';
            updateNavigationButtons();
            updateImageCounter();
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
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

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
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
});
