document.addEventListener('DOMContentLoaded', () => {
    const mapModal = document.getElementById('map-modal');
    const chestModal = document.getElementById('chest-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const chestButtons = document.querySelectorAll('.chest-button');
    const chestIcons = document.querySelectorAll('.chest-icon');
    const chestRedIcons = document.querySelectorAll('.chest-red');
    const chestImage = document.getElementById('chest-image');
    const chestActionButton = document.getElementById('chest-action-button');
    
    const chestPhotos = {
        1: 'ver20/chests/chest1.jpg',
        2: 'ver20/chests/chest2.jpg',
        3: 'ver20/chests/chest3.jpg',
        4: 'ver20/chests/chest4.jpg',
        5: 'ver20/chests/chest5.jpg',
        6: 'ver20/chests/chest6.jpg'
    };
    
    let currentChestNumber = 0;

    function loadChestsState() {
        const savedState = localStorage.getItem('chestsState');
        return savedState ? JSON.parse(savedState) : { foundChests: [], lastOpened: null };
    }

    function saveChestsState(state) {
        localStorage.setItem('chestsState', JSON.stringify(state));
    }

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
        
        // Обновляем общий прогресс
        updateTotalProgress();
    }

    function updateTotalProgress() {
        const state = loadChestsState();
        const foundFaylum = state.foundChests.length;
        const totalFaylum = 6;
        
        // Получаем данные из второй системы
        let foundCentral = 0;
        let totalCentral = 0;
        
        document.querySelectorAll('.location-list li').forEach(li => {
            const progressText = li.querySelector('.progress-text').textContent;
            const [current, total] = progressText.split('/').map(Number);
            foundCentral += current;
            totalCentral += total;
        });
        
        const totalFound = foundFaylum + foundCentral;
        const totalMarkers = totalFaylum + totalCentral;
        
        document.getElementById('overall-progress').value = totalMarkers > 0 ? 
            (totalFound / totalMarkers) * 100 : 0;
    }

    function updateChestActionButton() {
        const isFound = loadChestsState().foundChests.includes(currentChestNumber);
        chestActionButton.textContent = isFound ? 'Снять отметку' : 'Отметить как найденный';
        chestActionButton.classList.toggle('found', isFound);
    }

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
        
        // Закрываем оба модальных окна
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
    
    // Добавляем глобальную функцию для обновления общего прогресса
    window.updateTotalProgress = function() {
        const state = loadChestsState();
        const foundFaylum = state.foundChests.length;
        const totalFaylum = 6;
        
        let foundCentral = 0;
        let totalCentral = 0;
        
        document.querySelectorAll('.location-list li').forEach(li => {
            const progressText = li.querySelector('.progress-text').textContent;
            const [current, total] = progressText.split('/').map(Number);
            foundCentral += current;
            totalCentral += total;
        });
        
        const totalFound = foundFaylum + foundCentral;
        const totalMarkers = totalFaylum + totalCentral;
        
        document.getElementById('overall-progress').value = totalMarkers > 0 ? 
            (totalFound / totalMarkers) * 100 : 0;
    };

    // Первоначальное обновление
    updateTotalProgress();
});