// Sam's Goods Store - Shopping Cart Functionality

// Shopping cart state
let cart = {
    items: [],
    total: 0
};

// Initialize store functionality
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    loadCartFromStorage();
    updateCartDisplay();
    
    console.log('Store functionality initialized');
});

// Initialize cart functionality
function initCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    
    if (cartToggle && cartSidebar) {
        // Toggle cart sidebar
        cartToggle.addEventListener('click', function() {
            cartSidebar.classList.toggle('active');
        });
        
        // Close cart
        if (closeCart) {
            closeCart.addEventListener('click', function() {
                cartSidebar.classList.remove('active');
            });
        }
        
        // Close cart when clicking outside
        document.addEventListener('click', function(event) {
            if (!cartSidebar.contains(event.target) && !cartToggle.contains(event.target)) {
                cartSidebar.classList.remove('active');
            }
        });
    }
}

// Add item to cart
function addToCart(name, price, image = null) {
    // Check if item already exists in cart
    const existingItem = cart.items.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            name: name,
            price: price,
            quantity: 1,
            image: image
        });
    }
    
    updateCartTotal();
    updateCartDisplay();
    saveCartToStorage();
    
    // Show notification
    if (window.SamsGoods && window.SamsGoods.showNotification) {
        window.SamsGoods.showNotification(`${name} added to cart!`, 'success');
    }
    
    // Animate cart button
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartToggle.style.transform = 'scale(1)';
        }, 200);
    }
}

// Remove item from cart
function removeFromCart(name) {
    cart.items = cart.items.filter(item => item.name !== name);
    updateCartTotal();
    updateCartDisplay();
    saveCartToStorage();
    
    if (window.SamsGoods && window.SamsGoods.showNotification) {
        window.SamsGoods.showNotification(`${name} removed from cart`, 'info');
    }
}

// Update item quantity
function updateQuantity(name, newQuantity) {
    const item = cart.items.find(item => item.name === name);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(name);
        } else {
            item.quantity = newQuantity;
            updateCartTotal();
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

// Calculate cart total
function updateCartTotal() {
    cart.total = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.getElementById('cart-items');
    
    // Update cart count
    if (cartCount) {
        const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Update cart total
    if (cartTotal) {
        cartTotal.textContent = cart.total.toFixed(2);
    }
    
    // Update cart items
    if (cartItems) {
        if (cart.items.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})" class="quantity-btn">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})" class="quantity-btn">+</button>
                        <button onclick="removeFromCart('${item.name}')" class="remove-btn">×</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('samsgoods_cart', JSON.stringify(cart));
    } catch (error) {
        console.warn('Could not save cart to localStorage:', error);
    }
}

// Load cart from localStorage
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('samsgoods_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartTotal();
        }
    } catch (error) {
        console.warn('Could not load cart from localStorage:', error);
        cart = { items: [], total: 0 };
    }
}

// Clear cart
function clearCart() {
    cart = { items: [], total: 0 };
    updateCartDisplay();
    saveCartToStorage();
    
    if (window.SamsGoods && window.SamsGoods.showNotification) {
        window.SamsGoods.showNotification('Cart cleared', 'info');
    }
}

