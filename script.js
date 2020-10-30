const startPosition = [1, 0];

let position = [...startPosition];

/** Object with story connected to different positions. */
const story = {
    '1,0': 'Du vaknar upp i skogen och har ingen aning om hur du hamnade här... Det är mitt i natten, kallt och fullmånen \
    lyser upp omgivningarna. Du tar dig upp på fötter och ser dig omkring. I norr är vägen blockerad av en hög mur. \
    Välj ett väderstreck på knapparna nedan för att försöka ta dig hem igen.',
    '0,0': 'Du går förbi ett snårigt skogsparti när en stor varulv plötsligt hoppar fram och attakerar! Du har bara dina knytnävar som vapen. \
    Om du överlever fighten finns bara en väg att gå – norrut.',
    '2,0': 'En glänta uppenbarar sig i skogen, lamporna på ett rymdskepp blinkar och du bländas av ett starkt sken. En tre meter lång alien \
    kommer hotfullt emot dig. Du ser dig snabbt omkring och upptäcker något blänkande föremål i gräset bredvid dig – ett svärd!! Du plockar upp det \
    och inleder kampen mot utomjordingen. OM du lyckas döda alien; fortsätt norrut.',
    '0,1': 'Du ser att du nästan är hemma igen och tar dig vidare genom den täta skogen. Plötsligt känner du vingarna från en ovanligt stor fladdermus \
    slå dig mot axeln, du snubblar till och när du tittar upp så står du ansikte mot ansikte med en 1 000 år gammal och väldigt blodtörstig vampyr. \
    Du får tag på en spetsig grenbit som vapen. Vampyren fäller ut sina huggtänder. Om du lyckas övervinna vampyren fortsätter du sedan österut.',
    '1,1': 'Det har blivit morgon och du är äntligen hemma igen – trött och sliten efter nattens alla monstermöten släpar du dig in i huset. \
    Vad vill du göra nu? Skriv ditt svar nedan.',
    '2,1': 'Du tar dig vidare genom skogen och börjar känna igen stigarna, du börjar närma dig ditt hus. Du hör tunga steg som kommer emot dig \
    bakom en krök längre fram. Marken skakar under dina fötter. Ett stort troll uppenbarar sig framför dig och blockerar vägen. \
    Tur att du har kvar svärdet. Lyckas du övervinna trollet så fortsätt västerut.'
};

const werewolf = {
    name: 'Wolfie',
    health: 9,
    strength: 3,
};

const vampire = {
    name: 'Bloody Mary',
    health: 7,
    strength: 4,
};

const alien = {
    name: 'Alien',
    health: 6,
    strength: 3,
};

const troll = {
    name: 'Trollo',
    health: 5,
    strength: 3,
};

/** Object that describes which directions are allowed. */
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

/** Object describing the players name, health and strength. */
const startPlayer = {
    name: 'Monster Slayer',
    health: 12,
    strength: 2,
};

let player = {...startPlayer};

/** Contains object that connects monsters to positions. */
function createMonsters() {
    const monsters = {
        '0,0': {...werewolf},
        '0,1': {...vampire},
        '2,0': {...alien},
        '2,1': {...troll},
    };
    return monsters;
};

/**
 * Updates position from current position.
 * @param {string} direction Direction how to move on map, going 'west', 'east' or 'north'.
 * @return {Number[]} Returns the updated position.
 */
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

/**
 * Checks if movement is allowed and alerts if not. 
 * @param {string} direction Direction how to move on map, going 'west', 'east' or 'north'.
 */
function moveOnMap(direction) {
    if(allowedMovements[position.toString()].includes(direction)) {
        move(direction);
    } else {
        alert('This road is blocked! Choose another direction.');
    }
};

/** Collection of functions that run the game (load next step, evaluate if game is won/lost, movements, shows and hides elements). */
function runGame() {
    printStory();
    checkGameWon();
    checkGameLost();
    clearFightLog();
    showTextInputHideButtons();
    hideMovementDuringFight();
    showMonsterPics();
};

