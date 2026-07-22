// --- 1. Cart & LocalStorage ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- 2. Add to Cart Function ---
function addToCart(name, price) {
    cart.push({ name: name, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " has been added to your cart! 🛒");
}

// --- 3. WhatsApp Checkout Function ---
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some beautiful bags first.");
        return;
    }

    let msg = "Hello Perfectly Hooked, I want to order:\n\n";
    let total = 0;
    
    cart.forEach((item, index) => {
        msg += `${index + 1}. ${item.name} - ₦${item.price.toLocaleString()}\n`;
        total += item.price;
    });
    
    msg += `\nTotal: ₦${total.toLocaleString()}\n\nPlease let me know how to proceed with payment!`;

    let url = "https://wa.me/2347015089219?text=" + encodeURIComponent(msg);
    window.open(url, '_blank');
}

// --- 4. Product Filters ---
function filterItems(category, btnElement) {
    let items = document.querySelectorAll(".product-card");
    
    // Update active button colors
    let buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    // Show/Hide products
    items.forEach(item => {
        if (category === "all") {
            item.style.display = "block";
        } else {
            if (item.getAttribute('data-category') === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    });
}

// --- 5. Image Modal (Zoom) ---
function openModal(src) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalImg").src = src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// --- 6. Contact Form WhatsApp Function ---
function sendToWhatsApp() {
    // Gather values from input boxes and dropdown selection
    let name = document.getElementById("name")?.value || "Customer";
    let email = document.getElementById("email")?.value || "Not provided";
    let subject = document.getElementById("subject")?.value || "General Inquiry";
    let message = document.getElementById("message")?.value || "";

    // Validation check to stop empty elements
    if (!subject) {
        alert("Please select what you'd like to help you with! ✨");
        return;
    }
    if (!message.trim()) {
        alert("Please write a message before sending! ✨");
        return;
    }

    // Format the text message clearly for your business chat
    let whatsappMessage = `📬 *New Website Inquiry*\n\n` +
                          `👤 *Name:* ${name}\n` +
                          `✉️ *Email:* ${email}\n` +
                          `📌 *Purpose:* ${subject}\n\n` +
                          `💬 *Message:* \n${message}`;

    // Your live WhatsApp link business destination phone number
    let phoneNumber = "2347015089219"; 
    
    // Construct and open the live WhatsApp API window endpoint
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
}