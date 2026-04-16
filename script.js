/* script.js */

// Sticky Navbar
const header = document.querySelector('.header');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// --- Placement Hero Background Image Slider ---

const bgLayers = document.querySelectorAll('.placement-bg-layer');
let currentBg = 0;
const totalBgs = bgLayers.length;

// Set first active (if not already set by HTML)
if (bgLayers.length > 0) {
    bgLayers.forEach((layer, i) => {
        layer.classList.toggle('active', i === 0);
    });

    setInterval(() => {
        // Remove 'active' from current
        bgLayers[currentBg].classList.remove('active');
        // Next index
        currentBg = (currentBg + 1) % totalBgs;
        // Add 'active' to new current
        bgLayers[currentBg].classList.add('active');
    }, 5000); // 5 seconds
}

// Mobile Hamburger Menu
menuIcon.addEventListener('click', () => {
    menuIcon.querySelector('i').classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close navbar when clicking a link
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.querySelector('i').classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Scroll Reveal Animation (Observer)
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Active Link highlighting on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// Form Submission handling (Dummy)
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        successMsg.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    });
}

// Set active menu link primarily by exact URL match across pages
document.addEventListener('DOMContentLoaded', () => {
    const urls = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    urls.forEach(link => {
        const linkDest = link.getAttribute('href');
        // Ensure accurate highlighting for exact filename.
        if (linkDest === currentPage || (currentPage === '' && linkDest === 'index.html')) {
            link.classList.add("active");
        } else {
            // Because script.js is used on single pages, scrolling active overrides will remain. 
            // This is primarily for other distinct files like about.html.
        }
    });
});

// Testimonial Slider for Placements Page
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.placement-testimonial-track');
    if (track) {
        const slides = document.querySelectorAll('.placement-testimonial-slide');
        const nextBtn = document.getElementById('placement-next');
        const prevBtn = document.getElementById('placement-prev');
        let currentIndex = 0;

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            });
            
            // Auto slide
            setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            }, 5000);
        }
    }
});

// Placement Overview Background Image Slider
document.addEventListener('DOMContentLoaded', () => {
    const placementHero = document.querySelector('.placement-hero');
    if (!placementHero) return;

    const layer1 = placementHero.querySelector('.layer-1');
    const layer2 = placementHero.querySelector('.layer-2');
    if (!layer1 || !layer2) return;

    const images = [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=75",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=75",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=75"
    ];

    let index = 0;
    let activeLayer = layer1;
    let idleLayer = layer2;

    const setSlide = (imageUrl) => {
        idleLayer.style.backgroundImage = `url('${imageUrl}')`;
        placementHero.style.backgroundImage = `url('${imageUrl}')`;
        idleLayer.classList.add('active');
        activeLayer.classList.remove('active');
        [activeLayer, idleLayer] = [idleLayer, activeLayer];
    };

    layer1.style.backgroundImage = `url('${images[0]}')`;
    layer1.classList.add('active');
    placementHero.style.backgroundImage = `url('${images[0]}')`;

    setInterval(() => {
        index = (index + 1) % images.length;
        setSlide(images[index]);
    }, 5000);
});

// ITI Gallery - Filtering + Lightbox
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('itiGalleryGrid');
    if (!grid) return;

    const filterBtns = document.querySelectorAll('.iti-gallery-filter-btn');
    const cards = grid.querySelectorAll('.iti-gallery-card');

    function applyFilter(filterValue) {
        cards.forEach(card => {
            const category = card.getAttribute('data-category') || '';
            const shouldShow = filterValue === 'all' || category === filterValue;
            card.classList.toggle('is-hidden', !shouldShow);
        });
    }

    // Ensure initial state matches the "All" filter button
    applyFilter('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            applyFilter(btn.getAttribute('data-filter') || 'all');
        });
    });

    // Lightbox handling
    const lightbox = document.getElementById('itiGalleryLightbox');
    const lightboxImg = document.getElementById('itiGalleryLightboxImg');
    const lightboxCaption = document.getElementById('itiGalleryLightboxCaption');
    const lightboxClose = document.getElementById('itiGalleryLightboxClose');
    if (!lightbox || !lightboxImg || !lightboxCaption || !lightboxClose) return;

    function openLightbox({ src, alt, caption }) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        lightboxCaption.textContent = caption || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });

    grid.addEventListener('click', (e) => {
        const img = e.target.closest('.iti-gallery-img');
        if (!img) return;

        const src = img.getAttribute('data-full') || img.src;
        const alt = img.getAttribute('alt') || '';
        const caption = img.getAttribute('data-title') || '';

        openLightbox({ src, alt, caption });
    });
});
