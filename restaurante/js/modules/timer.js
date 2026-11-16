import { bind, hydrate } from "../utils/dom.js";
import { showToast } from "./toast.js";

const $ = window.jQuery;
const TOTAL_SECONDS = 600;
const TEMPLATE =
    '<div class="timer-icon">⏱</div>' +
    '<div class="timer-information">' +
    "<strong>Tiempo para preparar tu pedido</strong>" +
    '<span id="timerMessage">Organiza tu pedido antes de que termine el tiempo.</span>' +
    "</div>" +
    '<div class="timer-clock" id="timerClock">10:00</div>' +
    '<button type="button" class="timer-restart" id="timerRestart">Reiniciar</button>';

let seconds = TOTAL_SECONDS;
let interval = null;
let started = false;

function updateTimer() {
    const $box = $(".order-timer");
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;

    $("#timerClock").text(String(minutes).padStart(2, "0") + ":" + String(rest).padStart(2, "0"));
    $box.removeClass("timer-warning timer-finished");

    if (seconds <= 60 && seconds > 0) {
        $box.addClass("timer-warning");
        $("#timerMessage").text("¡Queda poco tiempo para organizar tu pedido!");
    } else if (seconds > 60) {
        $("#timerMessage").text("Organiza tu pedido antes de que termine el tiempo.");
    }

    if (seconds <= 0) {
        clearInterval(interval);
        interval = null;
        $box.addClass("timer-finished");
        $("#timerClock").text("00:00");
        $("#timerMessage").text("El tiempo terminó. Puedes reiniciar el temporizador.");
        showToast("El tiempo para preparar tu pedido terminó");
    }
}

function tick() {
    if (seconds > 0) {
        seconds -= 1;
        updateTimer();
    }
}

export function startOrderTimer() {
    if (started) {
        return;
    }

    started = true;
    interval = setInterval(tick, 1000);
    updateTimer();
}

function resetOrderTimer() {
    clearInterval(interval);
    seconds = TOTAL_SECONDS;
    started = true;
    interval = setInterval(tick, 1000);
    updateTimer();
}

export function initOrderTimer() {
    if ($(".order-timer").length === 0) {
        $("<div>", { "class": "order-timer" })
            .html(TEMPLATE)
            .insertBefore("#pedidos .order-layout");
    }

    bind("click", "#timerRestart", function () {
        resetOrderTimer();
        showToast("Temporizador reiniciado");
    });

    hydrate("#timerRestart");
}
