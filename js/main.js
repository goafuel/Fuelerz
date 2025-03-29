// Updated mobile menu functionality
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

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            }
        });
    });

    // Music Control - now properly responsive
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    // Only attempt autoplay on desktop
    if (window.innerWidth > 768) {
        attemptAutoplay();
    }
    
    function attemptAutoplay() {
        const promise = bgMusic.play();
        
        if (promise !== undefined) {
            promise.then(_ => {
                isPlaying = true;
                updateMusicButton();
            })
            .catch(error => {
                isPlaying = false;
                updateMusicButton();
            });
        }
    }
    
    function updateMusicButton() {
        if (isPlaying) {
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Pause</span>';
        } else {
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Play</span>';
        }
    }
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.play();
        }
        isPlaying = !isPlaying;
        updateMusicButton();
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
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Initialize all animations
    initAnimations();
});

function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    fadeElements.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}