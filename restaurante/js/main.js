import { loadMenu } from "./data/loader.js";
import { initNavigation } from "./modules/navigation.js";
import { initTheme } from "./modules/theme.js";
import { renderPricing, renderWeeklyMenu, renderSpecials, initMenuInteractions } from "./modules/menu.js";
import { initOrders } from "./modules/orders.js";
import { initOrderTimer, startOrderTimer } from "./modules/timer.js";
import { initCartUI } from "./modules/cart-ui.js";
import { initCheckout } from "./modules/checkout.js";
import { registerServiceWorker, initNetStatus, initInstallButton } from "./modules/pwa.js";

const $ = window.jQuery;

async function start() {
    registerServiceWorker();
    initNetStatus();
    initInstallButton();

    $("#year").text(new Date().getFullYear());

    initNavigation(function (view) {
        if (view === "pedidos") {
            startOrderTimer();
        }
    });
    initTheme();
    initCartUI();
    initOrderTimer();
    initMenuInteractions();

    try {
        const data = await loadMenu();

        renderPricing(data.precios);
        renderWeeklyMenu(data.semana, data.precios);
        renderSpecials(data.especiales);
        initOrders(data);
        initCheckout(data.negocio.whatsapp);
    } catch (error) {
        console.error("No se pudo cargar el menú:", error);
        $("#weeklyMenu").empty().append(
            $("<p>", { "class": "info-note" }).text("No se pudo cargar el menú. Revisa tu conexión e inténtalo de nuevo.")
        );
    }
}

$(start);