// Checkout function
function checkout() {
    if (cart.items.length === 0) {
        if (window.SamsGoods && window.SamsGoods.showNotification) {
            window.SamsGoods.showNotification('Your cart is empty', 'warning');
        }
        return;
    }
    
    // Create order summary
    const orderSummary = cart.items.map(item => 
        `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const totalAmount = cart.total.toFixed(2);
    
    // In a real implementation, this would integrate with a payment processor
    const confirmMessage = `Order Summary:\n\n${orderSummary}\n\nTotal: $${totalAmount}\n\nProceed to checkout?`;
    
    if (confirm(confirmMessage)) {
        // Simulate checkout process
        if (window.SamsGoods && window.SamsGoods.showNotification) {
            window.SamsGoods.showNotification('Redirecting to checkout...', 'info');
        }
        
        // Create email body for manual processing
        const emailBody = encodeURIComponent(
            `New Order from Sam's Goods Website\n\n` +
            `Order Summary:\n${orderSummary}\n\n` +
            `Total: $${totalAmount}\n\n` +
            `Please contact me to complete this order.\n\n` +
            `Thank you!`
        );
        
        // Open email client with order details
        setTimeout(() => {
            window.location.href = `mailto:Samosupreme@samsgoods.company?subject=New Order - $${totalAmount}&body=${emailBody}`;
            
            // Clear cart after checkout initiation
            setTimeout(() => {
                if (confirm('Order email opened. Clear your cart?')) {
                    clearCart();
                    document.getElementById('cart-sidebar').classList.remove('active');
                }
            }, 2000);
        }, 1000);
    }
}

// Product filtering and search (for future enhancement)
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Search products
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Add CSS for cart functionality
const cartStyles = `
    .cart-sidebar {
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100vh;
        background: var(--secondary-color);
        border-left: 1px solid var(--border-color);
        z-index: 1001;
        transition: right 0.3s ease;
        display: flex;
        flex-direction: column;
    }
    
    .cart-sidebar.active {
        right: 0;
    }
    
    .cart-header {
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .cart-header h3 {
        margin: 0;
        color: var(--text-primary);
    }
    
    .close-cart {
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: var(--transition);
    }
    
    .close-cart:hover {
        background: var(--primary-color);
    }
    
    .cart-items {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
    }
    
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .cart-item-info h4 {
        margin: 0 0 0.5rem 0;
        color: var(--text-primary);
        font-size: 1rem;
    }
    
    .cart-item-price {
        margin: 0;
        color: var(--accent-color);
        font-weight: 600;
    }
    
    .cart-item-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quantity-btn, .remove-btn {
        background: var(--primary-color);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        width: 30px;
        height: 30px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
    }
    
    .quantity-btn:hover, .remove-btn:hover {
        background: var(--accent-color);
        color: var(--primary-color);
    }
    
    .quantity {
        color: var(--text-primary);
        font-weight: 600;
        min-width: 20px;
        text-align: center;
    }
    
    .cart-footer {
        padding: 1rem;
        border-top: 1px solid var(--border-color);
    }
    
    .cart-total {
        margin-bottom: 1rem;
        text-align: center;
        color: var(--text-primary);
        font-size: 1.25rem;
    }
    
    .cart-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent-color);
        color: var(--primary-color);
        border: none;
        padding: 1rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: var(--shadow-medium);
        transition: var(--transition);
        z-index: 1000;
    }
    
    .cart-toggle:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-heavy);
    }
    
    .empty-cart {
        text-align: center;
        color: var(--text-muted);
        font-style: italic;
        padding: 2rem 0;
    }
    
    @media (max-width: 768px) {
        .cart-sidebar {
            width: 100vw;
            right: -100vw;
        }
        
        .cart-toggle {
            bottom: 10px;
            right: 10px;
            padding: 0.75rem;
            font-size: 0.9rem;
        }
    }
`;

// Inject cart styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet);

// Export functions for global use
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.checkout = checkout;
window.filterProducts = filterProducts;
window.searchProducts = searchProducts;

const stripe = Stripe('pk_live_51ReFNsGxcJlKkC4eiOlRSwjUcPvxo5mc25bfb84zRnTjz0H1TkziCjhuqtSjqcLwV9o1dbuvg1RNhPiD6EuKXDaG00WtSQ61Y7'); // replace with your publishable key

document.getElementById('buy-button').addEventListener('click', async () => {
  const size = document.getElementById('size-select').value;

  const response = await fetch('http://localhost:4242/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ size }),
  });

  const session = await response.json();

  if (session.id) {
    stripe.redirectToCheckout({ sessionId: session.id });
  } else {
    alert('Failed to create checkout session.');
  }
});


