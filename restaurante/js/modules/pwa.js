const $ = window.jQuery;

export function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    function register() {
        navigator.serviceWorker.register("./sw.js").catch(function (error) {
            console.error("No se pudo registrar el Service Worker:", error);
        });
    }

    if (document.readyState === "complete") {
        register();
    } else {
        window.addEventListener("load", register);
    }
}

export function initNetStatus() {
    function update() {
        const online = navigator.onLine;

        $("#netStatus").text(online ? "En línea" : "Sin conexión").toggleClass("offline", !online);
    }

    $(window).off("online.red offline.red").on("online.red offline.red", update);
    update();
}

export function initInstallButton() {
    let deferredPrompt = null;

    window.addEventListener("beforeinstallprompt", function (event) {
        event.preventDefault();
        deferredPrompt = event;
        $("#installBtn").prop("hidden", false);
    });

    $("#installBtn").off("click.instalar").on("click.instalar", async function () {
        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        $(this).prop("hidden", true);
    });
}
