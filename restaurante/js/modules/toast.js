const $ = window.jQuery;
let timeoutId = null;

export function showToast(message) {
    const $toast = $("#toast");

    $toast.text(message).addClass("show");
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        $toast.removeClass("show");
    }, 2500);
}
