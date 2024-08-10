let timer;
let timeLeft = 30;
let username = '';
let correctLetters = 0; // To count correctly typed letters
let totalLetters = 0; // To count total letters
let totalSpaces = 0; // To count total spaces
let totalSpecialChars = 0; // To count total special characters
const paragraph = document.getElementById('paragraph');
const playerInput = document.getElementById('playerInput');
const usernamePopup = document.getElementById('usernamePopup');
const usernameInput = document.getElementById('usernameInput');
const submitUsername = document.getElementById('submitUsername');
const game = document.getElementById('game');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const scoreButton = document.getElementById('scoreButton');
const timeDisplay = document.getElementById('time');
const scoreboard = document.getElementById('scoreboard');
const closeScoreboard = document.getElementById('closeScoreboard');
const scoresDiv = document.getElementById('scores');

function countCharacters(text) {
    let letters = 0;
    let spaces = 0;
    let specialChars = 0;
    
    for (let char of text) {
        if (char.match(/[a-zA-Z]/)) {
            letters++;
        } else if (char === ' ') {
            spaces++;
        } else {
            specialChars++;
        }
    }
    
    return { letters, spaces, specialChars };
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    playerInput.disabled = true;
    startButton.disabled = false;
    stopButton.disabled = true;
    scoreButton.disabled = false;
    saveScore();
    alert(`Game Over! You typed ${correctLetters} correct letters.`);
}

function resetGame() {
    timeLeft = 30;
    correctLetters = 0;
    timeDisplay.textContent = timeLeft;
    playerInput.value = '';
    playerInput.disabled = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    scoreButton.disabled = true;
    highlightText(paragraph.textContent, '');

    // Count characters in the paragraph
    const counts = countCharacters(paragraph.textContent);
    totalLetters = counts.letters;
    totalSpaces = counts.spaces;
    totalSpecialChars = counts.specialChars;

    console.log(`Total Letters: ${totalLetters}`);
    console.log(`Total Spaces: ${totalSpaces}`);
    console.log(`Total Special Characters: ${totalSpecialChars}`);
}

function highlightText(originalText, typedText) {
    const highlightedText = originalText.split('').map((char, index) => {
        if (index < typedText.length) {
            const typedChar = typedText[index];
            if (typedChar === char) {
                correctLetters++;
                return `<span class="highlight-correct">${char}</span>`;
            } else {
                return `<span class="highlight-incorrect">${char}</span>`;
            }
        }
        return char;
    }).join('');

    paragraph.innerHTML = highlightedText;
}

function saveScore() {
    if (username) {
        fetch('/save_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, score: correctLetters })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Score saved:', data);
        });
    }
}

submitUsername.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username === '') {
        alert('Please enter your name.');
        return;
    }
    usernamePopup.classList.add('hidden');
    game.classList.remove('hidden');
    resetGame();
});

startButton.addEventListener('click', () => {
    resetGame();
    startTimer();
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
    clearInterval(timer);
    endGame();
});

playerInput.addEventListener('input', () => {
    const typedText = playerInput.value;
    const originalText = paragraph.textContent;
    highlightText(originalText, typedText);

    if (typedText === originalText) {
        playerInput.style.backgroundColor = 'lightgreen';
        endGame();
    } else {
        playerInput.style.backgroundColor = 'white';
    }
});

scoreButton.addEventListener('click', () => {
    fetch('/scoreboard')
        .then(response => response.json())
        .then(scores => {
            scoresDiv.innerHTML = scores.map(score => `<p>${score.name}: ${score.score}</p>`).join('');
            scoreboard.classList.remove('hidden');
        });
});

closeScoreboard.addEventListener('click', () => {
    scoreboard.classList.add('hidden');
});
