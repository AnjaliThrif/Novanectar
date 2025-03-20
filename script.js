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
});

document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.querySelector('.filter-btn');
    const filterPanel = document.querySelector('.filter-panel');

    filterBtn.addEventListener('click', function() {
        filterPanel.style.display = filterPanel.style.display === 'block' ? 'none' : 'block';
    });

    // Close the panel when clicking outside
    document.addEventListener('click', function(event) {
        if (!filterBtn.contains(event.target) && !filterPanel.contains(event.target)) {
            filterPanel.style.display = 'none';
        }
    });

    // Add event listeners for checkbox changes and price range inputs
    // to handle filtering logic (you'll need to implement this part)
});

document.addEventListener('DOMContentLoaded', function() {
    const viewToggles = document.querySelectorAll('.view-toggle');
    const productList = document.querySelector('.product-list');

    // Load products from JSON
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        });

    function displayProducts(products) {
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

        // Add event listeners for wishlist and bag buttons
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');

        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const productName = this.dataset.productName;
                const productPrice = this.dataset.productPrice;
                const productImage = this.dataset.productImage;

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                wishlist.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                });
                localStorage.setItem('wishlist', JSON.stringify(wishlist));

                showCustomAlert(`${productName} added to wishlist`);
                // window.location.href = 'wishlist.html';
            });
        });
    }

    // Grid/List View Toggle
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const view = this.dataset.view;

            if (view === 'grid') {
                productList.classList.remove('list-view');
                productList.classList.add('grid-view');
            } else if (view === 'list') {
                productList.classList.remove('grid-view');
                productList.classList.add('list-view');
            }
        });
    });

    // Function to show the custom alert
    function showCustomAlert(message) {
        const modal = document.getElementById("customAlert");
        const alertMessage = document.getElementById("alertMessage");
        alertMessage.innerHTML = message;
        modal.style.display = "block";
    }

    // Function to close the custom alert
    function closeCustomAlert() {
        const modal = document.getElementById("customAlert");
        modal.style.display = "none";
    }

    // Event listeners for close button and OK button
    document.querySelector(".close").addEventListener("click", closeCustomAlert);
    document.getElementById("okButton").addEventListener("click", closeCustomAlert);
});

let wishlist = [];
let shoppingBag = [];

function addToWishlist(product) {
    if (!wishlist.includes(product)) {
        wishlist.push(product);
        alert(`${product} added to wishlist`);
    } else {
        alert(`${product} is already in your wishlist`);
    }
}

function addToBag(product) {
    if (!shoppingBag.includes(product)) {
        shoppingBag.push(product);
        alert(`${product} added to shopping bag`);
    } else {
        alert(`${product} is already in your bag`);
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const viewToggles = document.querySelectorAll('.view-toggle');
    const productList = document.querySelector('.product-list');

    // Load products from JSON
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        });

    function displayProducts(products) {
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

        // Add event listeners for wishlist and bag buttons
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        const wishlistDrawer = document.querySelector('.wishlist-drawer');
        const wishlistCount = document.getElementById('wishlistCount');
        const wishlistItems = document.getElementById('wishlistItems');

        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const productName = this.dataset.productName;
                const productPrice = this.dataset.productPrice;
                const productImage = this.dataset.productImage;

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                wishlist.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                });
                localStorage.setItem('wishlist', JSON.stringify(wishlist));

                showCustomAlert(`${productName} added to wishlist`);
                updateWishlistDrawer(); // Update the wishlist drawer
                wishlistDrawer.classList.add('open'); // Open the drawer
            });
        });

        // Function to update the wishlist drawer content
        function updateWishlistDrawer() {
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlistCount.textContent = wishlist.length;
            wishlistItems.innerHTML = ''; // Clear previous content

            wishlist.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('wishlist-item');

                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <div class="price-section">
                            <strong class="current-price">$${item.price}</strong>
                            <span class="original-price">$${item.originalPrice || (parseInt(item.price) + 100)}</span>
                            <span class="discount">($${item.discount || 100} Off)</span>
                        </div>
                        <button class="move-to-bag">Move to Bag</button>
                    </div>
                    <button class="remove-item">X</button>
                `;

                wishlistItems.appendChild(itemDiv);
            });

            // Remove item functionality
            document.querySelectorAll('.remove-item').forEach((button, index) => {
                button.addEventListener('click', function() {
                    wishlist.splice(index, 1);
                    localStorage.setItem('wishlist', JSON.stringify(String(wishlist)));
                    updateWishlistDrawer(); // Update the drawer after removing an item
                });
            });

            // Move to bag functionality (you'll need to implement this)
            document.querySelectorAll('.move-to-bag').forEach(button => {
                button.addEventListener('click', function() {
                    // Implement logic to move item to bag/orders
                    // ...
                });
            });
        }
    }

    // Grid/List View Toggle
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const view = this.dataset.view;

            if (view === 'grid') {
                productList.classList.remove('list-view');
                productList.classList.add('grid-view');
            } else if (view === 'list') {
                productList.classList.remove('grid-view');
                productList.classList.add('list-view');
            }
        });
    });

    // Function to show the custom alert
    function showCustomAlert(message) {
        const modal = document.getElementById("customAlert");
        const alertMessage = document.getElementById("alertMessage");
        alertMessage.innerHTML = message;
        modal.style.display = "block";
    }

    // Function to close the custom alert
    function closeCustomAlert() {
        const modal = document.getElementById("customAlert");
        modal.style.display = "none";
    }

    // Event listeners for close button and OK button
    document.querySelector(".close").addEventListener("click", closeCustomAlert);
    document.getElementById("okButton").addEventListener("click", closeCustomAlert);

    // Close wishlist drawer when clicking outside
    document.addEventListener('click', function(event) {
        if (!document.querySelector('.wishlist-drawer').contains(event.target) && !event.target.classList.contains('wishlist-btn')) {
            document.querySelector('.wishlist-drawer').classList.remove('open');
        }
    });
});
