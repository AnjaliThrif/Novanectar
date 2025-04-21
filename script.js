document.addEventListener("DOMContentLoaded", () => {
    // Load Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // === FILTER PANEL TOGGLE ===
    const filterBtn = document.querySelector('.filter-btn');
    const filterPanel = document.querySelector('.filter-panel');
    if (filterBtn && filterPanel) {
        filterBtn.addEventListener('click', function () {
            filterPanel.style.display = filterPanel.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function (event) {
            if (!filterBtn.contains(event.target) && !filterPanel.contains(event.target)) {
                filterPanel.style.display = 'none';
            }
        });
    }

    // === VIEW TOGGLE ===
    const viewToggles = document.querySelectorAll('.view-toggle');
    const productList = document.querySelector('.product-list');
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const view = this.dataset.view;
            productList.classList.toggle('list-view', view === 'list');
            productList.classList.toggle('grid-view', view === 'grid');
        });
    });

    // === LOAD PRODUCTS ===
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        });

        function displayProducts(products) {
            const productList = document.querySelector('.product-list');
            
            if (!productList) {
                console.warn('⚠️ .product-list not found in the DOM');
                return;
            }
        
            productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="product-bottom">
                    <div class="price-section">
                        <strong class="current-price">$${product.price}</strong>
                    </div>
                    <div class="product-actions">
                        <button class="wishlist-btn" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">
                            <img src="heart-icon.png" alt="Add to Wishlist">
                        </button>
                        <button class="bag-btn" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">
                            <img src="bag-icon.png" alt="Add to Bag">
                        </button>
                    </div>
                </div>
            `;
            productList.appendChild(productDiv);
        });

        setupWishlistButtons();
    }

    function setupWishlistButtons() {
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        const wishlistDrawer = document.querySelector('.wishlist-drawer');
        const wishlistCount = document.getElementById('wishlistCount');
        const wishlistItems = document.getElementById('wishlistItems');

        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const product = {
                    id: this.dataset.productId,
                    name: this.dataset.productName,
                    price: this.dataset.productPrice,
                    image: this.dataset.productImage
                };

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                wishlist.push(product);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));

                showCustomAlert(`${product.name} added to wishlist`);
                updateWishlistDrawer();
                wishlistDrawer.classList.add('open');
            });
        });

        function updateWishlistDrawer() {
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlistCount.textContent = wishlist.length;
            wishlistItems.innerHTML = '';

            wishlist.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('wishlist-item');
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <div class="price-section">
                            <strong class="current-price">$${item.price}</strong>
                            <span class="original-price">$${parseInt(item.price) + 100}</span>
                            <span class="discount">($100 Off)</span>
                        </div>
                        <button class="move-to-bag">Move to Bag</button>
                    </div>
                    <button class="remove-item">X</button>
                `;
                wishlistItems.appendChild(itemDiv);

                itemDiv.querySelector('.remove-item').addEventListener('click', () => {
                    wishlist.splice(index, 1);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    updateWishlistDrawer();
                });

                itemDiv.querySelector('.move-to-bag').addEventListener('click', () => {
                    moveToBag(item);
                });
            });
        }
    }

    // === CLOSE WISHLIST DRAWER WHEN CLICKING OUTSIDE ===
    document.addEventListener('click', function (event) {
        const wishlistDrawer = document.querySelector('.wishlist-drawer');
        if (wishlistDrawer && !wishlistDrawer.contains(event.target) && !event.target.classList.contains('wishlist-btn')) {
            wishlistDrawer.classList.remove('open');
        }
    });

    // === CART/SHOPPING BAG PAGE ITEM REMOVAL ===
    const removeButtons = document.querySelectorAll('.remove-item');
    const shoppingBagContainer = document.querySelector('.shopping-bag-container');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    removeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const productCard = event.currentTarget.closest('.item');
            if (productCard) {
                productCard.remove();
                updateEmptyCartVisibility();
            }
        });
    });

    function updateEmptyCartVisibility() {
        const remainingCards = document.querySelectorAll('.item');
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        
        if (emptyCartMessage) {
            emptyCartMessage.style.display = remainingCards.length === 0 ? 'block' : 'none';
        }
    }
    

    // === CUSTOM ALERT EVENT HANDLERS ===
    document.querySelector(".close")?.addEventListener("click", closeCustomAlert);
    document.getElementById("okButton")?.addEventListener("click", closeCustomAlert);
});

// Show Popup on Page Load
window.onload = function () {
    document.getElementById("popup")?.classList.remove("hidden");
};

// Login, Signup, Continue as Guest
function login() {
    window.location.href = "login.html";
}
function signup() {
    window.location.href = "sign_up.html";
}
function continueAsGuest() {
    document.getElementById("popup")?.classList.add("hidden");
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Move to Bag Logic
function moveToBag(item) {
    let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
    bagItems.push(item);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    alert(`${item.name} Moved to bag!`);
}

// Custom Alert
function showCustomAlert(message) {
    const modal = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    if (modal && alertMessage) {
        alertMessage.innerHTML = message;
        modal.style.display = "block";
    }
}

function closeCustomAlert() {
    const modal = document.getElementById("customAlert");
    if (modal) modal.style.display = "none";
}

