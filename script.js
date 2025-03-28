document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu with Animation
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const sectionTitle = document.querySelector('.section-title-float');
    
    // Improved Mobile Menu Toggle
    let menuOpen = false;
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            navLinks.classList.add('active');
            mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navLinks.classList.remove('active');
            mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !e.target.closest('nav')) {
            navLinks.classList.remove('active');
            mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            menuOpen = false;
        }
    });
    
    // Enhanced Floating Section Titles
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1,
        rootMargin: '-100px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h2 = entry.target.querySelector('h2');
                if (h2) {
                    sectionTitle.textContent = h2.textContent;
                    sectionTitle.classList.add('visible');
                    
                    // Highlight current nav link
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active-nav');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('active-nav');
                        }
                    });
                }
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth Scroll with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (menuOpen) {
                    navLinks.classList.remove('active');
                    mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
                    menuOpen = false;
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio Item Click Effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add temporary active class for visual feedback
            this.classList.add('active-portfolio');
            setTimeout(() => {
                this.classList.remove('active-portfolio');
            }, 300);
            
            // In production, this would open a modal or lightbox
            console.log('Portfolio item clicked:', this.querySelector('h3').textContent);
        });
    });
    
    // Preload hover images for smoother experience
    window.addEventListener('load', function() {
        const hoverImages = document.querySelectorAll('.portfolio-item img');
        hoverImages.forEach(img => {
            const src = img.getAttribute('src');
            const hoverSrc = src.replace('.jpg', '-hover.jpg');
            const preload = new Image();
            preload.src = hoverSrc;
        });
    });
});

// Order Form Submission
document.getElementById('fuelerz-order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const confirmation = document.getElementById('order-confirmation');
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: form.querySelector('#customer-name').value,
        email: form.querySelector('#customer-email').value,
        phone: form.querySelector('#customer-phone').value,
        service: form.querySelector('#service-type').value,
        budget: form.querySelector('#project-budget').value,
        message: form.querySelector('#project-details').value,
        date: new Date().toLocaleString()
    };
    
    // Create WhatsApp message
    const whatsappMessage = `New Order from Fuelerz Website%0A%0A` +
                           `*Name:* ${formData.name}%0A` +
                           `*Phone:* ${formData.phone}%0A` +
                           `*Email:* ${formData.email}%0A` +
                           `*Service:* ${formData.service}%0A` +
                           `*Budget:* ${formData.budget}%0A%0A` +
                           `*Project Details:*%0A${formData.message}%0A%0A` +
                           `*Submitted on:* ${formData.date}`;
    
    // Create email body
    const emailSubject = `New Order: ${formData.service}`;
    const emailBody = `New order received from Fuelerz website:\n\n` +
                     `Name: ${formData.name}\n` +
                     `Phone: ${formData.phone}\n` +
                     `Email: ${formData.email}\n` +
                     `Service: ${formData.service}\n` +
                     `Budget: ${formData.budget}\n\n` +
                     `Project Details:\n${formData.message}\n\n` +
                     `Submitted on: ${formData.date}`;
    
    // Send to WhatsApp (primary notification)
    const whatsappUrl = `https://wa.me/917722011476?text=${whatsappMessage}`;
    
    // Send to Email (secondary notification)
    const emailUrl = `mailto:fuelerzgoa@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open WhatsApp in new tab
    const whatsappWindow = window.open(whatsappUrl, '_blank');
    
    // Fallback to email if WhatsApp fails
    setTimeout(() => {
        if (!whatsappWindow || whatsappWindow.closed) {
            window.location.href = emailUrl;
        }
    }, 1000);
    
    // Show confirmation message
    setTimeout(() => {
        form.style.display = 'none';
        confirmation.style.display = 'block';
        
        // Reset form
        form.reset();
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Order';
        submitBtn.disabled = false;
        
        // Scroll to confirmation
        confirmation.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
    
    // Optional: Store in localStorage for your reference
    const orders = JSON.parse(localStorage.getItem('fuelerz_orders') || [];
    orders.push(formData);
    localStorage.setItem('fuelerz_orders', JSON.stringify(orders));
});
