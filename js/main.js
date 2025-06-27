// Sam's Goods Website - Main JavaScript

// Cart state
let cart = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initBookingCalendar();
    initCart();
    initAudioPlayers();
    
    console.log('Sam\'s Goods website loaded successfully!');
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update toggle icon
            if (navMenu.classList.contains('active')) {
                navToggle.innerHTML = '✕';
            } else {
                navToggle.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '☰';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.card, .section-title, .hero-content');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
            }
        });
    }
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }, 2000);
        });
    }
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }, 2000);
        });
        
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', function() {
                updateServiceInfo(this.value);
            });
        }
    }
}

// Update service information based on selection
function updateServiceInfo(service) {
    console.log('Service selected:', service);
}

// Booking calendar functionality
function initBookingCalendar() {
    const calendarCells = document.querySelectorAll('.booking-calendar td.available, .booking-calendar td.booked');
    
    calendarCells.forEach(cell => {
        if (cell.classList.contains('available')) {
            cell.addEventListener('click', function() {
                const row = this.parentNode;
                const timeSlot = row.querySelector('td:first-child').textContent;
                const dayIndex = Array.from(row.children).indexOf(this) - 1;
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                const day = days[dayIndex];
                
                if (day) {
                    alert(`Time slot selected: ${day} at ${timeSlot}\n\nPlease use the booking form to request this time slot.`);
                }
            });
            
            cell.style.cursor = 'pointer';
            cell.title = 'Click to select this time slot';
        }
    });
}

// Cart functionality
function initCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    
    if (cartToggle && closeCart && cartSidebar) {
        cartToggle.addEventListener('click', function() {
            cartSidebar.classList.toggle('active');
        });
        
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
        });
        
        document.addEventListener('click', function(event) {
            if (!cartToggle.contains(event.target) && !cartSidebar.contains(event.target)) {
                cartSidebar.classList.remove('active');
            }
        });
        
        updateCart();
    }
}

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    updateCart();
    showNotification(`${itemName} added to cart!`, 'success');
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
    showNotification(`${itemName} removed from cart`, 'info');
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    if (cartItems && cartTotal && cartCount) {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    showNotification(`Redirecting to checkout - Total: $${total.toFixed(2)}`, 'info');
    
    setTimeout(() => {
        alert('Payment integration would be implemented here.\n\nContact Samosupreme@samsgoods.company to complete your purchase.');
        cart = [];
        updateCart();
    }, 1500);
}

// Beat purchase functionality
function purchaseBeat(beatName, licenseType) {
    const prices = {
        'Wide Open Sky': { mp3_lease: 19.99, wav_lease: 39.99, exclusive: 249 },
        'Voltage Echo': { mp3_lease: 24.99, wav_lease: 44.99, exclusive: 299 },
        'Trap Relic': { mp3_lease: 24.99, wav_lease: 44.99, exclusive: 249 },
        'Solar Ledge': { mp3_lease: 19.99, wav_lease: 39.99, exclusive: 199 },
        'Smoke Ritual': { mp3_lease: 24.99, wav_lease: 44.99, exclusive: 249 },
        'Shadow Circuit': { mp3_lease: 24.99, wav_lease: 44.99, exclusive: 249 },
        'Ruthless Momentum': { mp3_lease: 29.99, wav_lease: 49.99, exclusive: 299 },
        'Mirror Path': { mp3_lease: 19.99, wav_lease: 39.99, exclusive: 199 },
        'Buried Tempo': { mp3_lease: 14.99, wav_lease: 34.99, exclusive: 149 },
        'Blood Season': { mp3_lease: 24.99, wav_lease: 44.99, exclusive: 249 }
    };
    
    const price = prices[beatName] ? prices[beatName][licenseType] : 0;
    const licenseText = licenseType === 'mp3_lease' ? 'MP3 Lease' : licenseType === 'wav_lease' ? 'WAV Lease' : 'Exclusive Rights';
    
    if (confirm(`Purchase ${licenseText} for "${beatName}" - $${price.toFixed(2)}?\n\nThis will redirect you to our payment page.`)) {
        showNotification(`Redirecting to payment for ${beatName} (${licenseText}) - $${price.toFixed(2)}`, 'info');
        
        setTimeout(() => {
            alert('Payment integration would be implemented here.\n\nContact Samosupreme@samsgoods.company to complete your purchase.');
        }, 1500);
    }
}

