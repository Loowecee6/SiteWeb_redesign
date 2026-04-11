document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    // Mobile Menu
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
        });
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const observer = new IntersectionObserver(entries => entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(r => observer.observe(r));
    }

    // Back to Top Button
    const backTop = document.getElementById('back-top');
    if (backTop) {
        window.addEventListener('scroll', () => {
            backTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Contact Form Validation
    const form = document.getElementById('contactForm');
    if (form) {
        const fields = {
            name: { el: document.getElementById('fullName'), err: document.getElementById('nameError'), validate: v => v.trim().length >= 3 },
            email: { el: document.getElementById('email'), err: document.getElementById('emailError'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            subject: { el: document.getElementById('subject'), err: document.getElementById('subjectError'), validate: v => v !== '' },
            message: { el: document.getElementById('message'), err: document.getElementById('messageError'), validate: v => v.trim().length >= 20 },
            privacy: { el: document.getElementById('privacy'), err: document.getElementById('privacyError'), validate: v => v }
        };
        const setFieldState = (el, err, isValid) => {
            el.classList.toggle('error', !isValid);
            err.classList.toggle('visible', !isValid);
            el.setAttribute('aria-invalid', (!isValid).toString());
        };
        Object.values(fields).forEach(({ el, err, validate }) => {
            el.addEventListener(el.type === 'checkbox' ? 'change' : 'blur', () => {
                const val = el.type === 'checkbox' ? el.checked : el.value;
                setFieldState(el, err, validate(val));
            });
        });
        form.addEventListener('submit', e => {
            e.preventDefault();
            let ok = true;
            Object.values(fields).forEach(({ el, err, validate }) => {
                const val = el.type === 'checkbox' ? el.checked : el.value;
                const valid = validate(val);
                setFieldState(el, err, valid);
                if (!valid) ok = false;
            });
            if (ok) {
                const btn = document.getElementById('submitBtn');
                const txt = document.getElementById('submitText');
                if (btn) btn.disabled = true;
                if (txt) txt.textContent = 'Envoi en cours...';
                setTimeout(() => {
                    if (btn) btn.disabled = false;
                    if (txt) txt.textContent = 'Envoyer le message';
                    const successMsg = document.getElementById('formSuccess');
                    if (successMsg) successMsg.classList.add('visible');
                    form.reset();
                    Object.values(fields).forEach(({ el, err }) => {
                        el.classList.remove('error');
                        err.classList.remove('visible');
                        el.setAttribute('aria-invalid', 'false');
                    });
                    setTimeout(() => { if (successMsg) successMsg.classList.remove('visible'); }, 6000);
                }, 1500);
            } else {
                const first = form.querySelector('.error');
                if (first) first.focus();
            }
        });
    }
});
