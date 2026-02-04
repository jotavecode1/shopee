document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Animations
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-active');
                    }, delay);
                } else {
                    entry.target.classList.add('animate-active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));

    // 24-Hour Countdown Timer (Resets at 00:00)
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0); // Set to midnight of the next day

        const diff = tomorrow - now; // Difference in milliseconds

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const hDisplay = hours < 10 ? '0' + hours : hours;
        const mDisplay = minutes < 10 ? '0' : '';
        const sDisplay = seconds < 10 ? '0' : '';
        
        timerElement.innerHTML = `${hDisplay}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to avoid flicker

    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Show/Hide Floating CTA on Scroll
    const floatingCta = document.querySelector('.floating-cta');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            floatingCta.style.display = 'block';
        } else {
            // Only hide on desktop, keep on mobile
            if (window.innerWidth > 768) {
                floatingCta.style.display = 'none';
            }
        }
    });

    // Social Proof Notifications
    const names = [
        'João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Beatriz', 'Lucas', 'Juliana', 'Marcos', 'Fernanda',
        'Ricardo', 'Camila', 'Felipe', 'Amanda', 'Gabriel', 'Larissa', 'Bruno', 'Letícia', 'Vinícius', 'Isabela',
        'Rafael', 'Bianca', 'Thiago', 'Priscila', 'Leonardo', 'Renata', 'Gustavo', 'Débora', 'Marcelo', 'Tatiane',
        'Arthur', 'Sophia', 'Heitor', 'Alice', 'Bernardo', 'Manuela', 'Davi', 'Valentina', 'Lorenzo', 'Heloísa',
        'Gabriel', 'Clara', 'Samuel', 'Cecília', 'Pedro', 'Beatriz', 'Enzo', 'Maria Eduarda', 'Mateus', 'Julia'
    ];
    
    const cities = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Salvador', 'Fortaleza', 'Brasília', 'Porto Alegre',
        'Xique-Xique', 'Ibirubá', 'Passo Fundo', 'Joinville', 'Maringá', 'Juiz de Fora', 'Anápolis', 'Caxias do Sul',
        'Ponta Grossa', 'Uberlândia', 'Ribeirão Preto', 'São José dos Campos', 'Feira de Santana', 'Campina Grande',
        'Vitória da Conquista', 'Caruaru', 'Petrolina', 'Cabo Frio', 'Gramado', 'Canela', 'Brusque', 'Indaiatuba',
        'Vinhedo', 'Valinhos', 'Itu', 'Salto', 'Piracicaba', 'Bauru', 'Franca', 'Cascavel', 'Foz do Iguaçu',
        'Ribeirão das Neves', 'Betim', 'Contagem', 'Caucaia', 'Juazeiro do Norte', 'Sobral', 'Barbalha', 'Crato',
        'Parnaíba', 'Picos', 'Piripiri', 'Mossoró', 'Caicó', 'Pau dos Ferros', 'Patos', 'Guarabira', 'Sousa'
    ];
    
    function createNotification() {
        const notification = document.createElement('div');
        notification.className = 'social-notification';
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        
        notification.innerHTML = `
            <div class="notif-content">
                <div class="notif-icon"><i class="fas fa-shopping-cart"></i></div>
                <div class="notif-text">
                    <p><strong>${randomName}</strong> de ${randomCity}</p>
                    <span>Acabou de adquirir o método!</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }

    // Show notification every 15-25 seconds
    function scheduleNextNotification() {
        const delay = Math.random() * (25000 - 15000) + 15000;
        setTimeout(() => {
            createNotification();
            scheduleNextNotification();
        }, delay);
    }
    
    // Initial notification after 5 seconds
    setTimeout(createNotification, 5000);
    scheduleNextNotification();
});
