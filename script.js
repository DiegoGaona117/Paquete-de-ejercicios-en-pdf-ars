
// ============================================
// GOOGLE ANALYTICS
// ============================================
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-RN68VLQLTW');

// ============================================
// CONFIGURACIÓN DEL CONTADOR - 24 HORAS
// ============================================
const CONFIG = {
    // ENLACES DE COMPRA
    discountLink: 'https://pay.hotmart.com/P102008003G?off=0unksroe&bid=1767332143277',
    regularLink: 'https://pay.hotmart.com/P102008003G?off=yifidpxx',
    
    // PRECIOS
    discountPrice: {
        original: '$27.99 USD',
        sale: '$19.99 USD',
        save: 'AHORRA 33%'
    },
    regularPrice: {
        original: '',
        sale: '$27.99 USD',
        save: ''
    },
    
    // DURACIÓN: 24 HORAS FIJAS
    countdownHours: 24
};

// ============================================
// VARIABLES GLOBALES
// ============================================
let countdownInterval;

// ============================================
// LAZY LOAD DEL VIDEO YOUTUBE
// ============================================
const videoContainer = document.querySelector('.video-container');
if (videoContainer) {
    videoContainer.addEventListener('click', function() {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/GD6Wpsdcq_Y?si=IDl2EVkFWI1E9K-J&autoplay=1';
        iframe.title = 'Detalles libro SolidWorks';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        this.innerHTML = '';
        this.appendChild(iframe);
    }, { once: true });
}

// ============================================
// FAQ ACCORDION FUNCTIONALITY
// ============================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const answer = this.nextElementSibling;
        
        // Cerrar todas las demás FAQs abiertas
        document.querySelectorAll('.faq-question').forEach(otherButton => {
            if (otherButton !== this) {
                otherButton.setAttribute('aria-expanded', 'false');
                otherButton.nextElementSibling.classList.remove('active');
            }
        });
        
        // Toggle FAQ actual
        this.setAttribute('aria-expanded', !isExpanded);
        answer.classList.toggle('active');
    });
});

// ============================================
// INICIALIZACIÓN DEL COUNTDOWN
// ============================================
function initCountdown() {
    // Verificar si ya existe un countdown en localStorage
    let endTime = localStorage.getItem('countdownEndTime');
    
    if (!endTime) {
        // Primera vez: crear nuevo countdown de 24 horas
        const now = new Date().getTime();
        const duration = CONFIG.countdownHours * 60 * 60 * 1000;
        endTime = now + duration;
        localStorage.setItem('countdownEndTime', endTime);
    }

    // Iniciar el contador
    updateCountdown(parseInt(endTime));
    countdownInterval = setInterval(() => updateCountdown(parseInt(endTime)), 1000);
}

// ============================================
// ACTUALIZAR CONTADOR
// ============================================
function updateCountdown(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
        // Tiempo expirado
        clearInterval(countdownInterval);
        showExpiredState();
        return;
    }

    // Calcular tiempo restante
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar display del contador
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Actualizar mensaje según tiempo restante
    updateUrgencyMessage(hours);

    // Actualizar TODOS los botones con descuento
    updateAllButtons(true);
}

// ============================================
// MENSAJES DINÁMICOS DE URGENCIA
// ============================================
function updateUrgencyMessage(hours) {
    const message = document.getElementById('countdownMessage');
    
    if (hours < 6) {
        message.innerHTML = '🔥 ¡ÚLTIMAS 6 HORAS! No dejes pasar esta oportunidad';
    } else if (hours < 12) {
        message.innerHTML = '⚠️ ¡Quedan menos de 12 horas! El descuento termina pronto';
    } else if (hours < 24) {
        message.innerHTML = '⏰ ¡Menos de 24 horas! Aprovecha antes que termine';
    } else {
        message.innerHTML = '🔥 ¡Aprovecha el 50% de descuento antes que termine!';
    }
}

// ============================================
// ESTADO EXPIRADO
// ============================================
function showExpiredState() {
    const banner = document.getElementById('countdownBanner');
    const timer = document.getElementById('countdownTimer');
    const message = document.getElementById('countdownMessage');
    
    // Cambiar apariencia del banner
    banner.classList.add('expired');
    timer.style.display = 'none';
    
    message.innerHTML = '<div class="expired-message">⏰ La oferta especial ha finalizado</div>';
    
    // Actualizar TODOS los botones a precio regular
    updateAllButtons(false);
}

// ============================================
// ACTUALIZAR TODOS LOS BOTONES Y PRECIOS
// ============================================
function updateAllButtons(isDiscount) {
    // Seleccionar TODOS los enlaces de compra en la página
    const allBuyButtons = document.querySelectorAll('.cta-link');
    const allPriceDisplays = document.querySelectorAll('.price-display');
    
    // Actualizar enlaces
    allBuyButtons.forEach(button => {
        button.href = isDiscount ? CONFIG.discountLink : CONFIG.regularLink;
    });
    
    // Actualizar precios
    allPriceDisplays.forEach(priceTag => {
        if (isDiscount) {
            priceTag.innerHTML = `
                <span class="price-original">${CONFIG.discountPrice.original}</span>
                <span class="price-discount">${CONFIG.discountPrice.sale}</span>
                <span class="price-save">${CONFIG.discountPrice.save}</span>
            `;
        } else {
            priceTag.innerHTML = `
                <span class="price-discount">${CONFIG.regularPrice.sale}</span>
            `;
        }
    });
}

// ============================================
// FUNCIÓN DE PRUEBA (eliminar en producción)
// ============================================
function testExpiration() {
    clearInterval(countdownInterval);
    showExpiredState();
    console.log('✅ Simulando expiración del contador...');
}

// ============================================
// INICIAR AL CARGAR LA PÁGINA
// ============================================
window.addEventListener('DOMContentLoaded', initCountdown);
