let computerMove = "";
let result = "";
let player_choice = "";
let isAutoPlaying = false; // Track if auto-play is active
let intervalId; // Store the interval ID to clear it later

let Score = JSON.parse(localStorage.getItem('Score'));
if (Score === null) {
    Score = {
        Wins: 0,
        Losses: 0,
        Tie: 0
    }
};

function dislpay() {
    document.querySelector('.js-score_status')
        .innerHTML = `${result}`
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${Score.Wins}  Losses: ${Score.Losses}  Tie:  ${Score.Tie}`;
    document.querySelector('.js-score_players')
        .innerHTML = `You: ${player_choice} vs  ${computerMove}:Computer `
    }

    function score(Result){
        if (Result === "You win") {
            Score.Wins += 1;
        } else if (Result === "You losse") {
            Score.Losses += 1;
        } else if (Result === "Tie") {
            Score.Tie += 1;
        }
    
        localStorage.setItem('Score', JSON.stringify(Score));
        return `${dislpay()}`
}


function Auto_Play() {
    if (!isAutoPlaying) {
        // Start auto-play
        intervalId = setInterval(function () {
            // Randomly pick a move for the player
            const randomNumber = Math.random();
            if (randomNumber >= 0 && randomNumber <= 1 / 3) {
                Rock(); // Simulate Rock
            } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
                Paper(); // Simulate Paper
            } else if (randomNumber > 2 / 3 && randomNumber <= 1) {
                Scissors(); // Simulate Scissors
            }
        }, 1000); // Run every 1 second
        isAutoPlaying = true;
    } else {
        // Stop auto-play
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

function pickComputerMove(){
    let randomNumber = Math.random()
    console.log(randomNumber)

    if (randomNumber >= 0 && randomNumber <= 1/3 ){
        computerMove = "✊";
    } else if (randomNumber > 1/3 && randomNumber <= 2/3){
        computerMove = "🖐";
    } else if (randomNumber > 2/3 && randomNumber <= 1){
        computerMove = "✌️";
    }
}

function Rock(){
    pickComputerMove()
    player_choice = "✊"
    if (computerMove === "✊") {
        result = "Tie";
    } else if (computerMove === "🖐"){
        result = "You losse";
    } else if (computerMove === "✌️") {
        result = "You win";
    }
    score(result)
}

function Paper(){
    pickComputerMove()
    player_choice = "🖐"
    if (computerMove === "🖐") {
        result = "Tie";
    } else if (computerMove === "✊"){
        result = "You win";
    } else if (computerMove === "✌️") {
        result = "You losse";
    }
    score(result)
}
function Scissors(){
    pickComputerMove()
    player_choice = "✌️"
    if (computerMove === "✌️") {
        result = "Tie";
    } else if (computerMove === "🖐"){
        result = "You win";
    } else if (computerMove === "✊") {
        result = "You losse";
    }
    score(result)
}
function Reset(){
    Score.Wins = 0
    Score.Losses = 0
    Score.Tie = 0

    result = ""
    player_choice = ""
    computerMove = ""
    
    dislpay()
    localStorage.setItem('Score', JSON.stringify(Score));
}