// Audio player enhancements
function initAudioPlayers() {
    const players = document.querySelectorAll('.custom-audio-player');
    
    function getBPM(beatName) {
        const bpmMap = {
            'Wide Open Sky': { bpm: '73 BPM', space: ' - 73 BPM', underscore: '_73 BPM', hyphen: '-73 BPM' },
            'Voltage Echo': { bpm: '116 BPM', space: ' - 116 BPM', underscore: '_116 BPM', hyphen: '-116 BPM' },
            'Trap Relic': { bpm: '97 BPM', space: ' - 97 BPM', underscore: '_97 BPM', hyphen: '-97 BPM' },
            'Solar Ledge': { bpm: '92 BPM', space: ' - 92 BPM', underscore: '_92 BPM', hyphen: '-92 BPM' },
            'Smoke Ritual': { bpm: '107 BPM', space: ' - 107 BPM', underscore: '_107 BPM', hyphen: '-107 BPM' },
            'Shadow Circuit': { bpm: '132 BPM', space: ' - 132 BPM', underscore: '_132 BPM', hyphen: '-132 BPM' },
            'Ruthless Momentum': { bpm: '155 BPM', space: ' -155 BPM', underscore: '-155 BPM', hyphen: '-155 BPM' },
            'Mirror Path': { bpm: '94 BPM', space: ' - 94 BPM', underscore: '_94 BPM', hyphen: '-94 BPM' },
            'Buried Tempo': { bpm: '69 BPM', space: ' - 69 BPM', underscore: '_69 BPM', hyphen: '-69 BPM' },
            'Blood Season': { bpm: '85 BPM', space: ' - 85 BPM', underscore: '_85 BPM', hyphen: '-85 BPM' }
        };
        return bpmMap[beatName] || { bpm: '', space: '', underscore: '', hyphen: '' };
    }
    
    players.forEach(player => {
        const beatName = player.dataset.beatName;
        const audio = player.querySelector('audio');
        const playPauseBtn = player.querySelector('.play-pause-btn');
        const timeDisplay = player.querySelector('.time-display');
        let img = player.querySelector('.album-art');
        
        // Add album art only if not already present
        if (beatName && !img) {
            img = document.createElement('img');
            img.className = 'album-art';
            const { bpm, space, underscore, hyphen } = getBPM(beatName);
            img.src = `Beats_for_sale/${beatName}${space}.png`;
            img.alt = `${beatName} Album Art`;
            img.style.maxWidth = '150px';
            img.style.marginBottom = '10px';
            img.onload = () => {
                console.log(`Loaded ${beatName} art: ${img.src} (${img.naturalWidth}x${img.naturalHeight}px)`);
            };
            img.onerror = () => {
                console.error(`Failed to load album art for ${beatName}: ${img.src}`);
                img.src = "."; // Fallback to empty src
                img.alt = 'No Album Art';
            };
            player.insertBefore(img, audio);
        } else if (img) {
            img.onload = () => {
                console.log(`Loaded existing ${beatName} art: ${img.src} (${img.naturalWidth}x${img.naturalHeight}px)`);
            };
            img.onerror = () => {
                console.error(`Failed to load existing album art for ${beatName}: ${img.src}`);
                img.src = ''; // Fallback to empty src
                img.alt = 'No Album Art';
            };
        }
        
        // Audio handling
        if (audio && playPauseBtn && timeDisplay) {
            // Prevent right-click download
            audio.addEventListener('contextmenu', (e) => e.preventDefault());
            
            // Play/pause functionality
            playPauseBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play().catch(err => {
                        console.error(`Playback error for ${beatName}: ${err}`);
                        showNotification(`Error playing ${beatName}`, 'error');
                    });
                    playPauseBtn.textContent = 'Pause';
                } else {
                    audio.pause();
                    playPauseBtn.textContent = 'Play';
                }
            });
            
            // Update time display
            audio.addEventListener('timeupdate', () => {
                const current = formatTime(audio.currentTime);
                const duration = formatTime(audio.duration || 0);
                timeDisplay.textContent = `${current} / ${duration}`;
            });
            
            // Reset on end
            audio.addEventListener('ended', () => {
                playPauseBtn.textContent = 'Play';
                audio.currentTime = 0;
            });
            
            // Audio loading state
            audio.addEventListener('loadstart', () => {
                player.classList.add('loading');
            });
            
            audio.addEventListener('canplay', () => {
                player.classList.remove('loading');
            });
            
            // Audio error handling
            audio.addEventListener('error', () => {
                player.classList.remove('loading');
                playPauseBtn.disabled = true;
                playPauseBtn.textContent = 'Audio Unavailable';
                console.error(`Failed to load audio for ${beatName}: ${audio.querySelector('source').src}`);
                showNotification(`Error loading audio for ${beatName}`, 'error');
            });
            
            // Format time in MM:SS
            function formatTime(seconds) {
                const mins = Math.floor(seconds / 60);
                seconds = Math.floor(seconds % 60);
                return `${mins}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        } else {
            console.error(`Missing elements in player for ${beatName}:`, { audio, playPauseBtn, timeDisplay });
        }
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Export functions for use in other scripts
window.SamsGoods = {
    showNotification,
    purchaseBeat,
    addToCart,
    removeFromCart,
    updateCart,
    checkout
};