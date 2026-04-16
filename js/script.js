// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 500);
});

// ===== AOS INITIALIZATION =====
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ===== TYPED TEXT EFFECT =====
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['Développeur Full Stack', 'Créateur d\'applications web', 'Passionné par Laravel', 'Résolveur de problèmes'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 100);
    }
}

if (textArray.length) setTimeout(type, newTextDelay);

// ===== STATS COUNTER =====
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinksMenu = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinksMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

const animateSkills = () => {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;
    
    if (sectionPos < screenPos - 100) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        window.removeEventListener('scroll', animateSkills);
    }
};

window.addEventListener('scroll', animateSkills);

// ===== FORM SUBMISSION FEEDBACK =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.innerHTML = '<span>Envoi en cours...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message envoyé !</span><i class="fas fa-check"></i>';
            submitBtn.style.background = '#2ecc71';
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Envoyer le message</span><i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, var(--primary), #ff6b6b)';
                submitBtn.disabled = false;
            }, 3000);
        }, 1000);
    });
}