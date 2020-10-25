const startPosition = [1, 0];
let position = [...startPosition];
const story = {
    '1,0': 'Start text',
    '1,1': 'Middle text',
    '1,2': 'Goal text',
};
const werewolf = {
    name: 'Werewolf',
    health: 10,
    strength: 1,
};
const monsters = {
    '0,0': {...werewolf, name: 'Wolfie'},
};
const player = {
    name: 'Moa',
    health: 5,
    strength: 1,
};

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
    fight();
};

//Evaluate if game is won
function checkGameWon() {
    if (position[0] === 1 && position[1] === 2) {
        alert('Yay you have won the game');
    }
};

function restartGame() {
    position = [...startPosition];
};

function printStory() {
    const storyText = story[position.toString()] || 'No story';
    console.log(storyText);
};

function fight() {
    const monsterEncounter = monsters[position.toString()];
    console.log('Hello, my name is ' + monsterEncounter.name);
    while (true) {
        damageMonster(monsterEncounter);
        if (monsterEncounter.health <= 0) {
            console.log(monsterEncounter.health);
            console.log(monsterEncounter.name + ' is dead!');
            break;
        }
        damagePlayer(monsterEncounter);
        if (player.health <= 0) {
            break;
        }

    }
};

function diceRoll() {
    const min = Math.ceil(1);
    const max = Math.floor(5);
    return Math.round(Math.random() * (max - min + 1) + min);
};

function damageMonster(monsterEncounter) {
    const damage = diceRoll() * player.strength;
    monsterEncounter.health -= damage;
    console.log('You hit ' + monsterEncounter.name + ' for ' + damage + ' damage.');
};

function damagePlayer(monsterEncounter) {
    const damage = diceRoll() * monsterEncounter.strength;
    player.health -= damage;
    console.log(monsterEncounter.name + ' hit you for ' + damage + ' damage.');
}