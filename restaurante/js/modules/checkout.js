import { bind, hydrate } from "../utils/dom.js";
import { formatPrice } from "../utils/format.js";
import { sanitizeText, isValidName, isValidPhone } from "../utils/security.js";
import { getItems, getTotal, clearCart } from "./cart.js";
import { renderCart, closeCart } from "./cart-ui.js";
import { showToast } from "./toast.js";

const $ = window.jQuery;

function closeOrderModal() {
    $("#orderModal").removeClass("show");
}

function buildMessage(name, phone, note) {
    let message = "Hola, quiero realizar el siguiente pedido:\n\n";

    message += "Nombre: " + name + "\n";
    message += "Celular: " + phone + "\n\n";
    message += "MI PEDIDO:\n";

    getItems().forEach(function (item) {
        message += "- " + item.name + " x " + item.quantity + " = " + formatPrice(item.price * item.quantity) + "\n";
    });

    message += "\nTOTAL: " + formatPrice(getTotal());

    if (note) {
        message += "\n\nDetalle adicional: " + note;
    }

    return message;
}

export function initCheckout(whatsappNumber) {
    bind("click", "#checkoutButton", function () {
        if (getItems().length === 0) {
            showToast("Primero agrega algún producto");
            return;
        }

        closeCart();
        $("#orderModal").addClass("show");
    });

    bind("click", "#modalClose", closeOrderModal);

    bind("click", "#orderModal", function (event) {
        if (event.target === this) {
            closeOrderModal();
        }
    });

    bind("submit", "#orderForm", function (event) {
        event.preventDefault();

        const name = sanitizeText($("#customerName").val(), 60);
        const phone = sanitizeText($("#customerPhone").val(), 8);
        const note = sanitizeText($("#customerNote").val(), 200);
        let valid = true;

        $("#nameError, #phoneError, #formMessage").text("");

        if (!isValidName(name)) {
            $("#nameError").text("Usa solo letras, espacios, punto o guion (3 a 60 caracteres).");
            valid = false;
        }

        if (!isValidPhone(phone)) {
            $("#phoneError").text("Escribe un celular válido de 7 u 8 dígitos.");
            valid = false;
        }

        if (!valid) {
            return;
        }

        const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(buildMessage(name, phone, note));

        window.open(url, "_blank", "noopener,noreferrer");

        closeOrderModal();
        $("#orderForm")[0].reset();
        clearCart();
        renderCart();
        showToast("Pedido preparado correctamente");
    });

    hydrate("#checkoutButton, #modalClose, #orderModal, #orderForm");
}