/** Evaluates if game is won. */
function checkGameWon() {
    if (position[0] === 1 && position[1] === 1) {
        //alert('Yay you have won the game');
    }
};

/** Evaluates if game is lost. */
function checkGameLost() {
    if (player.health <= 0) {
        showFightLogText('You have died, click restart to try again.');
    }
};

/** Restarts the game. */
function restartGame() {
    position = [...startPosition];
    player = {...startPlayer};
    monsters = createMonsters();
    location.reload();
};

/** Displays the story connected to position. */
function printStory() {
    const storyText = story[position.toString()] || 'No story';
    showTextInHtml(storyText);
    console.log(storyText);
};

/** Handle fights between monsters and player, checks if fight is lost or won. */
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

/** Simulates dice roll for a six sided dice.
 * @return {Number} Returns a number between 1 and 6.
 */
function diceRoll() {
    const min = Math.ceil(1);
    const max = Math.floor(5);
    return Math.round(Math.random() * (max - min + 1) + min);
};

/**
 * Calculates how much damage monsters take.
 * @param {string} monsterEncounter monsters connected to positions.
 */
function damageMonster(monsterEncounter) {
    const damage = diceRoll() * player.strength;
    monsterEncounter.health -= damage;
    showFightLogText('You hit ' + monsterEncounter.name + ' for ' + damage + ' damage.');
    console.log('You hit ' + monsterEncounter.name + ' for ' + damage + ' damage.');
};

/**
 * Calculates how much damage player take.
 * @param {string} monsterEncounter monsters connected to positions.
 */
function damagePlayer(monsterEncounter) {
    const damage = diceRoll() * monsterEncounter.strength;
    player.health -= damage;
    showFightLogText(monsterEncounter.name + ' hit you for ' + damage + ' damage.');
    console.log(monsterEncounter.name + ' hit you for ' + damage + ' damage.');
};

/**
 * Displaying the fight log on page.
 * @param {string} text Shows fight log on page.
 */
function showFightLogText(text) {
    document.getElementById('fight-log').appendChild(document.createTextNode(text + ' '));
};

/**
 * Displaying the story text on page.
 * @param {string} text Shows story text on page.
 */
function showTextInHtml(text) {
    document.getElementById('story-text').innerText = text;
};

/** Moving west. */
function moveWest() {
    moveOnMap('west');
    runGame();
};

/** Moving east. */
function moveEast() {
    moveOnMap('east');
    runGame();
};

/** Moving north. */
function moveNorth() {
    moveOnMap('north');
    runGame();
};

/** Clears fight log when moving to next position. */
function clearFightLog() {
    document.getElementById('fight-log').innerText = '';
};

/** Displays which elements to show when game is won. */
function youAreHome() {
    showTitleHome();
    showReplyHome();
};

/** Displays your text from input field on page. */
function showReplyHome() {
    let inputText = document.getElementById('answer-input').value;
    document.getElementById('home').innerText = inputText;
};

/** Displays h1 title when game is won on page. */
function showTitleHome() {
    const titleText = 'Yay, du har vunnit spelet!'
    document.getElementById('title-win').innerText = titleText;
};

/** Displays input field on end position and removes buttons. */
function showTextInputHideButtons() {
    if (position[0] === 1 && position[1] === 1) {
        document.getElementById('container-input').style.display = 'block';
        document.getElementById('west').style.display = 'none';
        document.getElementById('north').style.display = 'none';
        document.getElementById('east').style.display = 'none';
        document.getElementById('fight').style.display = 'none';
    } 
};

/** Estimates if it should hide or display movement buttons during fight in positions with monsters. */
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

/**
 * Hides or shows movement buttons.
 * @param {string} visibility Sets visibility to movement buttons.
 */
function changeMovementVisibility(visibility) {
    let buttonsMove = document.getElementsByClassName('buttons-move');
    let item = buttonsMove;
    for (let i = 0; i < buttonsMove.length; i++) {
        item[i].style.visibility = visibility;
    }
};

/** Displays the right monster image on the right position. */
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
};