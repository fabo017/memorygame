const gameContainer = document.getElementById("game");
let firstSelect = null;
let secondSelect = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


function shuffle(array) {
  let counter = array.length;

 
  while (counter > 0) {
    
    let index = Math.floor(Math.random() * counter);

    
    counter--;

    
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
   
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
    if (noClicking) return;
    if (e.target.classList.contains("flipped")) return;
  
    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];
  
    if (!firstSelect || !secondSelect) {
      currentCard.classList.add("flipped");
      firstSelect = firstSelect || currentCard;
      secondSelect = currentCard === firstSelect ? null : currentCard;
    }
  
    if (firstSelect && secondSelect) {
      noClicking = true;
      // debugger
      let gif1 = firstSelect.className;
      let gif2 = secondSelect.className;
  
      if (gif1 === gif2) {
        cardsFlipped += 2;
        firstSelect.removeEventListener("click", handleCardClick);
        secondSelect.removeEventListener("click", handleCardClick);
        firstSelect = null;
        secondSelect = null;
        noClicking = false;
      } else {
        setTimeout(function() {
          firstSelect.style.backgroundColor = "";
          secondSelect.style.backgroundColor = "";
          firstSelect.classList.remove("flipped");
          secondSelect.classList.remove("flipped");
          firstSelect = null;
          secondSelect = null;
          noClicking = false;
        }, 1000);
      }
    }
  
    if (cardsFlipped === COLORS.length) alert("game over!");
  }
  
  createDivsForColors(shuffledColors);

