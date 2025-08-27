// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTheme();
    initNavigation();
    initSmoothScrolling();
    initFormValidation();
    initRoomBooking();
    initScrollAnimations();
    initGalleryInteractions();
    initBenqutSection();
    initHeroSlideshow();
    initQuickBooking();
});

// Theme functionality
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (window.scrollY > 100) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(45, 45, 45, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            // Reset to CSS styles
            navbar.style.background = '';
            navbar.style.boxShadow = '';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#e1e8ed';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Booking...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your booking request! We will contact you shortly to confirm your reservation.');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
        
        // Real-time validation
        const formInputs = form.querySelectorAll('input, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#e1e8ed';
                }
            });
        });
    }
}

// Room booking functionality
function initRoomBooking() {
    const bookButtons = document.querySelectorAll('.btn-book');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const roomCard = this.closest('.room-card');
            const roomName = roomCard.querySelector('h3').textContent;
            const roomPrice = roomCard.querySelector('.price').textContent;
            
            // Scroll to contact form
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Auto-fill room type in form
                setTimeout(() => {
                    const roomSelect = document.querySelector('#room-type');
                    if (roomSelect) {
                        const roomType = roomName.toLowerCase().replace(' ', '-');
                        roomSelect.value = roomType;
                        
                        // Highlight the selected option
                        roomSelect.style.borderColor = '#3498db';
                        setTimeout(() => {
                            roomSelect.style.borderColor = '#e1e8ed';
                        }, 2000);
                    }
                }, 500);
            }
            
            // Show confirmation message
            showNotification(`Selected: ${roomName} - ${roomPrice}`);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.room-card, .amenity-item, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial styles for animation
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Gallery interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Simulate gallery lightbox (would be enhanced with actual images)
            showNotification('Gallery feature would show enlarged image here');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// Utility function to show notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
}

// Initialize parallax if needed
// initParallax();

// Add loading animation for images (when actual images are added)
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial styles
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Initialize when actual images are present
// initImageLoading();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add touch device detection for better UX
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Adjust hover effects for touch devices
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// Benqut Section functionality
function initBenqutSection() {
    const learnMoreBtn = document.querySelector('.btn-learn-more');
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Show a modal or detailed information about Benqut experience
            showBenqutModal();
        });
    }
}

function showBenqutModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--white);
        padding: 2rem;
        border-radius: var(--border-radius);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: translateY(-50px);
        transition: transform 0.3s ease;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Benqut Experience Details</h3>
        <p style="margin-bottom: 1.5rem; color: var(--text-light);">
            Our exclusive Benqut experience offers premium services including:
        </p>
        <ul style="margin-bottom: 1.5rem; color: var(--text-light); padding-left: 1.5rem;">
            <li>Personalized concierge service</li>
            <li>Exclusive access to premium amenities</li>
            <li>Customized dining experiences</li>
            <li>Priority booking for spa treatments</li>
            <li>Complimentary valet parking</li>
        </ul>
        <p style="margin-bottom: 1.5rem; color: var(--text-light);">
            Contact our concierge team to learn more about upgrading your stay with the Benqut experience.
        </p>
        <button class="btn btn-primary" style="margin-right: 1rem;">Contact Concierge</button>
        <button class="btn btn-secondary">Close</button>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    }, 100);
    
    // Add event listeners
    const closeBtn = modalContent.querySelector('.btn-secondary');
    const contactBtn = modalContent.querySelector('.btn-primary');
    
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    contactBtn.addEventListener('click', function() {
        closeModal();
        // Scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    function closeModal() {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    }
}

// Hero Section Slideshow functionality
function initHeroSlideshow() {
    const bgSlides = document.querySelectorAll('.bg-slide');
    const bgNavPrev = document.querySelector('.bg-nav.prev');
    const bgNavNext = document.querySelector('.bg-nav.next');
    
    if (!bgSlides.length || !bgNavPrev || !bgNavNext) return;
    
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides
        bgSlides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        bgSlides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % bgSlides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + bgSlides.length) % bgSlides.length;
        showSlide(prevIndex);
    }

    // Auto slide every 5 seconds
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Navigation event listeners
    bgNavNext.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        setTimeout(startAutoSlide, 10000); // Resume after 10 seconds
    });

    bgNavPrev.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        setTimeout(startAutoSlide, 10000); // Resume after 10 seconds
    });

    // Pause auto slide when user hovers over navigation
    bgNavNext.addEventListener('mouseenter', stopAutoSlide);
    bgNavPrev.addEventListener('mouseenter', stopAutoSlide);
    bgNavNext.addEventListener('mouseleave', startAutoSlide);
    bgNavPrev.addEventListener('mouseleave', startAutoSlide);

    // Initialize first slide and start auto slide
    showSlide(0);
    startAutoSlide();
}

// Quick Booking Form functionality
function initQuickBooking() {
    const bookingForm = document.querySelector('.booking-form');
    
    if (!bookingForm) return;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const checkIn = bookingForm.querySelector('input[type="date"]:nth-of-type(1)');
        const checkOut = bookingForm.querySelector('input[type="date"]:nth-of-type(2)');
        const guests = bookingForm.querySelector('select');
        
        // Basic validation
        if (!checkIn.value || !checkOut.value || !guests.value) {
            showNotification('Please fill in all required fields.');
            return;
        }
        
        if (new Date(checkIn.value) >= new Date(checkOut.value)) {
            showNotification('Check-out date must be after check-in date.');
            return;
        }
        
        // Simulate form submission
        const btnBooking = bookingForm.querySelector('.btn-booking');
        const originalText = btnBooking.innerHTML;
        
        btnBooking.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
        btnBooking.disabled = true;
        
        setTimeout(() => {
            showNotification('Availability checked! Rooms are available for your selected dates.');
            btnBooking.innerHTML = originalText;
            btnBooking.disabled = false;
            bookingForm.reset();
        }, 2000);
    });
}

// Add service worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('SW registered: ', registration);
        }).catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
