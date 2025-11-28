document.addEventListener('DOMContentLoaded', function() {
    const RECAPTCHA_SITE_KEY = '6LcRGRosAAAAAInfsA3ShegwzWLOrTAmsl6zSapc';
    const MIN_FORM_FILL_TIME = 3000;
    const MAX_SUBMISSIONS_PER_SESSION = 3;
    const COOLDOWN_PERIOD = 60000;
    
    const formLoadTime = Date.now();
    let submissionCount = parseInt(sessionStorage.getItem('formSubmissions') || '0');
    let lastSubmissionTime = parseInt(sessionStorage.getItem('lastSubmission') || '0');
    
    const formTimeInput = document.getElementById('formTime');
    if (formTimeInput) {
        formTimeInput.value = formLoadTime;
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const honeypot = contactForm.querySelector('input[name="_honey"]');
        if (honeypot) {
            honeypot.setAttribute('autocomplete', 'off');
            honeypot.setAttribute('tabindex', '-1');
        }
        
        // Hacer el campo mensaje requerido cuando se selecciona "Otro"
        const interestSelect = document.getElementById('interest');
        const messageField = document.getElementById('message');
        const messageLabel = messageField ? messageField.previousElementSibling : null;
        
        if (interestSelect && messageField) {
            interestSelect.addEventListener('change', function() {
                if (this.value === 'Otro') {
                    messageField.setAttribute('required', 'required');
                    if (messageLabel) {
                        messageLabel.innerHTML = 'Mensaje <span style="color: red;">*</span>';
                    }
                    messageField.placeholder = 'Por favor, describe tu consulta';
                } else {
                    messageField.removeAttribute('required');
                    if (messageLabel) {
                        messageLabel.innerHTML = 'Mensaje';
                    }
                    messageField.placeholder = 'Opcional: cuéntanos más sobre tu consulta';
                }
            });
        }
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (honeypot && honeypot.value !== '') {
                console.warn('Bot detectado: honeypot filled');
                return false;
            }
            
            const currentTime = Date.now();
            const timeTaken = currentTime - formLoadTime;
            
            if (timeTaken < MIN_FORM_FILL_TIME) {
                showFormError('Por favor, tómate tu tiempo para llenar el formulario correctamente.');
                return false;
            }
            if (submissionCount >= MAX_SUBMISSIONS_PER_SESSION) {
                showFormError('Has alcanzado el límite de envíos. Por favor, intenta más tarde o contáctanos directamente.');
                return false;
            }
            
            if (lastSubmissionTime && (currentTime - lastSubmissionTime) < COOLDOWN_PERIOD) {
                const waitTime = Math.ceil((COOLDOWN_PERIOD - (currentTime - lastSubmissionTime)) / 1000);
                showFormError(`Por favor espera ${waitTime} segundos antes de enviar otro mensaje.`);
                return false;
            }
            
            if (!validateFormInputs()) {
                return false;
            }
            
            if (containsSpamPatterns()) {
                showFormError('Tu mensaje contiene contenido no permitido. Por favor, revísalo.');
                return false;
            }
            
            try {
                const token = await executeRecaptcha();
                document.getElementById('recaptchaResponse').value = token;
            } catch (error) {
                console.error('reCAPTCHA error:', error);
                showFormError('Error de verificación. Por favor, recarga la página e intenta de nuevo.');
                return false;
            }
            
            showFormLoading();
            
            submissionCount++;
            sessionStorage.setItem('formSubmissions', submissionCount.toString());
            sessionStorage.setItem('lastSubmission', currentTime.toString());
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': document.getElementById('interest').value
                });
            }
            
            // Actualizar el asunto del correo con el motivo de contacto
            const interestValue = document.getElementById('interest').value;
            const subjectInput = document.getElementById('_subject');
            if (subjectInput && interestValue) {
                subjectInput.value = `ArqGest - ${interestValue}`;
            }
            
            this.submit();
        });
    }
    
    function executeRecaptcha() {
        return new Promise((resolve, reject) => {
            if (typeof grecaptcha === 'undefined') {
                console.warn('reCAPTCHA no disponible');
                resolve('no-recaptcha');
                return;
            }
            
            grecaptcha.ready(function() {
                grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'})
                    .then(resolve)
                    .catch(reject);
            });
        });
    }
    
    function validateFormInputs() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const interest = document.getElementById('interest').value;
        
        if (name.length < 2 || name.length > 100) {
            showFormError('Por favor, ingresa un nombre válido (2-100 caracteres).');
            return false;
        }
        
        if (/^\d+$/.test(name)) {
            showFormError('Por favor, ingresa un nombre válido.');
            return false;
        }
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            showFormError('Por favor, ingresa un email válido.');
            return false;
        }
        
        if (!interest) {
            showFormError('Por favor, selecciona un motivo de contacto.');
            return false;
        }
        
        const message = document.getElementById('message').value.trim();
        
        // Si el motivo es "Otro", el mensaje es obligatorio
        if (interest === 'Otro' && message.length === 0) {
            showFormError('Por favor, describe tu consulta en el mensaje cuando seleccionas "Otro".');
            return false;
        }
        
        if (message.length > 1000) {
            showFormError('El mensaje es demasiado largo (máximo 1000 caracteres).');
            return false;
        }
        
        return true;
    }
    
    function containsSpamPatterns() {
        const message = document.getElementById('message').value.toLowerCase();
        const name = document.getElementById('name').value.toLowerCase();
        const email = document.getElementById('email').value.toLowerCase();
        
        const spamPatterns = [
            /viagra/i,
            /cialis/i,
            /casino/i,
            /lottery/i,
            /bitcoin/i,
            /crypto/i,
            /winner/i,
            /congratulations/i,
            /click here/i,
            /buy now/i,
            /limited time/i,
            /act now/i,
            /(http|https):\/\/[^\s]+/gi,
            /\b\d{10,}\b/,
        ];
        
        const urlMatches = message.match(/(http|https):\/\/[^\s]+/gi);
        if (urlMatches && urlMatches.length > 2) {
            return true;
        }
        
        for (const pattern of spamPatterns) {
            if (pattern.test(message) || pattern.test(name)) {
                return true;
            }
        }
        
        const repeatedChars = /(.)\1{10,}/;
        const repeatedWords = /\b(\w+)\s+\1\s+\1/i;
        
        if (repeatedChars.test(message) || repeatedWords.test(message)) {
            return true;
        }
        
        const tempEmailDomains = [
            'tempmail.com',
            'guerrillamail.com',
            '10minutemail.com',
            'throwaway.email',
            'mailinator.com'
        ];
        
        for (const domain of tempEmailDomains) {
            if (email.includes(domain)) {
                return true;
            }
        }
        
        return false;
    }
    
    function showFormError(message) {
        const existingError = contactForm.querySelector('.form-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.style.cssText = `
            background-color: #fee;
            border: 1px solid #fcc;
            color: #c33;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 14px;
            animation: slideDown 0.3s ease;
        `;
        errorDiv.textContent = message;
        
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }
    
    function showFormLoading() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
        }
    }
    
    let pasteCount = 0;
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('paste', function() {
            pasteCount++;
            if (pasteCount > 3) {
                console.warn('Comportamiento sospechoso: múltiples paste events');
            }
        });
        
        let keyCount = 0;
        let keyTimer = null;
        
        input.addEventListener('keydown', function() {
            keyCount++;
            clearTimeout(keyTimer);
            
            keyTimer = setTimeout(() => {
                if (keyCount > 100) {
                    console.warn('Comportamiento sospechoso: typing muy rápido');
                }
                keyCount = 0;
            }, 1000);
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 5;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.feature-card, .finanzas-card, .kanban-card, .pricing-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    const kanbanCards = document.querySelectorAll('.kanban-card');
    
    kanbanCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'move';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.cursor = 'default';
        });
    });
    
    // Efecto parallax solo en desktop
    const isMobileDevice = window.innerWidth <= 768;
    
    if (!isMobileDevice) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero-image');
            
            if (heroImage && scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.innerHTML = value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const originalText = stat.textContent;
                    if (index === 0 && originalText.includes('%')) {
                        animateValue(stat, 0, 100, 1500, '%');
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    document.querySelectorAll('.hero-image').forEach(img => {
        img.style.transform = 'none';
    });
}

if (!window.IntersectionObserver) {
    document.querySelectorAll('.feature-card, .finanzas-card, .kanban-card, .pricing-card').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const logoLink = document.getElementById('logoLink');
if (logoLink) {
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
