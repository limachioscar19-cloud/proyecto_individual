const WHATSAPP_NUMBER = "59178826105";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const orderModal = document.getElementById("orderModal");
const orderForm = document.getElementById("orderForm");

let cart = [];
let timerInterval = null;
let timerSeconds = 600;
let timerStarted = false;

document.getElementById("year").textContent = new Date().getFullYear();

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function changeView(view) {
    document.querySelectorAll(".page-section").forEach(section => {
        section.classList.remove("active");
    });

    const selected = document.getElementById(view);

    if (selected) {
        selected.classList.add("active");
    }

    document.querySelectorAll("[data-view]").forEach(button => {
        button.classList.toggle("active", button.dataset.view === view);
    });

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");

    if (view === "pedidos") {
        startOrderTimer();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        changeView(button.dataset.view);
    });
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open")
    );
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    themeToggle.textContent =
        document.body.classList.contains("dark-mode") ? "☀" : "☾";
});

document.querySelectorAll(".day-header").forEach(header => {
    header.addEventListener("click", () => {
        const card = header.closest(".day-card");
        const arrow = card.querySelector(".day-arrow");
        const isOpen = card.classList.contains("open");


        if (isOpen) {
            card.classList.remove("open");
            header.setAttribute("aria-expanded", "false");
            arrow.textContent = "+";
        } else {
            card.classList.add("open");
            header.setAttribute("aria-expanded", "true");
            arrow.textContent = "−";
        }
    });
});

document.getElementById("weeklySearch").addEventListener("input", function() {
    const search = this.value.toLowerCase().trim();

    document.querySelectorAll(".day-card").forEach(card => {
        const matches = card.textContent.toLowerCase().includes(search);

        card.style.display = matches ? "" : "none";

        if (!matches) {
            card.classList.remove("open");
            card.querySelector(".day-header").setAttribute(
                "aria-expanded",
                "false"
            );
            card.querySelector(".day-arrow").textContent = "+";
        }
    });
});

function createOrderTimer() {
    const ordersSection = document.getElementById("pedidos");
    const orderLayout = ordersSection.querySelector(".order-layout");

    if (!ordersSection || !orderLayout) {
        return;
    }

    const timerBox = document.createElement("div");
    timerBox.className = "order-timer";

    timerBox.innerHTML = `
        <div class="timer-icon">⏱</div>
        <div class="timer-information">
            <strong>Tiempo para preparar tu pedido</strong>
            <span id="timerMessage">Organiza tu pedido antes de que termine el tiempo.</span>
        </div>
        <div class="timer-clock" id="timerClock">10:00</div>
        <button type="button" class="timer-restart" id="timerRestart">Reiniciar</button>
    `;

    orderLayout.parentNode.insertBefore(timerBox, orderLayout);

    document.getElementById("timerRestart").addEventListener("click", () => {
        resetOrderTimer();
        showToast("Temporizador reiniciado");
    });
}

function updateOrderTimer() {
    const clock = document.getElementById("timerClock");
    const message = document.getElementById("timerMessage");
    const timerBox = document.querySelector(".order-timer");

    if (!clock || !message || !timerBox) {
        return;
    }

    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;

    clock.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

    timerBox.classList.remove("timer-warning", "timer-finished");

    if (timerSeconds <= 60 && timerSeconds > 0) {
        timerBox.classList.add("timer-warning");
        message.textContent = "¡Queda poco tiempo para organizar tu pedido!";
    } else if (timerSeconds > 60) {
        message.textContent = "Organiza tu pedido antes de que termine el tiempo.";
    }

    if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;

        timerBox.classList.add("timer-finished");
        clock.textContent = "00:00";
        message.textContent = "El tiempo terminó. Puedes reiniciar el temporizador.";

        showToast("El tiempo para preparar tu pedido terminó");
    }
}

function startOrderTimer() {
    if (timerStarted) {
        return;
    }

    timerStarted = true;
    timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateOrderTimer();
        }
    }, 1000);

    updateOrderTimer();
}

function resetOrderTimer() {
    clearInterval(timerInterval);

    timerSeconds = 600;
    timerStarted = true;

    updateOrderTimer();

    timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateOrderTimer();
        }
    }, 1000);
}

createOrderTimer();

