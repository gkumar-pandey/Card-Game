const DeckBtn = document.getElementById('new-deck');
let DecId;
const drawCardBtn = document.querySelector('#draw-card');
const cardSlot = document.querySelectorAll('.card-slot')
const winnerText = document.querySelector('.win-text');
const remainingCard = document.getElementById('remining-card-text')

 

function determineWhoWin(card1,card2){
    const cardValueOptions= ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE']
    // console.log(typeof card1)
    // console.log(cardValueOptions.indexOf(card1))
    const card1IndexValue = cardValueOptions.indexOf(card1)
    const card2IndexValue = cardValueOptions.indexOf(card2)

    if(card1IndexValue > card2IndexValue){
        return 'You Lose !!!!';
    }
    else if(card1IndexValue<card2IndexValue){
        return 'You Win !!'
    }
    else{
        return "Tie !!"
    }
    
}
 
const deckData = function (){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        DecId=data.deck_id;
        remainingCard.textContent = `Remaining Card : ${data.remaining}`
    });
}

DeckBtn.addEventListener('click',deckData);
drawCardBtn.addEventListener('click', () => {
 
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${DecId}/draw/?count=2`)    
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const cardLeft = data.remaining
        remainingCard.innerText = `Remaining Card : ${cardLeft}`
        cardSlot[0].innerHTML =  `<img src=${data.cards[0].image} class='card-img' />`
        cardSlot[1].innerHTML = `<img src=${data.cards[1].image} class='card-img' />`   
        const card1Value = data.cards[0].value;
        const card2Value=data.cards[1].value;
        
        const winner = determineWhoWin(card1Value,card2Value);
        winnerText.textContent = winner;
        if(cardLeft===0){
            
        }
    })


})

 

 