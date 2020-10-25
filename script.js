const startPosition = [1, 0];
let position = [...startPosition];
const story = {
    '1,0': 'Start text',
    '1,1': 'Middle text',
    '1,2': 'Goal text',
}

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
    printStory();
};

function checkGameWon() {
    if (position[0] === 1 && position[1] === 2) {
        alert('Yay you have won the game');
    }
};

function restartGame() {
    position = [...startPosition];
}

function printStory() {
    const storyText = story[position.toString()];
    console.log(storyText);
}