// StarVerse interactive features
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const backToTop = document.getElementById('backToTop');
const currentDate = document.getElementById('currentDate');
const currentTime = document.getElementById('currentTime');
const visitorCounter = document.getElementById('visitorCounter');
const zodiacSearch = document.getElementById('zodiacSearch');
const zodiacCards = document.querySelectorAll('.zodiac-card');
const loadingScreen = document.getElementById('loadingScreen');
const typedText = document.querySelector('.typing-text');
const formElement = document.getElementById('horoscopeFormElement');
const progressBar = document.getElementById('formProgress');
const meterElement = document.querySelector('meter');
const progressOutput = document.getElementById('progressOutput');
const newsletterForm = document.getElementById('newsletterForm');

// Popup greeting and loading
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 800);
    animateTyping();
    updateDateTime();
    animateVisitorCounter();
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Current date and time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }; 
    currentDate.textContent = now.toLocaleDateString(undefined, options);
    currentTime.textContent = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    setTimeout(updateDateTime, 1000);
}

// Typing animation
function animateTyping() {
    const text = typedText.dataset.text;
    let index = 0;
    const speed = 80;
    typedText.textContent = '';
    function type() {
        if (index < text.length) {
            typedText.textContent += text.charAt(index);
            index += 1;
            setTimeout(type, speed);
        }
    }
    type();
}

// Visitor counter animation
function animateVisitorCounter() {
    let count = 0;
    const target = 942;
    const interval = setInterval(() => {
        count += 3;
        visitorCounter.textContent = count;
        if (count >= target) {
            visitorCounter.textContent = target;
            clearInterval(interval);
        }
    }, 18);
}

// Live zodiac search
zodiacSearch.addEventListener('input', () => {
    const query = zodiacSearch.value.toLowerCase();
    zodiacCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(query) ? 'grid' : 'none';
    });
});

// Form validation and progress
if (formElement) {
    const requiredFields = formElement.querySelectorAll('input[required], select[required]');

    formElement.addEventListener('input', () => {
        const filled = Array.from(requiredFields).filter(field => field.value.trim() !== '').length;
        const percent = Math.round((filled / requiredFields.length) * 100);
        progressBar.value = percent;
        meterElement.value = percent;
        progressOutput.textContent = `${percent}% complete`;
    });

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const invalid = Array.from(requiredFields).filter(field => !field.checkValidity());
        if (invalid.length > 0) {
            invalid[0].focus();
            alert('Please fill in all required fields before submitting.');
            return;
        }

        alert('Your horoscope request has been sent to the stars!');
        formElement.reset();
        progressBar.value = 0;
        meterElement.value = 0;
        progressOutput.textContent = '0% complete';
    });
}

// Newsletter submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (!emailInput.value || !emailInput.checkValidity()) {
            alert('Please enter a valid email to subscribe.');
            return;
        }
        alert(`Subscribed successfully with ${emailInput.value}!`);
        newsletterForm.reset();
    });
}

// Scroll reveal effect
const revealElements = document.querySelectorAll('.section, .zodiac-card, .media-grid article, .testimonial-grid article, .planets-grid article');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

revealElements.forEach(el => observer.observe(el));

// Smooth anchor focus offset
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});
