// ==========================================
// 1. OBSŁUGA URZĄDZEŃ ESP32
// ==========================================

// Tablica z urządzeniami
const devicesList = [
    { ip: "http://192.168.1.150", switchId: "przekaznik_1", statusElId: "status-dev1" },
    { ip: "http://192.168.1.151", switchId: "przekaznik_garaz", statusElId: "status-dev2" },
    { ip: "http://192.168.1.152", switchId: "przekaznik_3", statusElId: "status-dev3" }
];

// Wysyłanie polecenia do konkretnego urządzenia ESP32
async function controlDevice(ip, switchId, action, statusElId) {
    try {
        await fetch(`${ip}/switch/${switchId}/${action}`, {
            method: 'POST'
        });
        checkSingleDevice(ip, switchId, statusElId);
    } catch (error) {
        console.error(`Błąd połączenia z urządzeniem (${ip}):`, error);
        const statusEl = document.getElementById(statusElId);
        if (statusEl) {
            statusEl.innerText = "Błąd połączenia";
            statusEl.className = "status-badge status-error";
        }
    }
}

// Pobieranie stanu urządzenia ESP32
async function checkSingleDevice(ip, switchId, statusElId) {
    try {
        const res = await fetch(`${ip}/switch/${switchId}`);
        const data = await res.json();
        const statusEl = document.getElementById(statusElId);

        if (statusEl) {
            if (data.value) {
                statusEl.innerText = "WŁĄCZONY";
                statusEl.className = "status-badge status-on";
            } else {
                statusEl.innerText = "WYŁĄCZONY";
                statusEl.className = "status-badge status-off";
            }
        }
    } catch (error) {
        const statusEl = document.getElementById(statusElId);
        if (statusEl) {
            statusEl.innerText = "Brak połączenia";
            statusEl.className = "status-badge status-error";
        }
    }
}

// Automatyczne sprawdzanie wszystkich urządzeń
function checkAllDevices() {
    devicesList.forEach(dev => {
        checkSingleDevice(dev.ip, dev.switchId, dev.statusElId);
    });
}

// Sprawdzaj stany urządzeń co 3 sekundy
setInterval(checkAllDevices, 3000);

// Pierwsze sprawdzenie od razu po wczytaniu skryptu
checkAllDevices();


// ==========================================
// 2. DYNAMICZNE DODAWANIE LINKÓW (YOUTUBE)
// ==========================================

// Funkcja tworząca element <a> i wstawiająca go do kontenera
function addCustomLink(url, labelText) {
    const container = document.getElementById('dynamic-links-container');

    if (!container) {
        console.error("Nie znaleziono kontenera #dynamic-links-container na stronie!");
        return;
    }

    const link = document.createElement('a');
    link.href = url;
    link.textContent = labelText;
    link.target = '_blank';
    link.className = 'btn';
    link.style.display = 'inline-block';
    link.style.marginTop = '10px';

    container.appendChild(link);
}

// Wywołanie dodania linku automatycznie po załadowaniu drzewa DOM
document.addEventListener('DOMContentLoaded', () => {
    // Podmień adres URL na swój konkretny link do filmu na YouTube:
    addCustomLink('https://www.youtube.com/watch?v=https://youtu.be/vE_H3FgikkA', 'Obejrzyj film na YouTube');
});