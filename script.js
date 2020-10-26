const startPosition = [1, 0];

let position = [...startPosition];

const story = {
    '1,0': 'Du vaknar upp mitt i skogen och har ingen aning om hur du hamnade här. Det är mitt i natten, kallt och fullmånen lyser upp omgivningarna. Du tar dig upp på fötter och ser dig omkring.',
    '0,0': 'Ett par gula lysand ögon lurar i ett buskage, en varulv hoppar fram. Grrr! Jag är och du är inte välkommen här och attakerar.',
    '2,0': '',
    '1,1': 'Middle text',
    '1,2': 'Goal text',
};

const werewolf = {
    name: 'Werewolf',
    health: 10,
    strength: 1,
};

const vampire = {
    name: 'Dracula',
    health: 12,
    strength: 3,
};

const alien = {
    name: 'Alien',
    health: 13,
    strength: 4,
};

const allowedMovements = {
    '1,0': ['west', 'east'],
    '0,0': ['north'],
    '2,0': ['north'],
    '0,1': ['north', 'east'],
    '1,1': ['north'],
    '2,1': ['north', 'west'],
    '0,2': ['east'],
    '2,2': ['west']
};

let monsters = createMonsters();

const startPlayer = {
    name: 'Moa',
    health: 5,
    strength: 1,
};

let player = {...startPlayer};

function createMonsters() {
    const monsters = {
        '0,0': {...werewolf, name: 'Wolfie'},
        '0,1': {...vampire, name: 'Bloody Mary'},
        '2,0': {...alien},
    };
    return monsters;
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

function moveOnMap(direction) {
    if(allowedMovements[position.toString()].includes(direction)) {
        move(direction);
    } else {
        alert('This road is blocked! Choose another direction.');
    }
};

//Load next step, evaluate if game is won, movements
function runGame() {
    printStory();
    fight();
    checkGameWon();
    checkGameLost();
};

//Evaluate if game is won
function checkGameWon() {
    if (position[0] === 1 && position[1] === 2) {
        alert('Yay you have won the game');
    }
};

function checkGameLost() {
    if (player.health <= 0) {
        alert('You have died, click restart to try again.');
    }
};

function restartGame() {
    position = [...startPosition];
    player = {...startPlayer};
    monsters = createMonsters();
};

function printStory() {
    const storyText = story[position.toString()] || 'No story';
    showTextInHtml(storyText);
    console.log(storyText);
};

function showHideElements() {

};

function fight() {
    const monsterEncounter = monsters[position.toString()];
    if (monsterEncounter === undefined) {
        return;
    }
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
};

function showTextInHtml(text) {
    document.getElementById('story-text').innerText = text;
};

function moveWest() {
    moveOnMap('west');
    runGame();
}