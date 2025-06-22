// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect with enhanced threshold detection
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 50) {
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && currentScroll < 50) {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Enhanced smooth scroll with better offset calculation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - headerHeight - 20, // Additional 20px padding
                behavior: 'smooth'
            });

            // Update active state
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Active section detection while scrolling
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check

    // Image loading handling
    const images = document.querySelectorAll('.student-photo');
    
    images.forEach(img => {
        img.classList.add('loading');
        
        img.addEventListener('load', function() {
            this.classList.remove('loading');
        });

        img.addEventListener('error', function() {
            this.src = 'placeholder.jpg'; // Add a default placeholder image
            this.classList.remove('loading');
        });
    });

    // Observe elements for animation
    document.querySelectorAll('.student-card, .institution').forEach(el => {
        observer.observe(el);
    });

    // Modal functionality
    document.querySelectorAll('.view-detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.student-card');
            const studentName = card.querySelector('h3').textContent;
            const studentInfo = card.querySelectorAll('p');
            
            // Create modal HTML
            const modalHTML = `
                <div class="modal-overlay">
                    <div class="modal">
                        <h2>${studentName}</h2>
                        <div class="modal-content">
                            ${Array.from(studentInfo).map(p => p.outerHTML).join('')}
                        </div>
                        <button class="view-detail-btn close-modal">Close</button>
                    </div>
                </div>
            `;
            
            // Add modal to DOM
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Activate modal with animation
            setTimeout(() => {
                const overlay = document.querySelector('.modal-overlay');
                const modal = document.querySelector('.modal');
                overlay.classList.add('active');
                modal.classList.add('active');
            }, 10);
            
            // Close modal functionality
            document.querySelector('.close-modal').addEventListener('click', closeModal);
            document.querySelector('.modal-overlay').addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });
        });
    });
});

// Close modal function
function closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    
    overlay.classList.remove('active');
    modal.classList.remove('active');
    
    setTimeout(() => {
        overlay.remove();
    }, 300);
}

// Smooth scroll functionality
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});
