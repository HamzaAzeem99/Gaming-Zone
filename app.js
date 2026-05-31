// 1. Real-time Search Filter System
function filterGames() {
    const input = document.getElementById('gameSearch').value.toLowerCase().trim();

    // Filter Popular Cards
    document.querySelectorAll('.pop-card').forEach(card => {
        const title = card.querySelector('h3') ? card.querySelector('h3').innerText.toLowerCase() : '';
        card.style.display = title.includes(input) ? '' : 'none';
    });

    // Filter Category Cards (Checks both H2 title and P description text)
    document.querySelectorAll('.category-card').forEach(card => {
        const title = card.querySelector('h2') ? card.querySelector('h2').innerText.toLowerCase() : '';
        const desc = card.querySelector('p') ? card.querySelector('p').innerText.toLowerCase() : '';
        
        if (title.includes(input) || desc.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// 2. Function to Start/Play Game via EmulatorJS
function playGame(core, gameUrl) {
    const popup = document.getElementById('emulator-popup');
    const playerContainer = document.getElementById('game-player');

    if (!popup || !playerContainer) {
        console.error("Emulator UI elements missing in DOM!");
        return;
    }

    // Clear previous game instance if any
    playerContainer.innerHTML = '';

    // Show the Popup layout
    popup.style.display = 'flex';

    // Create EmulatorJS dynamic iframe/configuration
    const emulatorFrame = document.createElement('iframe');
    // NOTE: Make sure your emulator folder path is correct relative to this file
    emulatorFrame.src = `emulatorjs/index.html?core=${core}&game=${encodeURIComponent(gameUrl)}`;
    emulatorFrame.style.width = '100%';
    emulatorFrame.style.height = '100%';
    emulatorFrame.style.border = 'none';
    
    playerContainer.appendChild(emulatorFrame);
}

// 3. Function to Close and Stop the Game
function closeGame() {
    const popup = document.getElementById('emulator-popup');
    const playerContainer = document.getElementById('game-player');

    if (popup) popup.style.display = 'none';
    if (playerContainer) playerContainer.innerHTML = ''; // Stops audio and game execution instantly
}

// 4. Add Emulator Popup HTML dynamically (Safer DOM injection)
document.addEventListener('DOMContentLoaded', () => {
    // Check if popup already exists in HTML to prevent duplicate injection
    if (!document.getElementById('emulator-popup')) {
        const popupHTML = `
            <div id="emulator-popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); justify-content: center; align-items: center; z-index: 9999;">
                <div id="emulator-box" style="position: relative; width: 85%; height: 80%; background: #0f0f26; border: 2px solid #ff007f; border-radius: 12px; overflow: hidden; box-shadow: 0 0 30px rgba(255,0,127,0.5);">
                    <button class="close-btn" onclick="closeGame()" style="position: absolute; top: 10px; right: 15px; background: #ff0055; color: white; border: none; padding: 8px 15px; font-weight: bold; border-radius: 6px; cursor: pointer; z-index: 10000;">❌ QUIT</button>
                    <div id="game-player" style="width: 100%; height: 100%;"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }
});