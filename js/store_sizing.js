// Enhanced Store Sizing and Purchase Functionality
// This file can be included separately or merged with your existing store.js

class StoreSizing {
    constructor() {
        this.init();
    }

    init() {
        this.setupSizeDropdowns();
        this.setupBuyButtons();
        this.setupStoreNavigation();
    }

    setupSizeDropdowns() {
        const sizeDropdowns = document.querySelectorAll('.size-dropdown');
        
        sizeDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', (e) => {
                this.handleSizeSelection(e.target);
            });
        });
    }

    handleSizeSelection(dropdown) {
        const productId = dropdown.getAttribute('data-product');
        const selectedSize = dropdown.value;
        const buyButton = document.querySelector(`button[data-product="${productId}"]`);
        
        if (!buyButton) return;

        if (selectedSize) {
            buyButton.disabled = false;
            buyButton.textContent = `Buy Now - Size ${selectedSize}`;
            buyButton.classList.remove('disabled');
            
            // Add visual feedback
            buyButton.style.backgroundColor = '#007bff';
            buyButton.style.cursor = 'pointer';
        } else {
            buyButton.disabled = true;
            buyButton.textContent = 'Select Size First';
            buyButton.classList.add('disabled');
            
            // Visual feedback for disabled state
            buyButton.style.backgroundColor = '#ccc';
            buyButton.style.cursor = 'not-allowed';
        }

        // Store selection in session storage for potential cart functionality
        this.storeSelection(productId, selectedSize);
    }

    setupBuyButtons() {
        const buyButtons = document.querySelectorAll('.buy-button');
        
        buyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handlePurchase(e.target);
            });
        });
    }

    handlePurchase(button) {
        const productId = button.getAttribute('data-product');
        const stripeUrl = button.getAttribute('data-stripe-url');
        const sizeDropdown = document.querySelector(`select[data-product="${productId}"]`);
        
        if (!sizeDropdown) {
            // No size dropdown for this product (e.g., stickers, mugs)
            window.open(stripeUrl, '_blank');
            return;
        }

        const selectedSize = sizeDropdown.value;

        if (!selectedSize) {
            this.showSizeAlert();
            return;
        }

        // Store purchase information
        this.storePurchaseInfo(productId, selectedSize);

        // Add loading state
        this.setButtonLoading(button, true);

        // Redirect to Stripe checkout
        window.open(stripeUrl, '_blank');

        // Remove loading state after a short delay
        setTimeout(() => {
            this.setButtonLoading(button, false);
        }, 2000);
    }

    showSizeAlert() {
        // Create custom alert modal instead of browser alert
        const alertModal = document.createElement('div');
        alertModal.className = 'size-alert-modal';
        alertModal.innerHTML = `
            <div class="alert-content">
                <h3>Size Required</h3>
                <p>Please select a size before purchasing.</p>
                <button onclick="this.parentElement.parentElement.remove()" class="alert-close-btn">OK</button>
            </div>
        `;
        
        // Add styles
        alertModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const alertContent = alertModal.querySelector('.alert-content');
        alertContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        
        const closeBtn = alertModal.querySelector('.alert-close-btn');
        closeBtn.style.cssText = `
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 15px;
        `;
        
        document.body.appendChild(alertModal);
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.originalText = button.textContent;
            button.textContent = 'Processing...';
            button.disabled = true;
            button.style.opacity = '0.7';
        } else {
            button.textContent = button.originalText || 'Buy Now';
            button.disabled = false;
            button.style.opacity = '1';
        }
    }

    storeSelection(productId, size) {
        const selections = JSON.parse(sessionStorage.getItem('sizeSelections') || '{}');
        selections[productId] = size;
        sessionStorage.setItem('sizeSelections', JSON.stringify(selections));
    }

    storePurchaseInfo(productId, size) {
        const purchaseInfo = {
            productId: productId,
            size: size,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('lastPurchase', JSON.stringify(purchaseInfo));
        
        // Store in purchase history
        const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
        history.push(purchaseInfo);
        localStorage.setItem('purchaseHistory', JSON.stringify(history));
    }

    setupStoreNavigation() {
        const storeNavLinks = document.querySelectorAll('.store-nav a');
        
        storeNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollToSection(link.getAttribute('href'));
            });
        });
    }

    smoothScrollToSection(href) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Utility method to get all current selections
    getCurrentSelections() {
        return JSON.parse(sessionStorage.getItem('sizeSelections') || '{}');
    }

    // Utility method to clear all selections
    clearSelections() {
        sessionStorage.removeItem('sizeSelections');
        
        // Reset all dropdowns
        document.querySelectorAll('.size-dropdown').forEach(dropdown => {
            dropdown.value = '';
        });
        
        // Reset all buy buttons
        document.querySelectorAll('.buy-button').forEach(button => {
            button.disabled = true;
            button.textContent = 'Buy Now';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StoreSizing();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StoreSizing;
}

