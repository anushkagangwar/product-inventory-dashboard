
const products = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 }
];

const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const message = document.getElementById("message");

// Assign a category using conditions and switch
function getCategory(price) {
    if (!Number.isFinite(price) || price <= 0) {
        return "Invalid";
    }

    let priceLevel;

    if (price < 50) {
        priceLevel = "budget";
    } else if (price < 200) {
        priceLevel = "standard";
    } else {
        priceLevel = "premium";
    }

    switch (priceLevel) {
        case "budget":
            return "Budget";
        case "standard":
            return "Standard";
        case "premium":
            return "Premium";
        default:
            return "Invalid";
    }
}

// Arrow function with default tax rate
const calculateTax = (amount, taxRate = 0) => {
    return amount * taxRate / 100;
};

// Regular function to calculate inventory value
function calculateTotalValue(items) {
    let total = 0;

    for (const item of items) {
        if (!Number.isFinite(item.price) || item.price <= 0) {
            continue;
        }

        total += item.price;
    }

    return total;
}

// Render the dashboard
function renderInventory() {
    const productList = document.getElementById("productList");
    const affordableProducts = document.getElementById("affordableProducts");
    const reportList = document.getElementById("reportList");

    productList.innerHTML = "";

    products.forEach(function(product) {
        const item = document.createElement("div");
        item.className = "product";

        const name = document.createElement("strong");
        name.textContent = product.name;

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = product.category;

        const price = document.createElement("p");
        price.textContent = `Price: $${product.price.toFixed(2)}`;

        item.append(name, category, price);
        productList.appendChild(item);
    });

    const affordable = products.filter(function(product) {
        return product.price < 200;
    });

    affordableProducts.textContent = affordable.length
        ? affordable.map(product => `${product.name} ($${product.price.toFixed(2)})`).join(", ")
        : "No affordable products.";

    const report = products.map(function(product) {
        return `${product.name.toUpperCase()}: $${product.price.toFixed(2)}`;
    });

    reportList.innerHTML = "";

    report.forEach(function(line) {
        const li = document.createElement("li");
        li.textContent = line;
        reportList.appendChild(li);
    });

    document.getElementById("totalProducts").textContent = products.length;

    const total = calculateTotalValue(products);
    const tax = calculateTax(total, 0);

    document.getElementById("totalValue").textContent =
        `$${(total + tax).toFixed(2)}`;
}

// Handle new product submission
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = productNameInput.value.trim();
    const price = Number(productPriceInput.value);

    if (!name || !Number.isFinite(price) || price <= 0) {
        message.textContent = "Enter a product name and a valid price greater than zero.";
        return;
    }

    if (products.some(product => product.name.toLowerCase() === name.toLowerCase())) {
        message.textContent = "This product already exists.";
        return;
    }

    products.push({
        name: name,
        price: price,
        category: getCategory(price)
    });

    message.textContent = `${name} added successfully!`;

    productForm.reset();
    renderInventory();
});

// Add categories to the initial products
products.forEach(function(product) {
    product.category = getCategory(product.price);
});

renderInventory();
