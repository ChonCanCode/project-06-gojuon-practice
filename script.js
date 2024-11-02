window.addEventListener('load', startUpFunction);

function startUpFunction(){
    generate();
    addItem();
}

let hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ゐ','ゑ','を','ん'];

let sound = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','si','su','se','so','ta','ti','tu','te','to','na','ni','nu','ne','no','ha','hi','hu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wi','we','wo','n'];

let randomIndex = -1;

let expression = ''

let bingo = document.getElementsByClassName("bingo")[0];

let hiraganaItems = document.querySelectorAll('.hiragana-item');

let correctHiraganaItem;  // Declare globally to use inside generate()

function addItem(){

    for(let i = 0; i < hiragana.length; i++){
        let button = document.createElement("button");
        button.innerHTML = hiragana[i];

        // Assign a unique class or data attribute to each element for easier selection
        button.classList.add("hiragana-item");
        button.classList.add("hiragana-button")
        button.setAttribute("data-index", i); // Store the index for later use

        button.addEventListener("click", function() {
            if (button.innerHTML === sound[i]) {
                button.innerHTML = hiragana[i]
            } else {
                button.innerHTML = sound[i]
            }
        })
    
        bingo.appendChild(button);
    }
}

document.addEventListener('keydown',function(event){
    if(event.key === "Enter"){
    checking();
}
});
let checkedIndices = new Set();  

function generate() {
    do {
        randomIndex = Math.floor(Math.random() * hiragana.length);
    } while (checkedIndices.has(randomIndex) && checkedIndices.size < hiragana.length);

    if (checkedIndices.size === hiragana.length) {
        document.getElementById('output').innerHTML = "All characters have been checked!";
        return;
    }

    let currentHiragana = hiragana[randomIndex];
    expression = currentHiragana;
    document.getElementById('output').innerHTML = expression;
}

function checking() {
    const userInput = document.getElementById('user_input').value.toLowerCase();
    const currentSound = sound[randomIndex];

    let outcome = userInput === currentSound ? 'Correct!' : 'Close, keep trying.';
    document.getElementById('answer').innerHTML = outcome;

    correctHiraganaItem = document.querySelector(`.hiragana-item[data-index='${randomIndex}']`);
    if (userInput === currentSound) {
        correctHiraganaItem.style.background = 'green';  // Set background to green if correct
        checkedIndices.add(randomIndex);  // Add index to checked set
        document.getElementById('user_input').value = '';  // Clear input field
        generate();  // Call generate to get a new Hiragana character
    } else {
        correctHiraganaItem.style.background = 'red';  // Set background to red if incorrect
        document.getElementById('user_input').value = '';  // Clear input field
    }
}


let mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(1); // Won't add again since 1 is already in the set
console.log(mySet); // Output: Set { 1, 2 }