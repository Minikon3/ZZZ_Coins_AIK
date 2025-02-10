document.addEventListener('DOMContentLoaded', () => {
    const strategies = {
        search: "Стратегия поиска резонаторов",
        treasure: "Стратегия охоты за сокровищами",
        armament: "Стратегия полного вооружения",
        business: "Бизнес-стратегия",
        recovery: "Стратегия восстановления",
        raiders: "Стратегия хитрых рейдеров",
        defense: "Стратегия стойкой обороны",
        risks: "Стратегия осознания рисков",
        reinforcement: "Стратегия подкрепления"
    };

    const items = [
        "[Суперспособность] Ритмический энергосберегатель",
        "[Суперспособность] Мешочек энергии Ци",
        "[Ловкость] Энергетический щит ловкости",
        "[Ловкость] Талисман пяти миров",
        "[Аномалия - Устрашение] Эликсир хаоса",
        "[Аномалия - Устрашение] Пушка для стрельбы растворителем",
        "[Стойкость] Дощечка с заклинанием",
        "[Стойкость] Тактическая аптечка"
    ];

    const gridContainer = document.querySelector('.grid-container');
    const statusMessage = document.querySelector('.status-message');
    const strategyButtons = document.querySelectorAll('.strategy-button');

    let currentStrategy = 'search';

    // Загружаем данные из локального хранилища
    const savedData = JSON.parse(localStorage.getItem('strategies')) || {};

    // Инициализируем данные для стратегий, если их нет
    Object.keys(strategies).forEach(strategy => {
        if (!savedData[strategy]) {
            savedData[strategy] = {};
            items.forEach(item => {
                savedData[strategy][item] = 1; // По умолчанию уровень 1
            });
        }
    });

    // Сохраняем данные в локальное хранилище
    localStorage.setItem('strategies', JSON.stringify(savedData));

    // Функция для отображения карточек
    function renderCards(strategy) {
        gridContainer.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', `${strategy}-${item}`);
            card.innerHTML = `
                <img src="lostvoidpics/${item.replace(/[\[\]]/g, '').toLowerCase()}.jpg" alt="${item}">
                <h3>${item}</h3>
                <div class="levels">
                    <button class="level-button" data-level="1">1</button>
                    <button class="level-button" data-level="2">2</button>
                    <button class="level-button" data-level="3">3</button>
                    <button class="level-button" data-level="4">4</button>
                </div>
            `;
            gridContainer.appendChild(card);
    
            const levelButtons = card.querySelectorAll('.level-button');
            const savedLevel = savedData[strategy][item];
            updateCardLevel(card, savedLevel, item); // Передаём item здесь
    
            levelButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const level = button.getAttribute('data-level');
                    savedData[strategy][item] = level;
                    localStorage.setItem('strategies', JSON.stringify(savedData));
                    updateCardLevel(card, level, item); // Передаём item здесь
                    checkCompletion();
                });
            });
        });
    }

    // Функция для обновления уровня карточки
    function updateCardLevel(card, level, item) {
        const levelButtons = card.querySelectorAll('.level-button');
        levelButtons.forEach(button => {
            button.classList.remove('selected');
            if (button.getAttribute('data-level') === level) {
                button.classList.add('selected');
            }
        });
    
        // Вычисляем высоту заполнения (0% для уровня 1, 33% для уровня 2, 66% для уровня 3, 100% для уровня 4)
        const progressHeight = ((level - 1) / 3) * 100;
        card.style.setProperty('--progress-height', `${progressHeight}%`);
    
        // Добавляем или убираем класс для изменения цвета текста
        if (level >= 3) {
            card.classList.add('filled');
        } else {
            card.classList.remove('filled');
        }
    
        // Проверяем, достигнут ли 4 уровень в любой стратегии
        const isMaxLevelReached = checkIfMaxLevelReached(item);
        const statusMessage = card.querySelector('.status-message');
        if (isMaxLevelReached) {
            if (!statusMessage) {
                const message = document.createElement('div');
                message.classList.add('status-message');
                message.innerHTML = '🌟 Получен 4 уровень, достаточно получить 3 уровень';
                card.appendChild(message);
            }
        } else {
            if (statusMessage) {
                statusMessage.remove();
            }
        }
    }
    
    // Функция для проверки, достигнут ли 4 уровень в любой стратегии
    function checkIfMaxLevelReached(item) {
        for (const strategy in savedData) {
            if (savedData[strategy][item] === '4') {
                return true;
            }
        }
        return false;
    }

    // Функция для проверки завершения всех предметов
    function checkCompletion() {
        const currentLevels = Object.values(savedData[currentStrategy]);
        const allLevelsCompleted = currentLevels.every(level => level >= 3);
        const allLevelsMaxed = currentLevels.every(level => level === 4);

        if (allLevelsMaxed) {
            statusMessage.textContent = 'Все предметы достигли 4 уровня!';
        } else if (allLevelsCompleted) {
            statusMessage.textContent = 'Все предметы достигли 3 уровня, награда доступна!';
        } else {
            statusMessage.textContent = '';
        }
    }

    // Переключение между стратегиями
    strategyButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStrategy = button.getAttribute('data-strategy');
            renderCards(currentStrategy);
            checkCompletion();
        });
    });

    // Инициализация первой стратегии
    renderCards(currentStrategy);
    checkCompletion();
});