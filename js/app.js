let rulesScreen = document.querySelector('.rules');
let game__area = document.querySelector(".game__area");
let closeRulesBtn = document.querySelector(".close_rules");
let rulesBtn = document.querySelector('.rules-btn');
let match__area = document.querySelector('.match__area');
let lastActive;
let player;
let cpu;
let score = 0;
//changes the classes to hide and show every element on each click event
function hideShow(hide, show){
    hide.classList.replace("active", "inactive");
    show.classList.replace("inactive", "active");    
}

closeRulesBtn.addEventListener("click", function(){
    hideShow(rulesScreen, lastActive)
})

rulesBtn.addEventListener("click", function(){
    lastActive = document.querySelector('.active');
    hideShow(lastActive, rulesScreen)
})

game__area.addEventListener("click", function(e){
     if(e.target.className === '' || e.target.className === "game__area active"){
        return
    }else{
        takePlyerChoice(e.target.className.match(/[a-z]+/)[0]); 
    }
/*     takePlyerChoice(e.target.className.match(/[a-z]+/)[0]); */
})

//saves player's choice
function takePlyerChoice(val){
    hideShow(game__area, match__area);
    let yourHand = document.querySelector('.your-hand');
    let yourHandImg = document.querySelector('.your-hand-img');
    yourHandImg.src = `images/icon-${val}.svg`;
    yourHand.className = changeClasses(yourHand, val, 'animateYou');
    lastActive = document.querySelector('.match__area');
    player = val;
    housesChoice();
};

//saves house's choice
function housesChoice(){
    let choices = ["scissors", "paper", "rock"];
    let choiceIndex = Math.floor(Math.random() * 3);
    let houseHand = document.querySelector(".house-hand");
    let houseImg = document.querySelector(".house-hand-img");
    houseImg.src = `images/icon-${choices[choiceIndex]}.svg`;
    houseHand.className = changeClasses(houseHand, choices[choiceIndex], 'animateCpu');
    cpu = choices[choiceIndex];
}

//this one is just the catch the end of the animation to show the board
const yourHand = document.querySelector(".your-hand");
yourHand.addEventListener("animationend", function(){
    let endGame = document.querySelector('.end-game-board');
    hideShow(lastActive, endGame)
    compareHands();
})

//after the end of the match, this sends the player back to the begining of the game
document.querySelector(".play-again-btn").addEventListener("click", function(){
    hideShow(document.querySelector(".active"), game__area);
})

//this is used to display the choices seconds before the end of the match
//change the classes to start the animation
function changeClasses(element, class1, class2){
    element = element.className.split(' ');
    element[1] = `${class1}`;
    element[2] = `${class2}`;
    element.className = element.join(' ');
    return element.className
}

//this compares both hands to display who's the winner
function compareHands(){
    if (player === 'scissors' && cpu === 'paper'){
       updateScore(true)
    }
    if (player === 'paper' && cpu === 'rock'){
       updateScore(true)
    }
    if (player === 'rock' && cpu === 'scissors'){
       updateScore(true)
    }if (cpu === 'scissors' && player === 'paper'){
       updateScore(false)
    }
    if (cpu === 'paper' && player === 'rock'){
       updateScore(false)
    }
    if (cpu === 'rock' && player === 'scissors'){
       updateScore(false)
    }
    if(player === cpu){
        document.querySelector(".victorious-one").innerHTML = "Draw!";
    }
}

//pedra > tesoura
//tesoura > papel
//papel > pedra



function updateScore(val){
    let board = document.querySelector(".victorious-one");
    let scoreBoard = document.querySelector(".score");
    if(val){
        board.innerHTML =  'You Win!';
        score++;
        scoreBoard.innerHTML = score;
    }else{
        score--;
        if(score < 0){
            score = 0
        }
        board.innerHTML =  'You Loose!';
        scoreBoard.innerHTML = score;
    }
}