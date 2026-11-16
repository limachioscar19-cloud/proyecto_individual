import { bind, hydrate } from "../utils/dom.js";
import { formatPrice } from "../utils/format.js";
import { getItems, getTotal, getCount, removeItem } from "./cart.js";

const $ = window.jQuery;

export function renderCart() {
    const $list = $("#cartItems").empty();
    const items = getItems();

    if (items.length === 0) {
        $list.append($("<p>", { "class": "empty-cart" }).text("Todavía no agregaste platos."));
    }

    items.forEach(function (item, index) {
        const $info = $("<div>", { "class": "cart-item-info" })
            .append($("<strong>").text(item.name))
            .append($("<span>").text(item.quantity + " x " + formatPrice(item.price)));

        const $remove = $("<button>", { type: "button", "class": "remove-item" })
            .text("Eliminar")
            .attr("data-index", index);

        $("<div>", { "class": "cart-item" })
            .append($info)
            .append($("<strong>").text(formatPrice(item.price * item.quantity)))
            .append($remove)
            .appendTo($list);
    });

    $("#cartCount").text(getCount());
    $("#cartTotal").text(formatPrice(getTotal()));
    hydrate(".remove-item");
}

export function openCart() {
    $("#cartPanel").addClass("open");
    $("#cartOverlay").addClass("show");
}

export function closeCart() {
    $("#cartPanel").removeClass("open");
    $("#cartOverlay").removeClass("show");
}

export function initCartUI() {
    bind("click", "#cartOpen, #openCartFromOrders", openCart);
    bind("click", "#cartClose, #cartOverlay", closeCart);
    bind("click", ".remove-item", function () {
        removeItem(Number($(this).attr("data-index")));
        renderCart();
    });

    hydrate("#cartOpen, #openCartFromOrders, #cartClose, #cartOverlay");
    renderCart();
}
