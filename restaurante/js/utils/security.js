const NAME_PATTERN = /^[\p{L}\p{M}' .-]{3,60}$/u;
const PHONE_PATTERN = /^[0-9]{7,8}$/;

export function sanitizeText(text, maxLength) {
    return String(text)
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLength);
}

export function isValidName(name) {
    return NAME_PATTERN.test(name);
}

export function isValidPhone(phone) {
    return PHONE_PATTERN.test(phone);
}

export function isValidQuantity(quantity) {
    return Number.isInteger(quantity) && quantity >= 1 && quantity <= 20;
}
