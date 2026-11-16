import { bind, hydrate } from "../utils/dom.js";
import { formatPrice } from "../utils/format.js";

const $ = window.jQuery;

function createImage(src, alt) {
    return $("<img>")
        .attr("loading", "lazy")
        .attr("decoding", "async")
        .attr("alt", alt)
        .attr("src", src);
}

function createFoodOption(label, dish, price) {
    const $info = $("<div>")
        .append($("<small>").text(label))
        .append($("<strong>").text(dish.nombre))
        .append($("<b>").text(formatPrice(price)));

    return $("<article>", { "class": "food-option" })
        .append(createImage(dish.imagen, dish.nombre))
        .append($info);
}

function closeCard($card) {
    $card.removeClass("open");
    $card.find(".day-header").attr("aria-expanded", "false");
    $card.find(".day-arrow").text("+");
}

export function renderPricing(precios) {
    const rows = [
        ["Almuerzo completo", "Una sopa y un segundo", precios.almuerzoCompleto],
        ["Segundo por separado", "Un plato a elección", precios.segundo],
        ["Sopa por separado", "Una sopa del día", precios.sopa]
    ];
    const $container = $("#priceInfo").empty();

    rows.forEach(function (row) {
        $("<div>")
            .append($("<strong>").text(row[0]))
            .append($("<span>").text(row[1]))
            .append($("<b>").text(formatPrice(row[2])))
            .appendTo($container);
    });
}

export function renderWeeklyMenu(semana, precios) {
    const $container = $("#weeklyMenu").empty();

    semana.forEach(function (day) {
        const $header = $("<button>", { "class": "day-header", "aria-expanded": "false", type: "button" })
            .append($("<span>", { "class": "day-icon" }).text("☀"))
            .append(
                $("<span>", { "class": "day-title" })
                    .append($("<strong>").text(day.dia))
                    .append($("<small>").text(day.segundos.length + " segundos y 1 sopa"))
            )
            .append($("<span>", { "class": "day-arrow" }).text("+"));

        const $details = $("<div>", { "class": "day-details" })
            .append(createFoodOption("SOPA", day.sopa, precios.sopa));

        day.segundos.forEach(function (segundo, index) {
            $details.append(createFoodOption("SEGUNDO " + (index + 1), segundo, precios.segundo));
        });

        $("<article>", { "class": "day-card" })
            .append($header)
            .append($details)
            .appendTo($container);
    });

    hydrate(".day-header");
}

export function renderSpecials(especiales) {
    const $container = $("#specialGrid").empty();

    especiales.forEach(function (plato) {
        $("<article>", { "class": "special-card" })
            .append(createImage(plato.imagen, plato.nombre))
            .append($("<h3>").text(plato.nombre))
            .append($("<strong>").text(formatPrice(plato.precio)))
            .appendTo($container);
    });
}

export function initMenuInteractions() {
    bind("click", ".day-header", function () {
        const $card = $(this).closest(".day-card");
        const isOpen = $card.toggleClass("open").hasClass("open");

        $(this).attr("aria-expanded", String(isOpen));
        $card.find(".day-arrow").text(isOpen ? "−" : "+");
    });

    bind("input", "#weeklySearch", function () {
        const search = $(this).val().toLowerCase().trim();

        $("#weeklyMenu .day-card").each(function () {
            const $card = $(this);
            const matches = $card.text().toLowerCase().includes(search);

            $card.toggleClass("is-hidden", !matches);

            if (!matches) {
                closeCard($card);
            }
        });
    });
}
