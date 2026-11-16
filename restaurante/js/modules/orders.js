import { bind, hydrate } from "../utils/dom.js";
import { formatPrice } from "../utils/format.js";
import { isValidQuantity } from "../utils/security.js";
import { addItem } from "./cart.js";
import { renderCart } from "./cart-ui.js";
import { showToast } from "./toast.js";

const $ = window.jQuery;

let weekly = {};
let prices = {};

function fillSelect($select, values) {
    $select.empty();
    values.forEach(function (name) {
        $("<option>").val(name).text(name).appendTo($select);
    });
}

function updateLunchOptions() {
    const menu = weekly[$("#lunchDay").val()];
    fillSelect($("#lunchSecond"), menu.seconds);
}

function updateSeparateOptions() {
    const menu = weekly[$("#separateDay").val()];
    const values = $("#separateType").val() === "sopa" ? [menu.soup] : menu.seconds;
    fillSelect($("#separateDish"), values);
}

function readQuantity(selector) {
    const quantity = Number($(selector).val());

    if (!isValidQuantity(quantity)) {
        showToast("Selecciona una cantidad entre 1 y 20");
        return null;
    }

    return quantity;
}

function addAndRefresh(name, price, quantity) {
    addItem(name, price, quantity);
    renderCart();
    showToast("Producto agregado al pedido");
}

export function initOrders(data) {
    weekly = {};
    data.semana.forEach(function (day) {
        weekly[day.dia] = {
            soup: day.sopa.nombre,
            seconds: day.segundos.map(function (segundo) {
                return segundo.nombre;
            })
        };
    });
    prices = data.precios;

    const days = data.semana.map(function (day) {
        return day.dia;
    });

    fillSelect($("#lunchDay"), days);
    fillSelect($("#separateDay"), days);

    $("#separateType").empty()
        .append($("<option>").val("segundo").text("Segundo - " + formatPrice(prices.segundo)))
        .append($("<option>").val("sopa").text("Sopa - " + formatPrice(prices.sopa)));

    const $special = $("#specialDish").empty();
    data.especiales.forEach(function (plato) {
        $("<option>")
            .val(plato.nombre)
            .attr("data-price", plato.precio)
            .text(plato.nombre + " - " + formatPrice(plato.precio))
            .appendTo($special);
    });

    $("#lunchPrice").text(formatPrice(prices.almuerzoCompleto));
    updateLunchOptions();
    updateSeparateOptions();

    bind("change", "#lunchDay", updateLunchOptions);
    bind("change", "#separateDay, #separateType", updateSeparateOptions);

    bind("click", "#addLunch", function () {
        const quantity = readQuantity("#lunchQuantity");

        if (quantity === null) {
            return;
        }

        const day = $("#lunchDay").val();
        const second = $("#lunchSecond").val();
        const name = day + " - Almuerzo completo (" + weekly[day].soup + " y " + second + ")";

        addAndRefresh(name, prices.almuerzoCompleto, quantity);
    });

    bind("click", "#addSeparate", function () {
        const quantity = readQuantity("#separateQuantity");

        if (quantity === null) {
            return;
        }

        const price = $("#separateType").val() === "sopa" ? prices.sopa : prices.segundo;

        addAndRefresh($("#separateDay").val() + " - " + $("#separateDish").val(), price, quantity);
    });

    bind("click", "#addSpecial", function () {
        const quantity = readQuantity("#specialQuantity");

        if (quantity === null) {
            return;
        }

        const $option = $("#specialDish option:selected");

        addAndRefresh($option.val(), Number($option.attr("data-price")), quantity);
    });

    hydrate("#addLunch, #addSeparate, #addSpecial, #lunchDay, #separateDay, #separateType");
}
