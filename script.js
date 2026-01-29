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

    // Countdown Timer
    const timerElement = document.getElementById('timer');
    let time = 15 * 60; // 15 minutes in seconds

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        timerElement.innerHTML = `00:${minutes < 10 ? '0' + minutes : minutes}:${seconds}`;

        if (time > 0) {
            time--;
        } else {
            // Reset timer for demo purposes
            time = 15 * 60;
        }
    }

    setInterval(updateTimer, 1000);

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
            // Only hide on desktop, keep on mobile if desired (handled by CSS media query mostly)
            if (window.innerWidth > 768) {
                floatingCta.style.display = 'none';
            }
        }
    });
});
