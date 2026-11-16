import { bind, hydrate } from "../utils/dom.js";

const $ = window.jQuery;

export function initTheme() {
    bind("click", "#themeToggle", function () {
        const isDark = $("body").toggleClass("dark-mode").hasClass("dark-mode");
        $(this).text(isDark ? "☀" : "☾");
    });

    hydrate("#themeToggle");
}
