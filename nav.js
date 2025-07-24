document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    let hoverTimer;
    
    // Для десктопа
    if (window.innerWidth > 768) {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimer);
                this.classList.add('hover');
                menu.style.display = 'block';
                // Принудительный reflow для запуска анимации
                void menu.offsetHeight;
                this.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
                hoverTimer = setTimeout(() => {
                    if (!this.classList.contains('hover')) {
                        this.classList.remove('active');
                        // После завершения анимации скрываем меню
                        setTimeout(() => {
                            if (!this.classList.contains('active') && !this.classList.contains('hover')) {
                                menu.style.display = 'none';
                            }
                        }, 300);
                    }
                }, 200);
            });
        });
    }
    // Для мобильных
    else {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    e.preventDefault();
                    const wasActive = this.classList.contains('active');
                    
                    // Закрываем все другие выпадающие меню
                    document.querySelectorAll('.dropdown').forEach(item => {
                        if (item !== this) {
                            item.classList.remove('active');
                        }
                    });
                    
                    this.classList.toggle('active', !wasActive);
                }
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
});