function addToCart(name, price, quantity) {
    const existing = cart.find(item => {
        return item.name === name && item.price === price;
    });

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    updateCart();
    showToast("Producto agregado al pedido");
}

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Todavía no agregaste platos.</p>';
    }

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;

        total += subtotal;
        count += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const detail = document.createElement("span");
        detail.textContent =
            item.quantity + " x " + item.price + " Bs";

        const price = document.createElement("strong");
        price.textContent = subtotal + " Bs";

        const remove = document.createElement("button");
        remove.className = "remove-item";
        remove.type = "button";
        remove.textContent = "Eliminar";

        remove.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });

        info.append(name, detail);
        row.append(info, price, remove);

        cartItems.appendChild(row);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total + " Bs";
}

function openCart() {
    cartPanel.classList.add("open");
    cartOverlay.classList.add("show");
}

function closeCart() {
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("show");
}

document.getElementById("cartOpen").addEventListener("click", openCart);

document.getElementById("cartClose").addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);

document.getElementById("openCartFromOrders").addEventListener("click", openCart);

document.getElementById("addLunch").addEventListener("click", () => {
    const day = document.getElementById("lunchDay").value;
    const second = document.getElementById("lunchSecond").value;
    const quantity = Number(document.getElementById("lunchQuantity").value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        showToast("Selecciona una cantidad entre 1 y 20");
        return;
    }

    addToCart(
        day + " - Almuerzo completo (" + second + " y sopa)",
        20,
        quantity
    );
});

const separateType = document.getElementById("separateType");
const separateDish = document.getElementById("separateDish");

function updateSeparateOptions() {
    separateDish.innerHTML = "";

    if (separateType.value === "sopa") {
        const option = document.createElement("option");

        option.value = "Sopa del día";
        option.textContent = "Sopa del día";

        separateDish.appendChild(option);
    } else {
        [
            "Plato del día 1",
            "Plato del día 2",
            "Plato del día 3"
        ].forEach(name => {
            const option = document.createElement("option");

            option.value = name;
            option.textContent = name;

            separateDish.appendChild(option);
        });
    }
}

separateType.addEventListener("change", updateSeparateOptions);

updateSeparateOptions();

document.getElementById("addSeparate").addEventListener("click", () => {
    const day = document.getElementById("separateDay").value;
    const type = separateType.value;
    const dish = separateDish.value;
    const quantity = Number(
        document.getElementById("separateQuantity").value
    );

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        showToast("Selecciona una cantidad entre 1 y 20");
        return;
    }

    const price = type === "sopa" ? 7 : 15;

    addToCart(
        day + " - " + dish,
        price,
        quantity
    );
});

document.getElementById("addSpecial").addEventListener("click", () => {
    const select = document.getElementById("specialDish");
    const option = select.options[select.selectedIndex];
    const quantity = Number(
        document.getElementById("specialQuantity").value
    );

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        showToast("Selecciona una cantidad entre 1 y 20");
        return;
    }

    addToCart(
        option.value,
        Number(option.dataset.price),
        quantity
    );
});

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Primero agrega algún producto");
        return;
    }

    closeCart();
    orderModal.classList.add("show");
});

function closeOrderModal() {
    orderModal.classList.remove("show");
}

document.getElementById("modalClose").addEventListener("click", closeOrderModal);

orderModal.addEventListener("click", event => {
    if (event.target === orderModal) {
        closeOrderModal();
    }
});

orderForm.addEventListener("submit", event => {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const customerNote = document.getElementById("customerNote").value.trim();

    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const formMessage = document.getElementById("formMessage");

    nameError.textContent = "";
    phoneError.textContent = "";
    formMessage.textContent = "";

    let valid = true;

    if (customerName.length < 3) {
        nameError.textContent =
            "Escribe un nombre de al menos 3 caracteres.";

        valid = false;
    }

    if (!/^[0-9]{7,8}$/.test(customerPhone)) {
        phoneError.textContent =
            "Escribe un celular válido de 7 u 8 dígitos.";

        valid = false;
    }

    if (!valid) {
        return;
    }

    let message = "Hola, quiero realizar el siguiente pedido:\n\n";

    message += "Nombre: " + customerName + "\n";
    message += "Celular: " + customerPhone + "\n\n";
    message += "MI PEDIDO:\n";

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;

        message +=
            "- " + item.name +
            " x " + item.quantity +
            " = " + subtotal + " Bs\n";

        total += subtotal;
    });

    message += "\nTOTAL: " + total + " Bs";

    if (customerNote) {
        message += "\n\nDetalle adicional: " + customerNote;
    }

    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");

    closeOrderModal();
    orderForm.reset();

    cart = [];
    updateCart();

    showToast("Pedido preparado correctamente");
});

updateCart();