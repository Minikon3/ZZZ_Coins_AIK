document.addEventListener('DOMContentLoaded', () => {
    const mapModal = document.getElementById('map-modal');
    const chestModal = document.getElementById('chest-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const chestButtons = document.querySelectorAll('.chest-button');
    const chestIcons = document.querySelectorAll('.chest-icon');
    const chestRedIcons = document.querySelectorAll('.chest-red');
    const chestImage = document.getElementById('chest-image');
    const chestActionButton = document.getElementById('chest-action-button');
    
    // Пути к фотографиям сундуков
    const chestPhotos = {
        1: 'ver20/chests/chest1.jpg',
        2: 'ver20/chests/chest2.jpg',
        3: 'ver20/chests/chest3.jpg',
        4: 'ver20/chests/chest4.jpg',
        5: 'ver20/chests/chest5.jpg',
        6: 'ver20/chests/chest6.jpg'
    };
    
    let currentChestNumber = 0;

    // Загрузка состояния сундуков
    function loadChestsState() {
        const savedState = localStorage.getItem('chestsState');
        return savedState ? JSON.parse(savedState) : { foundChests: [], lastOpened: null };
    }

    // Сохранение состояния
    function saveChestsState(state) {
        localStorage.setItem('chestsState', JSON.stringify(state));
    }

    // Обновление интерфейса
    function updateFoundChests() {
        const state = loadChestsState();
        
        chestIcons.forEach(icon => {
            const chestNum = parseInt(icon.getAttribute('data-chest'));
            icon.classList.toggle('chest-found', state.foundChests.includes(chestNum));
        });
        
        chestButtons.forEach(button => {
            const chestNum = parseInt(button.getAttribute('data-chest'));
            const isFound = state.foundChests.includes(chestNum);
            button.classList.toggle('found', isFound);
            button.closest('li').querySelector('span').classList.toggle('task-completed', isFound);
        });
        
        updateProgress();
    }

    // Обновление прогресса
    function updateProgress() {
        const state = loadChestsState();
        document.getElementById('overall-progress').value = (state.foundChests.length / 6) * 100;
    }

    // Обновление кнопки действия
    function updateChestActionButton() {
        const isFound = loadChestsState().foundChests.includes(currentChestNumber);
        chestActionButton.textContent = isFound ? 'Снять отметку' : 'Отметить как найденный';
        chestActionButton.classList.toggle('found', isFound);
    }

    // Обработчики событий
    chestButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentChestNumber = parseInt(button.getAttribute('data-chest'));
            
            chestRedIcons.forEach(icon => icon.style.display = 'none');
            const redIcon = document.querySelector(`.chest-${currentChestNumber}-red`);
            if (redIcon) redIcon.style.display = 'block';
            
            mapModal.classList.add('show');
            
            const state = loadChestsState();
            state.lastOpened = currentChestNumber;
            saveChestsState(state);
        });
    });

    chestIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.stopPropagation();
            currentChestNumber = parseInt(icon.getAttribute('data-chest'));
            
            if (chestPhotos[currentChestNumber]) {
                chestImage.src = chestPhotos[currentChestNumber];
                chestModal.classList.add('show');
                updateChestActionButton();
            }
        });
    });

    chestActionButton.addEventListener('click', () => {
        const state = loadChestsState();
        const isFound = state.foundChests.includes(currentChestNumber);
        
        if (isFound) {
            state.foundChests = state.foundChests.filter(num => num !== currentChestNumber);
        } else {
            state.foundChests.push(currentChestNumber);
        }
        
        saveChestsState(state);
        updateFoundChests();
        chestModal.classList.remove('show');
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.target.closest('.modal').classList.remove('show');
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === mapModal) mapModal.classList.remove('show');
        if (event.target === chestModal) chestModal.classList.remove('show');
    });

    // Инициализация
    updateFoundChests();
});