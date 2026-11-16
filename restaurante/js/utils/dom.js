const $ = window.jQuery;

export function bind(eventName, selector, handler) {
    $(document).off(eventName, selector).on(eventName, selector, handler);
}

export function hydrate(selector) {
    $(selector).not("[data-hidratado]").attr("data-hidratado", "true");
}
