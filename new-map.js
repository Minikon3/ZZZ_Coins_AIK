document.addEventListener('DOMContentLoaded', () => {
    const newMapModal = document.getElementById('new-map-modal');
    const markModal = document.getElementById('mark-modal');
    const currentMapImage = document.getElementById('current-map-image');
    const mapTitle = document.getElementById('map-title');
    const markButton = document.getElementById('mark-button');
    const closeButtons = document.querySelectorAll('.close-button');
    const newMapContainer = document.querySelector('.new-map-container');
    
    const mapsConfig = {
        'vysotkavostok': {
            title: 'Высотка: восток',
            image: 'ver20/central_promzona_vysotkavostok.jpg',
            markers: [
                { type: 'chest', x: '32%', y: '70%', id: 'v1' },
                { type: 'chest', x: '24%', y: '61%', id: 'v2' },
                { type: 'chest', x: '55%', y: '56%', id: 'v3' },
                { type: 'chest', x: '62%', y: '36%', id: 'v4' },
                { type: 'chest', x: '68%', y: '7%', id: 'v5' },
                { type: 'chest', x: '54%', y: '19%', id: 'v6' },
                { type: 'chest', x: '37%', y: '9%', id: 'v7' },
                { type: 'chest', x: '29%', y: '11%', id: 'v8' },
                { type: 'chest', x: '23.5%', y: '19%', id: 'v9' },
                { type: 'gold', x: '26%', y: '19.5%', id: 'vg1' },
                { type: 'bangboo', x: '36%', y: '80%', id: 'vg1' }
            ],
            progressSelector: '.map-button[data-map="vysotkavostok"]'
        },
        'vysotkazapad': {
            title: 'Высотка: запад',
            image: 'ver20/central_promzona_vysotkazapad_map.jpg',
            markers: [
                { type: 'chest', x: '42.5%', y: '33%', id: 'z1' },
                { type: 'chest', x: '53.5%', y: '39%', id: 'z2' },
                { type: 'chest', x: '58%', y: '35%', id: 'z3' },
                { type: 'messenger', x: '42.5%', y: '26%', id: 'zb1' }
            ],
            progressSelector: '.map-button[data-map="vysotkazapad"]'
        },
        'roof': {
            title: 'Крыша',
            image: 'ver20/central_promzona_roof_map.jpg',
            markers: [
                { type: 'chest', x: '32%', y: '69%', id: 'r1' }
            ],
            progressSelector: '.map-button[data-map="roof"]'
        },
        'sklad': {
            title: 'Складская зона',
            image: 'ver20/central_promzona_sklad_map.jpg',
            markers: [
                { type: 'chest', x: '51%', y: '52%', id: 's1' },
                { type: 'chest', x: '54.5%', y: '32%', id: 's2' },
                { type: 'chest', x: '48%', y: '7%', id: 's3' },
                { type: 'chest', x: '79.5%', y: '35%', id: 's4' },
                { type: 'chest', x: '84.5%', y: '5%', id: 's5' },
                { type: 'chest', x: '5%', y: '32%', id: 's6' },
                { type: 'gold', x: '57%', y: '6%', id: 'sg1' },
                { type: 'sword', x: '70%', y: '20%', id: 'sp1' },
                { type: 'sword', x: '80%', y: '48%', id: 'sp2' }
            ],
            progressSelector: '.map-button[data-map="sklad"]'
        },
        'poselok': {
            title: 'Старый рабочий посёлок',
            image: 'ver20/old_work_poselok.jpg',
            markers: [
                { type: 'chest', x: '51%', y: '52%', id: 'p1' }
            ],
            progressSelector: '.map-button[data-map="poselok"]'
        },
        'nii': {
            title: 'Старый НИИ',
            image: 'ver20/old_nii.jpg',
            markers: [
                { type: 'chest', x: '51%', y: '52%', id: 'n1' }
            ],
            progressSelector: '.map-button[data-map="nii"]'
        },
        'macenter': {
            title: 'Обогатительный центр',
            image: 'ver20/machining_center.jpg',
            markers: [
                { type: 'chest', x: '51%', y: '52%', id: 'c1' }
            ],
            progressSelector: '.map-button[data-map="macenter"]'
        },
        'carefree': {
            title: 'Старый НИИ',
            image: 'ver20/carefree_apartments.jpg',
            markers: [
                { type: 'chest', x: '51%', y: '52%', id: 'a1' }
            ],
            progressSelector: '.map-button[data-map="carefree"]'
        }
    };

    const markerIcons = {
        'chest': 'ver20/icons/chest_icon.png',
        'gold': 'ver20/icons/gold.png',
        'messenger': 'ver20/icons/messenger.png',
        'sword': 'ver20/icons/sword.png',
        'setting': 'ver20/icons/puzzle-piece.png',
        'bangboo': 'ver20/icons/bangboo.png',
        'skverna': 'ver20/icons/skverna.png'
    };

    document.querySelectorAll('.map-button').forEach(button => {
        button.addEventListener('click', () => {
            const mapId = button.getAttribute('data-map');
            const mapConfig = mapsConfig[mapId];
            
            if (!mapConfig) {
                console.error(`Конфигурация для карты ${mapId} не найдена`);
                return;
            }
            
            currentMapImage.src = mapConfig.image;
            mapTitle.textContent = mapConfig.title;
            
            newMapContainer.querySelectorAll('.map-marker').forEach(m => m.remove());
            
            mapConfig.markers.forEach(marker => {
                const markerElement = document.createElement('img');
                markerElement.src = markerIcons[marker.type];
                markerElement.className = `map-marker marker-${marker.type}`;
                markerElement.style.position = 'absolute';
                markerElement.style.top = marker.y;
                markerElement.style.left = marker.x;
                markerElement.style.width = '30px';
                markerElement.style.height = '30px';
                markerElement.style.cursor = 'pointer';
                markerElement.dataset.markerId = marker.id;
                
                const isMarked = localStorage.getItem(`marker_${marker.id}`) === 'true';
                if (isMarked) {
                    markerElement.style.opacity = '0.5';
                    markerElement.style.filter = 'grayscale(80%)';
                }
                
                markerElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openMarkModal(marker.id, mapId);
                });
                
                newMapContainer.appendChild(markerElement);
            });
            
            newMapModal.classList.add('show');
        });
    });

    function openMarkModal(markerId, mapId) {
        markButton.dataset.markerId = markerId;
        markButton.dataset.mapId = mapId;
        
        const isMarked = localStorage.getItem(`marker_${markerId}`) === 'true';
        markButton.textContent = isMarked ? 'Снять отметку' : 'Отметить';
        markButton.style.backgroundColor = isMarked ? '#f44336' : '#4caf50';
        
        markModal.classList.add('show');
    }

    markButton.addEventListener('click', () => {
        const markerId = markButton.dataset.markerId;
        const mapId = markButton.dataset.mapId;
        const isMarked = localStorage.getItem(`marker_${markerId}`) === 'true';
        
        if (isMarked) {
            localStorage.removeItem(`marker_${markerId}`);
        } else {
            localStorage.setItem(`marker_${markerId}`, 'true');
        }
        
        // Обновляем интерфейс маркера
        const markerElement = document.querySelector(`.map-marker[data-marker-id="${markerId}"]`);
        if (markerElement) {
            const nowMarked = !isMarked;
            markerElement.style.opacity = nowMarked ? '0.5' : '1';
            markerElement.style.filter = nowMarked ? 'grayscale(80%)' : 'none';
        }
        
        // Закрываем окно отметки
        markModal.classList.remove('show');
        
        // Обновляем прогресс зоны и общий прогресс
        updateZoneProgress(mapId);
        if (typeof updateTotalProgress === 'function') {
            updateTotalProgress();
        }
    });

    function updateZoneProgress(mapId) {
        const mapConfig = mapsConfig[mapId];
        if (!mapConfig) return;
        
        let markedCount = 0;
        mapConfig.markers.forEach(marker => {
            if (localStorage.getItem(`marker_${marker.id}`) === 'true') {
                markedCount++;
            }
        });
        
        const totalMarkers = mapConfig.markers.length;
        const progressElement = document.querySelector(`${mapConfig.progressSelector}`)
            .closest('li')
            .querySelector('.zone-progress');
        
        const progressText = progressElement.nextElementSibling;
        progressElement.value = markedCount;
        progressText.textContent = `${markedCount}/${totalMarkers}`;
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.target.closest('.modal').classList.remove('show');
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === newMapModal) newMapModal.classList.remove('show');
        if (event.target === markModal) markModal.classList.remove('show');
    });

    // Инициализация прогресса при загрузке
    Object.keys(mapsConfig).forEach(mapId => {
        updateZoneProgress(mapId);
    });
    
    if (typeof updateTotalProgress === 'function') {
        updateTotalProgress();
    }
});