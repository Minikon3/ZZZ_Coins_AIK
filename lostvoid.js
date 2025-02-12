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
        "[Аномалия - Устрашение] Пушка для стрельбы растворителем",
        "[Аномалия - Устрашение] Эликсир хаоса",
        "[Ловкость] Энергетический щит ловкости",
        "[Ловкость] Талисман пяти миров",
        "[Стойкость] Тактическая аптечка",
        "[Стойкость] Дощечка с заклинанием"
    ];

    const gridContainer = document.querySelector('.strategies-mode .grid-container');
    const levelsContainer = document.querySelector('.levels-mode .grid-container');
    const statusMessage = document.querySelector('.status-message');
    const strategyButtons = document.querySelectorAll('.strategy-button');
    const modeButtons = document.querySelectorAll('.mode-button');
    const strategiesMode = document.querySelector('.strategies-mode');
    const levelsMode = document.querySelector('.levels-mode');

    let currentStrategy = 'search';

    // Загружаем данные из локального хранилища
    const savedLevels = JSON.parse(localStorage.getItem('levels')) || {};
    const savedStrategies = JSON.parse(localStorage.getItem('strategies')) || {};

    // Инициализируем данные для уровней, если их нет
    items.forEach(item => {
        if (!savedLevels[item]) {
            savedLevels[item] = 1; // По умолчанию уровень 1
        }
    });

    // Инициализируем данные для стратегий, если их нет
    Object.keys(strategies).forEach(strategy => {
        if (!savedStrategies[strategy]) {
            savedStrategies[strategy] = {};
            items.forEach(item => {
                savedStrategies[strategy][item] = false; // По умолчанию "Не выполнено"
            });
        }
    });

    // Сохраняем данные в локальное хранилище
    localStorage.setItem('levels', JSON.stringify(savedLevels));
    localStorage.setItem('strategies', JSON.stringify(savedStrategies));

    // Функция для отображения карточек в режиме стратегий
    function renderCards(strategy) {
        gridContainer.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', `${strategy}-${item}`);
            card.innerHTML = `
                <img src="lostvoidpics/${item.replace(/[\[\]]/g, '').toLowerCase()}.jpg" alt="${item}">
                <h3>${item}</h3>
                <div class="completion">
                    <button class="complete-button">${savedStrategies[strategy][item] ? '✅' : '❌'}</button>
                </div>
            `;
            gridContainer.appendChild(card);
    
            const completeButton = card.querySelector('.complete-button');
            completeButton.addEventListener('click', () => {
                savedStrategies[strategy][item] = !savedStrategies[strategy][item];
                localStorage.setItem('strategies', JSON.stringify(savedStrategies));
                completeButton.textContent = savedStrategies[strategy][item] ? '✅' : '❌';
                updateCardLevel(card, savedLevels[item], item, true); // Передаём isStrategyMode = true
                checkCompletion();
            });
    
            // Обновляем уровень карточки для отображения подписи и заполнения
            updateCardLevel(card, savedLevels[item], item, true); // Передаём isStrategyMode = true
        });
    }

    // Функция для отображения карточек в режиме уровней
    function renderLevels() {
        levelsContainer.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', `levels-${item}`);
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
            levelsContainer.appendChild(card);
    
            const levelButtons = card.querySelectorAll('.level-button');
            const currentLevel = savedLevels[item];
            updateCardLevel(card, currentLevel, item); // isStrategyMode = false по умолчанию
    
            levelButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const level = button.getAttribute('data-level');
                    savedLevels[item] = level;
                    localStorage.setItem('levels', JSON.stringify(savedLevels));
                    updateCardLevel(card, level, item); // isStrategyMode = false по умолчанию
                });
            });
        });
    }
    // Функция для обновления уровня карточки
    function updateCardLevel(card, level, item, isStrategyMode = false) {
        const levelButtons = card.querySelectorAll('.level-button');
        levelButtons.forEach(button => {
            button.classList.remove('selected');
            if (button.getAttribute('data-level') === level) {
                button.classList.add('selected');
            }
        });
    
        // Заполнение зелёным цветом
        if (isStrategyMode) {
            // В режиме стратегий заполнение зависит от отметки "✅"
            const isCompleted = savedStrategies[currentStrategy][item];
            card.style.setProperty('--progress-height', isCompleted ? '100%' : '0%');
        } else {
            // В режиме уровней заполнение зависит от уровня
            const progressHeight = ((level - 1) / 3) * 100;
            card.style.setProperty('--progress-height', `${progressHeight}%`);
        }
    
        // Отображаем подпись, если уровень ≥ 4
        const statusMessage = card.querySelector('.status-message');
        if (level >= 4) {
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

    // Сохраняем текущий режим и стратегию
    function saveState() {
        const state = {
            mode: levelsMode.style.display === 'block' ? 'levels' : 'strategies',
            strategy: currentStrategy
        };
        localStorage.setItem('appState', JSON.stringify(state));
    }

    // Восстанавливаем состояние
    function restoreState() {
        const savedState = JSON.parse(localStorage.getItem('appState'));
        if (savedState) {
            if (savedState.mode === 'levels') {
                document.getElementById('mode-levels').click(); // Переключаем на режим уровней
            } else {
                document.getElementById('mode-strategies').click(); // Переключаем на режим стратегий
                currentStrategy = savedState.strategy;
                // Устанавливаем активную стратегию
                strategyButtons.forEach(button => {
                    if (button.getAttribute('data-strategy') === currentStrategy) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                });
                renderCards(currentStrategy);
            }
        }
    }

    // Переключение между стратегиями
    strategyButtons.forEach(button => {
        button.addEventListener('click', () => {
            strategyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentStrategy = button.getAttribute('data-strategy');
            renderCards(currentStrategy);
            saveState(); // Сохраняем состояние
        });
    });

    // Переключение между режимами
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
    
            if (button.id === 'mode-levels') {
                strategiesMode.style.display = 'none';
                levelsMode.style.display = 'block';
                renderLevels();
            } else {
                strategiesMode.style.display = 'block';
                levelsMode.style.display = 'none';
                // Устанавливаем активную стратегию
                strategyButtons.forEach(button => {
                    if (button.getAttribute('data-strategy') === currentStrategy) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                });
                renderCards(currentStrategy);
            }
    
            saveState(); // Сохраняем состояние
        });
    });
    // Восстанавливаем состояние при загрузке страницы
    restoreState();
    // Инициализация: выделяем кнопку первой стратегии и режим стратегий
    //strategyButtons[0].classList.add('active');
    //modeButtons[1].classList.add('active');
    renderCards(currentStrategy);
});