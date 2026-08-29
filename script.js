document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1200);
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference for theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    const toggleTheme = () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    };

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('#mobile-menu .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing after revealing once
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        // Add staggered delay to elements grouped in a container
        if(el.parentElement.classList.contains('stagger-group')) {
            const index = Array.from(el.parentElement.children).indexOf(el);
            el.style.transitionDelay = `${index * 150}ms`;
        }
        revealObserver.observe(el);
    });

    // Navbar active state on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        // Navbar glass effect on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.remove('py-2');
            navbar.classList.add('py-4');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-primary', 'dark:text-secondary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-primary', 'dark:text-secondary');
            }
        });
    });

    // Generate Floating Semiconductor Chips Background
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const colors = ['#0055ff', '#00e5ff', '#3b82f6'];
        const numParticles = window.innerWidth < 768 ? 10 : 25; // Less particles on mobile
        
        for (let i = 0; i < numParticles; i++) {
            const chip = document.createElement('div');
            chip.className = 'floating-chip absolute flex items-center justify-center rounded';
            
            const size = Math.random() * 30 + 15;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 15 + 10;
            
            chip.style.width = `${size}px`;
            chip.style.height = `${size}px`;
            chip.style.left = `${left}%`;
            chip.style.top = `${top}%`;
            chip.style.animationDelay = `${delay}s`;
            chip.style.animationDuration = `${duration}s`;
            
            const icons = ['fa-microchip', 'fa-memory', 'fa-sim-card', 'fa-server'];
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            chip.innerHTML = `<i class="fas ${icon}" style="color: ${color}; font-size: ${size * 0.6}px"></i>`;
            chip.style.border = `1px solid ${color}40`;
            chip.style.backgroundColor = `${color}10`;
            
            particlesContainer.appendChild(chip);
        }
    }

    // Add random circuit traces
    const heroSection = document.getElementById('home');
    if (heroSection) {
        for (let i = 0; i < 5; i++) {
            const trace = document.createElement('div');
            trace.className = 'circuit-line';
            trace.style.top = `${Math.random() * 100}%`;
            trace.style.animationDelay = `${Math.random() * 5}s`;
            trace.style.animationDuration = `${Math.random() * 3 + 3}s`;
            heroSection.appendChild(trace);
        }
    }
});
