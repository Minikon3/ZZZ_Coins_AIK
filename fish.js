document.addEventListener('DOMContentLoaded', function() {
    const fishData = [
        { 
            id: 'barrakuda',
            normalName: 'Барракуда', 
            specialName: 'Одинокая барракуда',
            image: 'ver20/fish/Barrakuda.png',
            stars: 4,
            locations: ['oilrig']
        },
        { 
            id: 'begPoLez',
            normalName: 'Сабля-рыба', 
            specialName: 'Бегущая по лезвию',
            image: 'ver20/fish/BegPoLez.png',
            stars: 4,
            locations: ['everywhere']
        },
        { 
            id: 'dlinKalmar',
            normalName: 'Длиннорукий кальмар', 
            specialName: 'Меланхоличный кальмар',
            image: 'ver20/fish/DlinKalmar.png',
            stars: 4,
            locations: ['sharks']
        },
        { 
            id: 'gorbyl',
            normalName: 'Жёлтый горбыль', 
            specialName: 'Большой чёрно-жёлтый горбыль',
            image: 'ver20/fish/gorbyl.png',
            stars: 4,
            locations: ['everywhere']
        },
        { 
            id: 'lamantin',
            normalName: 'Ламантин', 
            specialName: 'Чёрный вихрь',
            image: 'ver20/fish/Lamantin.png',
            stars: 4,
            locations: ['coast']
        },
        { 
            id: 'letRyba',
            normalName: 'Летучая рыба', 
            specialName: 'Неизвестно',
            image: 'ver20/fish/LetRyba.png',
            stars: 4,
            locations: ['islet']
        },
        { 
            id: 'lucian',
            normalName: 'Пятилинейный луциан', 
            specialName: 'Люциан-статист',
            image: 'ver20/fish/Lucian.png',
            stars: 4,
            locations: ['cavern']
        },
        { 
            id: 'lunRyb',
            normalName: 'Луна-рыба', 
            specialName: 'Беспечная луна-рыба',
            image: 'ver20/fish/LunRyb.png',
            stars: 4,
            locations: ['cavern']
        },
        { 
            id: 'manta',
            normalName: 'Рыба-ангел', 
            specialName: 'Манта',
            image: 'ver20/fish/Manta.png',
            stars: 4,
            locations: ['islet']
        },
        { 
            id: 'nautilus',
            normalName: 'Наутилус', 
            specialName: 'Серебряная улитка',
            image: 'ver20/fish/Nautilus.png',
            stars: 4,
            locations: ['lighthouse']
        },
        { 
            id: 'pitahayka',
            normalName: 'Краснопёрая гаррупа', 
            specialName: 'Питахайка',
            image: 'ver20/fish/Pitahayka.png',
            stars: 4,
            locations: ['everywhere']
        },
        { 
            id: 'radOkun',
            normalName: 'Голубой хирург', 
            specialName: 'Радужный окунь',
            image: 'ver20/fish/RadOkun.png',
            stars: 4,
            locations: ['coast']
        },
        { 
            id: 'rakushka',
            normalName: 'Морская жемчужина', 
            specialName: 'Ракушка',
            image: 'ver20/fish/Rakushka.png',
            stars: 4,
            locations: ['everywhere']
        },
        { 
            id: 'razyna',
            normalName: 'Китовая акула', 
            specialName: 'Разиня',
            image: 'ver20/fish/Razyna.png',
            stars: 4,
            locations: ['sharks']
        },
        { 
            id: 'remntel',
            normalName: 'Сельдяной король', 
            specialName: 'Ремнетел',
            image: 'ver20/fish/Remntel.png',
            stars: 4,
            locations: ['oilrig']
        },
        { 
            id: 'rybaDim',
            normalName: 'Рыба-демон', 
            specialName: 'Скромная рыба-демон',
            image: 'ver20/fish/RybaDim.png',
            stars: 4,
            locations: ['oilrig']
        },
        { 
            id: 'rycKop',
            normalName: 'Рыба-боец', 
            specialName: 'Рыцарь-копейщик',
            image: 'ver20/fish/RycKop.png',
            stars: 4,
            locations: ['cavern']
        },
        { 
            id: 'shipSkat',
            normalName: 'Шиповатый скат', 
            specialName: 'Гладкохвостый скат',
            image: 'ver20/fish/ShipSkat.png',
            stars: 4,
            locations: ['lighthouse']
        },
        { 
            id: 'svirAkul',
            normalName: 'Акула-молот', 
            specialName: 'Свирепая акула',
            image: 'ver20/fish/SvirAkul.png',
            stars: 4,
            locations: ['sharks']
        }
    ];

    const locationNames = {
        everywhere: 'Везде',
        lighthouse: 'Маяк',
        coast: 'Побережье',
        islet: 'Островок',
        sharks: 'Место ловли акул',
        cavern: 'Каверна',
        oilrig: 'Нефтяная скважина'
    };
    const fishContainer = document.getElementById('fishContainer');
    const globalNameToggle = document.getElementById('globalNameToggle');
    const resetAllStars = document.getElementById('resetAllStars');
    const warningMessage = document.getElementById('warningMessage');
    const searchInput = document.getElementById('fishSearch');
    const filterButtons = document.querySelectorAll('.filter-button');

    // Загрузка данных из localStorage
    function loadFishData() {
        const savedData = localStorage.getItem('fishProgress');
        if (savedData) {
            return JSON.parse(savedData);
        }
        return {};
    }

    // Сохранение данных в localStorage
    function saveFishData(data) {
        localStorage.setItem('fishProgress', JSON.stringify(data));
    }

    let fishProgress = loadFishData();

    // Создание карточек рыб
    function createFishCards() {
        fishContainer.innerHTML = '';
        
        fishData.forEach(fish => {
            // Проверяем, есть ли данные для этой рыбы
            if (!fishProgress[fish.id]) {
                fishProgress[fish.id] = {
                    stars: 0,
                    specialStar: false,
                    specialName: false
                };
            }

            const currentFish = fishProgress[fish.id];
            const displayName = currentFish.specialName ? fish.specialName : fish.normalName;

            const card = document.createElement('div');
            card.className = 'fish-card';
            card.dataset.id = fish.id;
            card.dataset.locations = fish.locations.join(' ');
            const locationsHTML = fish.locations.map(loc => 
                `<span class="location-tag" data-location="${loc}">${locationNames[loc]}</span>`
            ).join('');

            card.innerHTML = `
            <img src="${fish.image}" alt="${fish.normalName}">
            <div class="fish-name">${displayName}</div>
            <div class="stars-container" id="stars-${fish.id}">
                ${Array(fish.stars).fill().map((_, i) => 
                    `<div class="star" data-index="${i + 1}"></div>`
                ).join('')}
                <div class="special-star" id="special-star-${fish.id}" data-index="special"></div>
            </div>
            <div class="fish-locations">
                ${locationsHTML}
            </div>
            <button class="name-toggle" data-fish-id="${fish.id}">Сменить название</button>
        `;

            fishContainer.appendChild(card);

            // Обновление состояния звезд
            updateStars(fish.id, currentFish.stars);
            updateSpecialStar(fish.id, currentFish.specialStar);
        });
    }

    // Обработчик клика на обычные звезды
    function handleStarClick(e) {
        if (e.target.classList.contains('star')) {
            const fishId = e.target.parentElement.id.split('-')[1];
            const starIndex = parseInt(e.target.dataset.index);
            const currentStars = fishProgress[fishId].stars;
            
            // Если клик на уже выбранную звезду - снимаем выделение
            if (starIndex === currentStars) {
                fishProgress[fishId].stars = starIndex - 1;
            } else {
                fishProgress[fishId].stars = starIndex;
            }
            
            // Если сняли все обычные звезды, снимаем и особую
            if (fishProgress[fishId].stars === 0) {
                fishProgress[fishId].specialStar = false;
            }
            
            updateStars(fishId, fishProgress[fishId].stars);
            updateSpecialStar(fishId, fishProgress[fishId].specialStar);
            saveFishData(fishProgress);
        }
    }

    // Обработчик клика на особую звезду
    function handleSpecialStarClick(e) {
        if (e.target.classList.contains('special-star') && !e.target.classList.contains('disabled')) {
            const fishId = e.target.id.split('-')[2];
            fishProgress[fishId].specialStar = !fishProgress[fishId].specialStar;
            updateSpecialStar(fishId, fishProgress[fishId].specialStar);
            saveFishData(fishProgress);
        }
    }

    // Обработчик клика на кнопку смены названия
    function handleNameToggleClick(e) {
        if (e.target.classList.contains('name-toggle')) {
            const fishId = e.target.dataset.fishId;
            const fish = fishData.find(f => f.id === fishId);
            const currentFish = fishProgress[fishId];
            
            currentFish.specialName = !currentFish.specialName;
            const displayName = currentFish.specialName ? fish.specialName : fish.normalName;
            
            // Обновляем имя с учетом поискового запроса
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                const regex = new RegExp(searchTerm, 'gi');
                const highlightedName = displayName.replace(regex, match => 
                    `<span class="highlight">${match}</span>`);
                e.target.parentElement.querySelector('.fish-name').innerHTML = highlightedName;
            } else {
                e.target.parentElement.querySelector('.fish-name').textContent = displayName;
            }
            
            saveFishData(fishProgress);
        }
    }

    // Обработчик глобальной смены названий
    function handleGlobalNameToggle() {
        // Проверяем, есть ли разные типы названий
        const fishIds = Object.keys(fishProgress);
        const hasMixedNames = fishIds.some(id => fishProgress[id].specialName) && 
                            fishIds.some(id => !fishProgress[id].specialName);
        
        if (hasMixedNames) {
            warningMessage.style.display = 'block';
            // Сбрасываем все к обычным названиям
            fishIds.forEach(id => {
                fishProgress[id].specialName = false;
            });
            
            // Обновляем отображение
            updateFishNames();
            
            setTimeout(() => {
                warningMessage.style.display = 'none';
            }, 3000);
        } else {
            // Инвертируем все названия
            const newState = fishIds.length > 0 ? !fishProgress[fishIds[0]].specialName : false;
            fishIds.forEach(id => {
                fishProgress[id].specialName = newState;
            });
            
            // Обновляем отображение
            updateFishNames();
        }
        
        saveFishData(fishProgress);
    }

    // Обработчик сброса всех звезд
    function handleResetAllStars() {
        if (confirm('Вы уверены, что хотите сбросить все звёзды?')) {
            Object.keys(fishProgress).forEach(id => {
                fishProgress[id].stars = 0;
                fishProgress[id].specialStar = false;
                updateStars(id, 0);
                updateSpecialStar(id, false);
            });
            saveFishData(fishProgress);
        }
    }

    // Обработчик поиска
    function handleSearch() {
        const searchTerm = this.value.toLowerCase();
        filterFish();
    }

    // Обработчики фильтров по локациям
    function handleFilterClick() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterFish();
    }

    // Функция фильтрации
    function filterFish() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-button.active').dataset.location;
        
        document.querySelectorAll('.fish-card').forEach(card => {
            const fishId = card.dataset.id;
            const fish = fishData.find(f => f.id === fishId);
            const displayName = fishProgress[fishId].specialName ? fish.specialName : fish.normalName;
            const allNames = `${displayName} ${fish.normalName} ${fish.specialName}`.toLowerCase();
            
            // Проверка поиска
            const matchesSearch = searchTerm === '' || allNames.includes(searchTerm);
            
            // Проверка фильтра локации
            const matchesFilter = activeFilter === 'all' || 
                                fish.locations.includes(activeFilter);
            
            // Показываем/скрываем карточку
            card.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
            
            // Подсветка результатов поиска
            if (searchTerm && matchesSearch) {
                const regex = new RegExp(searchTerm, 'gi');
                const highlightedName = displayName.replace(regex, match => 
                    `<span class="highlight">${match}</span>`);
                card.querySelector('.fish-name').innerHTML = highlightedName;
            } else {
                card.querySelector('.fish-name').textContent = displayName;
            }
        });
    }

    // Функция обновления всех имен рыб
    function updateFishNames() {
        document.querySelectorAll('.fish-card').forEach(card => {
            const fishId = card.dataset.id;
            const fish = fishData.find(f => f.id === fishId);
            const displayName = fishProgress[fishId].specialName ? fish.specialName : fish.normalName;
            
            // Обновляем с учетом поискового запроса
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                const regex = new RegExp(searchTerm, 'gi');
                const highlightedName = displayName.replace(regex, match => 
                    `<span class="highlight">${match}</span>`);
                card.querySelector('.fish-name').innerHTML = highlightedName;
            } else {
                card.querySelector('.fish-name').textContent = displayName;
            }
        });
    }

    // Функция обновления состояния обычных звезд
    function updateStars(fishId, count) {
        const starsContainer = document.getElementById(`stars-${fishId}`);
        if (!starsContainer) return;
        
        const stars = starsContainer.querySelectorAll('.star');
        const specialStar = starsContainer.querySelector('.special-star');
        
        stars.forEach((star, index) => {
            if (index < count) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
        
        // Обновляем состояние особой звезды
        if (count > 0) {
            specialStar.classList.remove('disabled');
        } else {
            specialStar.classList.add('disabled');
            fishProgress[fishId].specialStar = false;
            specialStar.classList.remove('filled');
        }
    }

    // Функция обновления состояния особой звезды
    function updateSpecialStar(fishId, isFilled) {
        const specialStar = document.getElementById(`special-star-${fishId}`);
        if (!specialStar) return;
        
        if (isFilled) {
            specialStar.classList.add('filled');
        } else {
            specialStar.classList.remove('filled');
        }
    }

    // Инициализация
    createFishCards();

    // Назначение обработчиков событий
    fishContainer.addEventListener('click', function(e) {
        handleStarClick(e);
        handleSpecialStarClick(e);
        handleNameToggleClick(e);
    });

    globalNameToggle.addEventListener('click', handleGlobalNameToggle);
    resetAllStars.addEventListener('click', handleResetAllStars);
    searchInput.addEventListener('input', handleSearch);
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Активируем фильтр "Все локации" по умолчанию
    document.querySelector('.filter-button[data-location="all"]').classList.add('active');
    filterFish();
});