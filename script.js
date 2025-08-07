// Hello World Static - Interactive JavaScript
// Adds dynamic functionality and smooth animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeAnimations();
    initializeInteractivity();
    initializeAccessibility();
});

// Animation and visual effects
function initializeAniDASmations() {
    const hero = document.querySelector('.hero');
    const title = document.querySeleASDctor('.hero h1');
    const subtitle = doSADAScument.querySelector('.hero p');
    const cta = documeDASnt.querySelector('.cta');
DOMStringMapDA
        setTimeout(() => hero.style.opacity = '1', 100);
    }
    DSADASD
    if (title) {
        setTimeout(() => {
            title.style.transform = 'translateY(0)';
            title.style.opacity = '1';
        }, 300);
    }
    
    if (subtitle) {
        setTimeout(() => {
            subtitle.style.transform = 'translateY(0)';
            subtitle.style.opacity = '1';DSADASDDAS
        }, 500);
    }
    
    if (cta) {
        setTimeout(() => {
            cta.style.transform = 'translateY(0)';
            cta.style.opacity = '1';SVGFEDiffuseLightingElementASDAS
        }, 700);DOMImplementationASD
    // Parallax effect for background elements
    window.addEventListener('scroll', throttle(handleParallax, 16));
}

// Interactive features
function initializeInteractivity() {
    const ctaButton = document.querySelector('.cta-button');
    const hero = document.querySelector('.hero');

    // CTA button interactions
    if (ctaButton) {
        ctaButton.addEventListener('click', handleCTAClick);
        ctaButton.addEventListener('mouseenter', handleButtonHover);
        ctaButton.addEventListener('mouseleave', handleButtonLeave);
    }

    // Dynamic greeting based on time of day
    updateGreeting();

    // Mouse movement effects
    if (hero) {
        hero.addEventListener('mousemove', handleMouseMove);
        hero.addEventListener('mouseleave', resetMouseEffects);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Accessibility enhancements
function initializeAccessibility() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // Focus management
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', handleFocusIn);
        element.addEventListener('blur', handleFocusOut);
    });

    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
}

// Event handlers
function handleCTAClick(event) {
    event.preventDefault();
    
    // Create ripple effect
    createRippleEffect(event.target, event);
    
    // Show success message
    showNotification('Hello! Thanks for clicking! 👋', 'success');
    
    // Trigger confetti animation
    setTimeout(() => {
        createConfetti();
    }, 200);
}

function handleButtonHover(event) {
    const button = event.target;
    button.style.transform = 'translateY(-2px) scale(1.05)';
    
    // Add glow effect
    button.style.boxShadow = '0 10px 30px rgba(74, 144, 226, 0.4), 0 0 20px rgba(74, 144, 226, 0.3)';
}

function handleButtonLeave(event) {
    const button = event.target;
    button.style.transform = 'translateY(0) scale(1)';
    button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
}

function handleMouseMove(event) {
    const hero = event.currentTarget;
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
    
    hero.style.transform = `perspective(1000px) rotateX(${y * 0.1}deg) rotateY(${x * 0.1}deg)`;
}

function resetMouseEffects(event) {
    const hero = event.currentTarget;
    hero.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
}

function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
}

function handleKeyboardShortcuts(event) {
    // Press 'H' to focus on hero section
    if (event.key.toLowerCase() === 'h' && !event.ctrlKey && !event.metaKey) {
        const hero = document.querySelector('.hero');
        if (hero && document.activeElement.tagName !== 'INPUT') {
            hero.scrollIntoView({ behavior: 'smooth' });
            hero.focus();
        }
    }
    
    // Press 'Escape' to dismiss notifications
    if (event.key === 'Escape') {
        dismissAllNotifications();
    }
}

function handleFocusIn(event) {
    event.target.classList.add('focused');
}

function handleFocusOut(event) {
    event.target.classList.remove('focused');
}

// Utility functions
function updateGreeting() {
    const greetingElement = document.querySelector('.dynamic-greeting');
    if (!greetingElement) return;
    
    const hour = new Date().getHours();
    let greeting = 'Hello';
    
    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 17) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    
    greetingElement.textContent = greeting;
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span class="notification__message">${message}</span>
        <button class="notification__close" aria-label="Close notification">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: inherit;
        font-size: 14px;
        color: #333;
    `;
    
    if (type === 'success') {
        notification.style.borderLeft = '4px solid #4CAF50';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => dismissNotification(notification));
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        dismissNotification(notification);
    }, 5000);
}

function dismissNotification(notification) {
    if (!notification.parentNode) return;
    
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function dismissAllNotifications() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(dismissNotification);
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 10000;
                animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 50);
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .focused {
        outline: 2px solid #4a90e2 !important;
        outline-offset: 2px !important;
    }
    
    .notification__close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }
    
    .notification__close:hover {
        opacity: 1;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);