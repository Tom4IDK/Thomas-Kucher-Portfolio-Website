/* ============================================
   THOMAS KUCHER — PORTFOLIO JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- MOBILE MENU ----
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (toggle) {
        toggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            toggle.classList.toggle('active');
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }

    // ---- ACTIVE NAV LINK ON SCROLL ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ---- SCROLL REVEAL ----
    const revealElements = document.querySelectorAll(
        '.section-header, .project-card, .about-content, .resume-container, .contact-card, .reel-container'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // ---- WAVEFORM CANVAS ----
    const canvas = document.getElementById('waveform-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let animFrame;
        let time = 0;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function drawWaveform() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerY = canvas.height / 2;
            const waves = [
                { amplitude: 60, frequency: 0.003, speed: 0.02, color: 'rgba(123, 45, 142, 0.4)' },
                { amplitude: 40, frequency: 0.005, speed: 0.015, color: 'rgba(150, 69, 173, 0.3)' },
                { amplitude: 25, frequency: 0.008, speed: 0.025, color: 'rgba(212, 168, 67, 0.2)' },
            ];

            waves.forEach(wave => {
                ctx.beginPath();
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 1.5;

                for (let x = 0; x < canvas.width; x++) {
                    const y = centerY + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
                                      + Math.sin(x * wave.frequency * 2.5 + time * wave.speed * 1.3) * (wave.amplitude * 0.3);
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                ctx.stroke();
            });

            time++;
            animFrame = requestAnimationFrame(drawWaveform);
        }

        resize();
        drawWaveform();

        window.addEventListener('resize', resize);

        // Pause animation when not visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    cancelAnimationFrame(animFrame);
                } else {
                    drawWaveform();
                }
            });
        }, { threshold: 0 });

        heroObserver.observe(document.getElementById('hero'));
    }

    // ---- NAVBAR BACKGROUND ON SCROLL ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 20, 0.95)';
        } else {
            navbar.style.background = 'rgba(18, 18, 20, 0.85)';
        }
    });

});
