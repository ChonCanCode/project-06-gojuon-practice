let hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ゐ','ゑ','を','ん'];
let sound = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','si','su','se','so','ta','ti','tu','te','to','na','ni','nu','ne','no','ha','hi','hu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wi','we','wo','n'];
let randomIndex = -1;
let expression = ''
let hiraganaButton = document.getElementsByClassName("hiraganaButton")[0];
let correctHiraganaItem;



window.addEventListener('load', startUpFunction);
function startUpFunction() {
    addItem(); 
    updateUIFromStorage(); 
    generate(); 
}

function addItem(){
    for(let i = 0; i < hiragana.length; i++){
        let button = document.createElement("button");
        button.innerHTML = hiragana[i];

        button.classList.add("hiragana-item");
        button.classList.add("hiragana-button")
        button.setAttribute("data-index", i); 

        button.addEventListener("click", function() {
            if (button.innerHTML === sound[i]) {
                button.innerHTML = hiragana[i]
            } else {
                button.innerHTML = sound[i]
            }
        })
    
        hiraganaButton.appendChild(button);
    }
}

document.addEventListener('keydown',function(event){
    if(event.key === "Enter"){
    checking();
}
});


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

let checkedIndices = new Set(
    localStorage.getItem("checkedCharacter")
      ? JSON.parse(localStorage.getItem("checkedCharacter"))
      : []
  );

function checking() {
    const userInput = document.getElementById('user_input').value.toLowerCase();
    const currentSound = sound[randomIndex];
    let outcome = userInput === currentSound ? 'Correct!' : 'Close, keep trying.';
    document.getElementById('answer').innerHTML = outcome;
    correctHiraganaItem = document.querySelector(`.hiragana-item[data-index='${randomIndex}']`);

    if (userInput === currentSound) {
        correctHiraganaItem.style.background = 'green';

        checkedIndices.add(randomIndex); 
        localStorage.setItem("checkedCharacter", JSON.stringify([...checkedIndices]));

        // let checkedIndices = new Set([1, 2, 3]);
        // let array = [...checkedIndices]; // Converts to [1, 2, 3]
        // console.log(array); // Output: [1, 2, 3]

        document.getElementById('user_input').value = '';  
        generate();  

    } else {
        correctHiraganaItem.style.background = 'red'; 
        document.getElementById('user_input').value = ''; 
        
    }
}

function updateUIFromStorage() {
    checkedIndices.forEach(index => {
        const button = document.querySelector(`.hiragana-item[data-index='${index}']`);
        if (button) {
            button.style.background = 'green';
        }
    });
}

function clearStorage(){
    localStorage.removeItem("checkedCharacter"); 
    checkedIndices = new Set(); 
    document.querySelectorAll('.hiragana-item').forEach(item => {
        item.style.background = '';
    });
}