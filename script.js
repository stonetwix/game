const startPosition = [1, 0];

let position = [...startPosition];

const story = {
    '1,0': 'Du vaknar upp mitt i skogen och har ingen aning om hur du hamnade här. Det är mitt i natten, kallt och fullmånen lyser upp omgivningarna. Du tar dig upp på fötter och ser dig omkring. I norr är vägen blockerad av en hög mur. Välj ett väderstreck på knapparna nedan.',
    '0,0': 'Du går förbi ett snårigt skogsparti när en stor varulv plötsligt hoppar fram och attakerar! Du har bara dina knytnävar som vapen. Om du överlever fighten finns bara en väg att gå – norrut.',
    '2,0': 'En glänta uppenbarar sig i skogen, lamporna på  ett rymdskepp blinkar och du bländas av ett starkt sken. En tre meter lång alien kommer hotfullt emot dig. Du ser dig snabbt omkring och ser något blänkande föremål i gräset bredvid dig – ett svärd! Du plockar upp det och tar upp kampen mot utomjordingen. OM du tar dig förbi fortsätt norrut.',
    '0,1': 'Du tar dig vidare genom den täta skogen och känner vingarna från en ovanligt stor fladdermus slå dig mot axeln, du snubblar till och när du tittar upp så står du ansikte mot ansikte med en 1000 år gammal och väldigt blodtörstig vampyr. Du får tag på en spetsig grenbit som vapen. Du fortsätter sedan österut.',
    '1,1': 'Det har blivit morgon och du är äntligen hemma igen, din hund kommer springande och möter dig i trädgården, om du vil klappa hunden. Skriv "klappa" i inputfältet nedan.',
    '2,1': 'Du tar dig vidare genom skogen och börjar känna igen stigarna, du börjar närma sig ditt hus. Du hör tunga steg som kommer emot dig bakom en krök längre fram. Marken skakar under dina fötter. Ett stort troll uppenbarar sig framför dig och blockerar vägen. Den ser inte vänligt inställd ut. Tur att du har kvar svärdet. Lyckas du övervinna trollet så fortsätt västerut.',
};

const werewolf = {
    name: 'Wolfie',
    health: 7,
    strength: 1,
};

const vampire = {
    name: 'Bloody Mary',
    health: 4,
    strength: 2,
};

const alien = {
    name: 'Alien',
    health: 5,
    strength: 2,
};

const troll = {
    name: 'Trollo',
    health: 5,
    strength: 3,
};

const allowedMovements = {
    '1,0': ['west', 'east'],
    '0,0': ['north'],
    '2,0': ['north'],
    '0,1': ['east'],
    '1,1': ['north'],
    '2,1': ['west'],
    '0,2': ['east'],
    '2,2': ['west']
};

let monsters = createMonsters();

const startPlayer = {
    name: 'Moa',
    health: 12,
    strength: 2,
};

let player = {...startPlayer};

function createMonsters() {
    const monsters = {
        '0,0': {...werewolf},
        '0,1': {...vampire},
        '2,0': {...alien},
        '2,1': {...troll},
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
    checkGameWon();
    checkGameLost();
    clearFightLog();
    showTextInputHideButtons();
    hideMovementDuringFight();
    showMonsterPics();
};

//Evaluate if game is won
function checkGameWon() {
    if (position[0] === 1 && position[1] === 1) {
        //alert('Yay you have won the game');
    }
};

function checkGameLost() {
    if (player.health <= 0) {
        showFightLogText('You have died, click restart to try again.');
    }
};

function restartGame() {
    position = [...startPosition];
    player = {...startPlayer};
    monsters = createMonsters();
    location.reload();
};

function printStory() {
    const storyText = story[position.toString()] || 'No story';
    showTextInHtml(storyText);
    console.log(storyText);
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
            showFightLogText(monsterEncounter.name + ' is dead!');
            break;
        }
        damagePlayer(monsterEncounter);
        if (player.health <= 0) {
            showFightLogText('You have died, click restart to try again.');
            break;
        }
    }
    hideMovementDuringFight();
};

function diceRoll() {
    const min = Math.ceil(1);
    const max = Math.floor(5);
    return Math.round(Math.random() * (max - min + 1) + min);
};

function damageMonster(monsterEncounter) {
    const damage = diceRoll() * player.strength;
    monsterEncounter.health -= damage;
    showFightLogText('You hit ' + monsterEncounter.name + ' for ' + damage + ' damage.');
    console.log('You hit ' + monsterEncounter.name + ' for ' + damage + ' damage.');
};

function damagePlayer(monsterEncounter) {
    const damage = diceRoll() * monsterEncounter.strength;
    player.health -= damage;
    showFightLogText(monsterEncounter.name + ' hit you for ' + damage + ' damage.');
    console.log(monsterEncounter.name + ' hit you for ' + damage + ' damage.');
};


function showFightLogText(text) {
    document.getElementById('fight-log').appendChild(document.createTextNode(text + ' '));
};


function showTextInHtml(text) {
    document.getElementById('story-text').innerText = text;
};

function moveWest() {
    moveOnMap('west');
    runGame();
};

function moveEast() {
    moveOnMap('east');
    runGame();
};

function moveNorth() {
    moveOnMap('north');
    runGame();
};

function clearFightLog() {
    document.getElementById('fight-log').innerText = '';
};

function youAreHome() {
    showTitleHome();
    showReplyHome();    
};

function showReplyHome() {
    let inputText = document.getElementById('answer-input').value;
    document.getElementById('home').innerText = inputText;
};

function showTitleHome() {
    const titleText = 'Yay, du har vunnit spelet!'
    document.getElementById('title-win').innerText = titleText;
};

function showTextInputHideButtons() {
    if (position[0] === 1 && position[1] === 1) {
        document.getElementById('container-input').style.display = 'block';
        document.getElementById('west').style.display = 'none';
        document.getElementById('north').style.display = 'none';
        document.getElementById('east').style.display = 'none';
        document.getElementById('fight').style.display = 'none';
    } 
};

function hideMovementDuringFight() {
    const monsterEncounter = monsters[position.toString()];
    if(monsterEncounter === undefined) {
        return;
    }
    if (monsterEncounter.health > 0) {
        changeMovementVisibility('hidden');
        
    } else {
        changeMovementVisibility('visible');
    }
};

function changeMovementVisibility(visibility) {
    let buttonsMove = document.getElementsByClassName('buttons-move');
    let item = buttonsMove;
    for (let i = 0; i < buttonsMove.length; i++) {
        item[i].style.visibility = visibility;
    }
};

function showMonsterPics() {
    if (position[0] === 0 && position[1] === 0) {
        document.getElementById('werewolf').style.display = 'block';
    } else {
        document.getElementById('werewolf').style.display = 'none';
    }
    if (position[0] === 0 && position[1] === 1) {
        document.getElementById('bat').style.display = 'block';
    } else {
        document.getElementById('bat').style.display = 'none';
    }
    if (position[0] === 2 && position[1] === 0) {
        document.getElementById('alien').style.display = 'block';
    } else {
        document.getElementById('alien').style.display = 'none';
    }
    if (position[0] === 2 && position[1] === 1) {
        document.getElementById('troll').style.display = 'block';
    } else {
        document.getElementById('troll').style.display = 'none';
    }
}

