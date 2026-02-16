// ------------------------------------------------------------
// Memory Match — 
// ------------------------------------------------------------

//iniatlizing and getting the variables
const board = document.getElementById('board');
const movesDis = document.getElementById('moves');
const cr_pairsDis = document.getElementById('matches')
const timeDis = document.getElementById('time')
const symbols = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🍍', '🍍', '🥝', '🥝', '🍋', '🍋'];
const messageDis = document.getElementById("message");
let fCard=[];
let currS = []
let cr_pairs=0;
let moves=0;
let t_s =0;
let isBlock = false;
let interval = null;

const btnNewGame = document.getElementById('btn-new-game');
const btnReset = document.getElementById('btn-reset')

function stopTimer(){
    // Stops the timer when the user gets all of the pairs
    if(interval!=null){
        clearInterval(interval);
        interval=null;
    }
}

function startTimer(){
    //Starts the timer when user clicks on the first card
    if(interval!=null){
        return 
    }

    interval = setInterval(() => {
    t_s += 1;
    timeDis.innerText = String(t_s);
     }, 1000);

}

function shuffleSyms(arr){
    //Shuffles the current symbols so each time there is a new game the symbols are randonly shuffeled
    const s = [...arr];
    for(let  i= s.length-1; i>0; i--){
        const calc = Math.floor(Math.random()*(i+1));
        let temp = s[i];
        s[i]= s[calc];
        s[calc]= temp;

    }
    return s

}

function resetGame(){
    //When the user clicks on the resetbutton then the variables sets to default
    cr_pairs=0;
    moves=0
     t_s =0;
    fCard=[];


    isBlock = false;

    
    movesDis.innerHTML="0";


    cr_pairsDis.innerHTML="0";
    timeDis.innerHTML="0";

    board.innerHTML="";
    messageDis.innerHTML=""
    
    stopTimer();


}

function BuildGame(Fsyms){
    //This function handles when the user clicks on the card
    board.innerHTML="";

    Fsyms.forEach(sym => {
        const card= document.createElement("div");
        card.className="card";
        card.dataset.face = sym;

        card.innerHTML = `
      <div class="card-face card-back"></div>
      <div class="card-face card-front">${sym}</div>
    `;

    card.addEventListener("click", () => runGame(card));
    board.appendChild(card);
        
    });

}

function runGame(card){
    if(isBlock || card.classList.contains("flipped") || card.classList.contains("matched")){
        return;
    }
    startTimer();
    card.classList.add("flipped");
    fCard.push(card);

    if(fCard.length!==2){
        return;
    }

    isBlock=true;
    moves++;
    movesDis.innerHTML=String(moves);

    const [Selc1,Selc2]= fCard;
    if(Selc1.dataset.face===Selc2.dataset.face){
        Selc1.classList.add("matched");
        Selc2.classList.add("matched");

        cr_pairs++;
        cr_pairsDis.innerHTML=String(cr_pairs);

        fCard=[];
        isBlock=false;
        if(cr_pairs==symbols.length/2){
            stopTimer();
            messageDis.innerHTML=`Congrats! finished in ${moves} moves in ${t_s}sec`;
        }
        return;
    }
   
    Selc1.classList.add("wrong");
    Selc2.classList.add("wrong");

    setTimeout(() => {
    Selc1.classList.remove("flipped", "wrong");
    Selc2.classList.remove("flipped", "wrong");

  fCard = [];
  isBlock = false;
   }, 1000);
   

   

}

function setNewGame(){
    resetGame();
    currS = shuffleSyms(symbols);
    BuildGame(currS);
}


function resetBoard(){
    resetGame();
    if(currS.length!==symbols.length){
         currS = shuffleSyms(symbols);
        
    }
     BuildGame(currS);
}

btnNewGame.addEventListener("click",setNewGame);
btnReset.addEventListener("click",resetBoard);

setNewGame();