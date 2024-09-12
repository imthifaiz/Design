const goat = document.getElementById('goat');
const leaf = document.getElementById('leaf');
const bike = document.getElementById('bike');
const scoreDisplay = document.getElementById('score');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const backgroundMusic = document.getElementById('background-music');
const gameOverMusic = document.getElementById('game-over-music');
const startButton = document.getElementById('start-button');

let score = 0;
let goatPosition = 125; // Starting position of the goat
let gameInterval;
let gameSpeed = 5; // Speed of object movement

// Function to move the goat left or right
function moveGoat(direction) {
    if (direction === 'left' && goatPosition > 0) {
        goatPosition -= 20;
    } else if (direction === 'right' && goatPosition < 250) {
        goatPosition += 20;
    }
    goat.style.left = `${goatPosition}px`;
}

// Add event listeners for keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveGoat('left');
    } else if (event.key === 'ArrowRight') {
        moveGoat('right');
    }
});

// Add event listeners for button clicks
leftButton.addEventListener('click', () => moveGoat('left'));
rightButton.addEventListener('click', () => moveGoat('right'));

// Add event listener for start button
startButton.addEventListener('click', () => {
    backgroundMusic.play();
    startGame();
});

function startGame() {
    // Place initial objects randomly
    resetObject(leaf, 'leaf');
    resetObject(bike, 'bike');

    gameInterval = setInterval(() => {
        moveObject(leaf, 'leaf');
        moveObject(bike, 'bike');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // If object goes off the screen, reset it
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px'; // Start off screen at the top
    object.style.left = `${Math.floor(Math.random() * 270)}px`; // Random X position
}

function checkCollision() {
    let goatRect = goat.getBoundingClientRect();
    let leafRect = leaf.getBoundingClientRect();
    let bikeRect = bike.getBoundingClientRect();

    // Check collision with leaf
    if (goatRect.left < leafRect.right &&
        goatRect.right > leafRect.left &&
        goatRect.top < leafRect.bottom &&
        goatRect.bottom > leafRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(leaf, 'leaf');
    }

    // Check collision with bike
    if (goatRect.left < bikeRect.right &&
        goatRect.right > bikeRect.left &&
        goatRect.top < bikeRect.bottom &&
        goatRect.bottom > bikeRect.top) {
        clearInterval(gameInterval);
        backgroundMusic.pause(); // Stop background music
        gameOverMusic.play();   // Play game-over music

        // Show alert after game-over music finishes
        gameOverMusic.onended = () => {
            alert('Game Over! Anna kitta mattikita Your Score: ' + score);
            window.location.reload();
        };
    }
}
