let timerInterval;
let time = 0;
let isPlaying = false;
let scores = [];

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const timerDisplay = document.getElementById('timer');
const typingArea = document.getElementById('typing-area');
const scoreboardPopup = document.getElementById('scoreboard-popup');
const closeScoreboardBtn = document.getElementById('close-scoreboard');
const showScoreboardBtn = document.getElementById('show-scoreboard');
const scoreList = document.getElementById('score-list');

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
closeScoreboardBtn.addEventListener('click', () => {
    scoreboardPopup.style.display = 'none';
});
showScoreboardBtn.addEventListener('click', showScoreboard);

function startGame() {
    isPlaying = true;
    time = 0;
    typingArea.value = '';
    typingArea.disabled = false;
    typingArea.focus();
    startBtn.disabled = true;
    stopBtn.disabled = false;

    timerInterval = setInterval(() => {
        time++;
        timerDisplay.textContent = `Time: ${time}`;
    }, 1000);
}

function stopGame() {
    clearInterval(timerInterval);
    isPlaying = false;
    typingArea.disabled = true;
    startBtn.disabled = false;
    stopBtn.disabled = true;

    const playerName = prompt("Enter your name:");
    const playerScore = typingArea.value.length;
    scores.push({ name: playerName, score: playerScore });

    updateScoreboard();
}

