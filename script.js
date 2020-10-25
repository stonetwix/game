const startPosition = [1, 0];
let position = [...startPosition];

// Move function
function move(direction) {
    if (direction === 'west') {
        position[0] -= 1;
    } else if (direction === 'east') {
        position[0] += 1;
    } else if (direction === 'north') {
        position[1] += 1;
    }
    return position;
};

//Load next step, evaluate if game is won, movements
function runGame() {
    checkGameWon();
};

function checkGameWon() {
    if (position[0] === 1 && position[1] === 2) {
        alert('Yay you have won the game');
    }
};

function restartGame() {
    position = [...startPosition];
}