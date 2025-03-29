document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Animate nav items
        navItems.forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                item.style.animation = `navItemFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Background Music Control
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    // Try to autoplay (may be blocked by browser)
    function attemptAutoplay() {
        const promise = bgMusic.play();
        
        if (promise !== undefined) {
            promise.then(_ => {
                isPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Pause</span>';
            })
            .catch(error => {
                isPlaying = false;
                musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Play</span>';
            });
        }
    }
    
    // Check if user has interacted with page before playing
    document.body.addEventListener('click', function firstInteraction() {
        attemptAutoplay();
        document.body.removeEventListener('click', firstInteraction);
    }, { once: true });
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Play</span>';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Pause</span>';
        }
        isPlaying = !isPlaying;
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    fadeElements.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});