function updateScoreboard() {
    scoreList.innerHTML = '';
    scores.sort((a, b) => b.score - a.score);

    scores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score} points`;
        scoreList.appendChild(li);
    });
}

function showScoreboard() {
    scoreboardPopup.style.display = 'block';
}


// keyboard funcation

let textArea = document.querySelector('textarea');
let uyir_eluthu = document.querySelectorAll('.uyir_eluthu');
let symbols = document.querySelectorAll('.symbols');
let special_symbol = document.querySelectorAll('.special_symbol');
let mei_eluthu = document.querySelectorAll('.mei_eluthu');
let Enter = document.querySelector('.Enter');
let Space_bar = document.querySelector('.Space_bar');
let shift = document.querySelector('#Shift');
let backspace = document.querySelector('.Backspace');
const deletebtn = document.querySelector('.Delete');
let buttonStyle = document.querySelectorAll(".buttonStyle");
let ayuthaEluthu = document.querySelector('.ayuthaeluthu');
let shree = document.querySelector('.shree');

//  logic for the "uyir_eluthu"
let allBtns = document.querySelectorAll('button')
for (let i = 0; i < uyir_eluthu.length; i++) {
    uyir_eluthu[i].addEventListener("click", (e) => {
        textArea.focus();
        textArea.value = textArea.value + e.target.innerText;
        // suggestion();
    })
}
// all btns after suggestion.

// logic for the "mei_eluthu"
for (let i = 0; i < mei_eluthu.length; i++) {
    mei_eluthu[i].addEventListener("click", (e) => {
        textArea.focus();
        textArea.value = textArea.value + e.target.innerText
        suggestion();
    })
}
//  code for the "symbols"
// this symbols added in the after the "mei_eluthu"
for (let i = 0; i < symbols.length; i++) {
    symbols[i].addEventListener("click", (e) => {
        for (let j = 0; j < uyir_eluthu.length; j++) {
            if (textArea.value.slice(-1) == e.target.innerText || textArea.value == "" || uyir_eluthu[j].innerText) {
                textArea.focus();
                textArea.value = textArea.value
            } 
        }
        for (let k = 0; k < mei_eluthu.length; k++) {
            if (textArea.value.slice(-1) == mei_eluthu[k].innerText) {
                textArea.value = textArea.value + e.target.innerText
            }
        }
        for(let l = 0;  l < special_symbol.length; l++){
            if (textArea.value.slice(-1) == special_symbol[l].innerText) {
                textArea.value = textArea.value + e.target.innerText
                special_symbol[i].style.backgroundColor = "#252424"
            }
        }

    })
}



//code for the "special_symbol" 
// this special_symbol is added the before the "mei_eluthu"
let special_symbol_clicked = false;
let letterArray = [];
for (let i = 0; i < special_symbol.length; i++) {
    special_symbol[i].addEventListener("click", (e) => {
        special_symbol_clicked = true;
        special_symbol[i].style.backgroundColor = "rgb(5, 90, 112)"
        letterArray.push(e.target.innerText);
        for (let j = 0; j < mei_eluthu.length; j++) {
            mei_eluthu[j].addEventListener("click", (e) => {
                special_symbol[i].style.backgroundColor = "#252424"
                if (special_symbol_clicked) {
                    letterArray.push(e.target.innerText);
                    letterArray.reverse()
                    let array_to_string_2 = letterArray[1].toString()
                    console.log(array_to_string_2)
                    letterArray = [];
                    textArea.value = textArea.value + array_to_string_2
                }
                special_symbol_clicked = false
                suggestion();
            })
        }
    })

}

// code for the "enter key"
Enter.addEventListener('click', () => {
    textArea.focus();
    let cursorPos = $('textarea').prop('selectionStart');
    let textAreaValue = $('textarea').val();
    let textBeforeLetter = textAreaValue.substring(0, cursorPos);
    let textAfterLetter = textAreaValue.substring(cursorPos, textAreaValue.length);
    $('textarea').val(textBeforeLetter += "\n" + textAfterLetter);
})

// the code for the "delete key"
deletebtn.addEventListener('click', () => {
    textArea.focus();
    textArea.value = '';
})

// the code for the "backspace"
backspace.addEventListener('click', () => {
    textArea.value = textArea.value.slice(0, -1)
    suggestion()
})

// the code for the "numbers keys" + "shift"
let flag = false;
shift.addEventListener("click", () => {
    if (!flag) {
        flag = true
    }
    else if (flag == true) {
        flag = false
    }
    shift.classList.toggle('toggle')
})
for (let l = 0; l < buttonStyle.length; l++) {
    buttonStyle[l].addEventListener('click', () => {
        if (flag) {
            textArea.focus();
            let cursorPos = $('textarea').prop('selectionStart');
            let textAreaValue = $('textarea').val();
            let textBeforeLetter = textAreaValue.substring(0, cursorPos);
            let textAfterLetter = textAreaValue.substring(cursorPos, textAreaValue.length);
            $('textarea').val(textBeforeLetter += buttonStyle[l].children[0].innerText + textAfterLetter);
        }
        else {
            textArea.focus();
            let cursorPos = $('textarea').prop('selectionStart');
            let textAreaValue = $('textarea').val();
            let textBeforeLetter = textAreaValue.substring(0, cursorPos);
            let textAfterLetter = textAreaValue.substring(cursorPos, textAreaValue.length);
            $('textarea').val(textBeforeLetter += buttonStyle[l].children[1].innerText + textAfterLetter);
        }
    })
}

// writing the code for the "ayuthaEluthu"
ayuthaEluthu.addEventListener('click', (e) => {
    textArea.value = textArea.value + e.target.innerText;
})

// the code for the "shree"
shree.addEventListener('click', (e) => {
    textArea.value = textArea.value + e.target.innerText;
})

Space_bar.addEventListener('click', () => {
    textArea.focus();
    textArea.value += ' ';
    suggestion();
    for (let z = 0; z < allBtns.length; z++) {
        allBtns[z].addEventListener('click', () => {
            suggestion();
        })
    }
})
let sugestionUl = document.querySelector(".suggestion")
let output = []
function suggestion() {
    sugestionUl.style.display = "block"
    let textValue = document.querySelector('textarea').value;
    output.length = 0
    for (let v = 0; v < suggestion_Words.length; v++) {
        if (suggestion_Words[v].indexOf(textValue) != -1) {
            output.push(suggestion_Words[v])
        }
    }
    let htmlEle = output.map((element) => {
        return `
        <li class="sugs">${element}</li>
        `
    }).join("")
    sugestionUl.innerHTML = htmlEle
    let sugs = document.querySelectorAll(".sugs")
    sugs.forEach((sugestion) => {
        sugestion.addEventListener("click", () => {
            suggestion()
            textArea.value = sugestion.innerText
            output.length = 0
            sugestionUl.style.display = "none"
            textArea.focus();
        })
    });
}