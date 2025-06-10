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
                { type: 'bangboo', x: '36%', y: '80%', id: 'vb1' }
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
                { type: 'messenger', x: '42.5%', y: '26%', id: 'zm1' }
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
                { type: 'sword', x: '70%', y: '20%', id: 'ss1' },
                { type: 'sword', x: '80%', y: '48%', id: 'ss2' }
            ],
            progressSelector: '.map-button[data-map="sklad"]'
        },
        'poselok': {
            title: 'Старый рабочий посёлок',
            image: 'ver20/old_work_poselok.jpg',
            markers: [
                { type: 'chest', x: '7%', y: '40%', id: 'p1' },
                { type: 'chest', x: '20%', y: '47%', id: 'p2' },
                { type: 'chest', x: '19%', y: '67%', id: 'p3' },
                { type: 'chest', x: '27.5%', y: '52%', id: 'p4' },
                { type: 'chest', x: '26.5%', y: '37%', id: 'p5' },
                { type: 'chest', x: '35.5%', y: '29.5%', id: 'p6' },
                { type: 'chest', x: '63.5%', y: '16.5%', id: 'p7' },
                { type: 'chest', x: '51%', y: '39%', id: 'p8' },
                { type: 'chest', x: '73%', y: '40%', id: 'p9' },
                { type: 'chest', x: '70.3%', y: '18%', id: 'p10' },
                { type: 'chest', x: '49%', y: '65%', id: 'p11' },
                { type: 'chest', x: '67.4%', y: '60%', id: 'p12' },
                { type: 'chest', x: '74%', y: '64%', id: 'p13' },
                { type: 'chest', x: '69.5%', y: '71%', id: 'p14' },
                { type: 'chest', x: '84%', y: '75%', id: 'p15' },
                { type: 'chest', x: '88%', y: '52%', id: 'p16' },
                { type: 'gold', x: '34%', y: '53%', id: 'pg1' },
                { type: 'gold', x: '77%', y: '52%', id: 'pg2' },
                { type: 'messenger', x: '15.5%', y: '62%', id: 'pm1' },
                { type: 'sword', x: '37%', y: '59%', id: 'ps1' },
                { type: 'sword', x: '95.5%', y: '49%', id: 'ps2' },
                { type: 'setting', x: '54%', y: '30.5%', id: 'pse1' },
                { type: 'setting', x: '84%', y: '59%', id: 'pse2' },
                { type: 'bangboo', x: '82.5%', y: '82%', id: 'pb1' },
                { type: 'skverna', x: '79%', y: '58%', id: 'psk1' }
            ],
            progressSelector: '.map-button[data-map="poselok"]'
        },
        'nii': {
            title: 'Старый НИИ',
            image: 'ver20/old_nii.jpg',
            markers: [
                { type: 'chest', x: '27%', y: '70%', id: 'n1' },
                { type: 'chest', x: '31%', y: '70%', id: 'n2' },
                { type: 'chest', x: '16.5%', y: '70%', id: 'n3' },
                { type: 'chest', x: '13.5%', y: '60%', id: 'n4' },
                { type: 'chest', x: '22.5%', y: '48%', id: 'n5' },
                { type: 'chest', x: '22%', y: '36%', id: 'n6' },
                { type: 'chest', x: '31%', y: '31%', id: 'n7' },
                { type: 'chest', x: '25.5%', y: '27.5%', id: 'n8' },
                { type: 'chest', x: '38%', y: '29%', id: 'n9' },
                { type: 'chest', x: '32%', y: '18%', id: 'n10' },
                { type: 'chest', x: '53%', y: '27%', id: 'n11' },
                { type: 'chest', x: '62.5%', y: '28%', id: 'n12' },
                { type: 'chest', x: '62.5%%', y: '30%', id: 'n13' },
                { type: 'chest', x: '65%', y: '42%', id: 'n14' },
                { type: 'chest', x: '51%', y: '46%', id: 'n15' },
                { type: 'chest', x: '69%', y: '45%', id: 'n16' },
                { type: 'chest', x: '53.5%', y: '58%', id: 'n17' },
                { type: 'chest', x: '69%', y: '55%', id: 'n18' },
                { type: 'chest', x: '66%', y: '81%', id: 'n19' },
                { type: 'gold', x: '33.5%', y: '63%', id: 'ng1' },
                { type: 'gold', x: '30.5%', y: '40%', id: 'ng2' },
                { type: 'sword', x: '30%', y: '43.5%', id: 'ns1' },
                { type: 'sword', x: '65%', y: '69%', id: 'ns2' },
                { type: 'setting', x: '11%', y: '38%', id: 'nse1' },
                { type: 'messenger', x: '61%', y: '33.5%', id: 'nm1' },
                { type: 'bangboo', x: '64%', y: '39.3%', id: 'nb1' },
                { type: 'skverna', x: '66%', y: '78%', id: 'nsk1' }
            ],
            progressSelector: '.map-button[data-map="nii"]'
        },
        'macenter': {
            title: 'Обогатительный центр',
            image: 'ver20/machining_center.jpg',
            markers: [
                { type: 'chest', x: '69%', y: '73%', id: 'c1' },
                { type: 'chest', x: '45%', y: '77%', id: 'c2' },
                { type: 'chest', x: '37.5%', y: '78%', id: 'c3' },
                { type: 'chest', x: '36%', y: '89%', id: 'c4' },
                { type: 'chest', x: '34.5%', y: '72%', id: 'c5' },
                { type: 'chest', x: '25%', y: '68%', id: 'c6' },
                { type: 'chest', x: '40%', y: '38%', id: 'c7' },
                { type: 'chest', x: '34.5%', y: '34%', id: 'c8' },
                { type: 'chest', x: '55%', y: '29%', id: 'c9' },
                { type: 'chest', x: '63%', y: '39.5%', id: 'c10' },
                { type: 'chest', x: '73%', y: '36%', id: 'c11' },
                { type: 'chest', x: '65%', y: '9%', id: 'c12' },
                { type: 'gold', x: '32.5%', y: '60%', id: 'cg1' },
                { type: 'messenger', x: '40%', y: '47.5%', id: 'cm1' },
                { type: 'bangboo', x: '35%', y: '58.3%', id: 'cb1' },
                { type: 'skverna', x: '74%', y: '31%', id: 'csk1' }

            ],
            progressSelector: '.map-button[data-map="macenter"]'
        },
        'carefree': {
            title: 'Старый НИИ',
            image: 'ver20/carefree_apartments.jpg',
            markers: [
                { type: 'chest', x: '17.5%', y: '42%', id: 'a1' },
                { type: 'chest', x: '6.5%', y: '41%', id: 'a2' },
                { type: 'chest', x: '9.5%', y: '48.5%', id: 'a3' },
                { type: 'chest', x: '17.5%', y: '56.5%', id: 'a4' },
                { type: 'chest', x: '3.7%', y: '58%', id: 'a5' },
                { type: 'chest', x: '14%', y: '70%', id: 'a6' },
                { type: 'chest', x: '41.5%', y: '66%', id: 'a7' },
                { type: 'chest', x: '66.5%', y: '69%', id: 'a8' },
                { type: 'chest', x: '74%', y: '54%', id: 'a9' },
                { type: 'chest', x: '88.5%', y: '46.5%', id: 'a10' },
                { type: 'chest', x: '90.5%', y: '38.5%', id: 'a11' },
                { type: 'chest', x: '95%', y: '26%', id: 'a12' },
                { type: 'gold', x: '45%', y: '65%', id: 'ag1' },
                { type: 'sword', x: '6.7%', y: '57.5%', id: 'as1' },
                { type: 'setting', x: '12.5%', y: '32%', id: 'ase1' },
                { type: 'messenger', x: '77%', y: '48%', id: 'am1' },
                { type: 'bangboo', x: '81%', y: '68%', id: 'ab1' },
                { type: 'skverna', x: '8%', y: '42%', id: 'ask1' }
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