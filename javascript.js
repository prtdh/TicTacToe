const XCLASS='x';
const CIRCLECLASS='circle';
let circleturn;
let winningCombination=[ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];
let winningMessageElement=document.getElementById('scores');
let winningMessageText=document.querySelector('[data-winning-message-text]');
const cellelements=document.querySelectorAll('[data-cell]');
const grid=document.getElementById('grid-container');
const restart=document.getElementById('restart');
startgame();
/* to start the game and get X hover in beginning */
    restart.addEventListener('click',startgame);
    
function startgame(){
    circleturn=false;
    setBoardHover();
    cellelements.forEach(cell => {
        cell.classList.remove(XCLASS);
        cell.classList.remove(CIRCLECLASS);
        cell.removeEventListener('click',handleclick);
        cell.addEventListener('click',handleclick,{once:true});
    });

   winningMessageElement.classList.remove('show');
}
function clickPlay(){
    var audioclick=new Audio("click.wav").play();
}
function endPlay(){
    var audioend=new Audio("endsound.wav").play();
}
    
function handleclick(e){

    let cell=e.target;
    let currentClass;
    if(circleturn){
        currentClass='circle';
    }
    else {
        currentClass='x';
    }
    placeMark(cell,currentClass);

    /*adding checkwinner class */

    if(checkwin(currentClass)){
            endgame(false);
    }
    else if(isDraw()){
        endgame(true);
    }
    else{

        swapturn();
        setBoardHover();
    
    }


}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
    clickPlay();    
}
function swapturn(){
    circleturn=!circleturn;
}
function setBoardHover(){
    grid.classList.remove(CIRCLECLASS);
    grid.classList.remove(XCLASS);
    if(circleturn){
        grid.classList.add(CIRCLECLASS);
    }
    else{
        grid.classList.add(XCLASS);
    }
    
}

/* CHECK RESULT */

function checkwin(currentClass){
    return winningCombination.some(combination=>{
        return combination.every(index=>{
            return cellelements[index].classList.contains(currentClass);
        })
    })
}
/* draw */

function isDraw(){
    return [...cellelements].every(cell=>{
        return cell.classList.contains(XCLASS) || cell.classList.contains(CIRCLECLASS)
    })
}

/* end game */
function endgame(draw){
    if(draw){
        winningMessageText.innerText= `Draw`;
    }
    else{
        winningMessageText.innerText=`${circleturn ? "Player O":"Player X"} Wins! `
    }
        endPlay();
    
    winningMessageElement.classList.add('show');

}