// ------------------------------------------------------------
// Memory Match — 
// ------------------------------------------------------------

const board = document.getElementById('board');
const symbols = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋'];


symbols.sort(() => Math.random() - 0.5);

// Create the cards dynamically
symbols.forEach(symbol => {
    const card = document.createElement('div');
    card.className = 'card-item';
    card.innerHTML = `
        <div class="card-face card-back"></div>
        <div class="card-face card-front">${symbol}</div>
    `;
    
    card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
    });

    board.appendChild(card);
});