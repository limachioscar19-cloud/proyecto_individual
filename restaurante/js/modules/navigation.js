import { bind, hydrate } from "../utils/dom.js";

const $ = window.jQuery;

function closeMenu() {
    $("#navLinks").removeClass("open");
    $("#menuToggle").attr("aria-expanded", "false");
}

export function initNavigation(onViewChange) {
    function changeView(view) {
        if (!$("#" + view).hasClass("page-section")) {
            return;
        }

        $(".page-section").removeClass("active");
        $("#" + view).addClass("active");

        $("[data-view]").each(function () {
            $(this).toggleClass("active", $(this).attr("data-view") === view);
        });

        closeMenu();

        if (onViewChange) {
            onViewChange(view);
        }

        $("html, body").animate({ scrollTop: 0 }, 250);
    }

    bind("click", "[data-view]", function (event) {
        event.preventDefault();
        changeView($(this).attr("data-view"));
    });

    bind("click", "#menuToggle", function () {
        const isOpen = $("#navLinks").toggleClass("open").hasClass("open");
        $(this).attr("aria-expanded", String(isOpen));
    });

    $(window).off("resize.navegacion").on("resize.navegacion", function () {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });

    hydrate("[data-view], #menuToggle");
}
