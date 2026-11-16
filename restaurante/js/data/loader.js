export async function loadMenu() {
    const response = await fetch("data/menu.json");

    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }

    return response.json();
}
