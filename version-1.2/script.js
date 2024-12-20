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

function addItem(){

    for(i = 0; i < hiragana.length; i++){
        let h1 = document.createElement("h1");
        h1.innerHTML = hiragana[i];

        // Assign a unique class or data attribute to each element for easier selection
        h1.classList.add("hiragana-item");
        h1.setAttribute("data-index", i); // Store the index for later use

        h1.addEventListener("click", function() {
            h1.style.background = "rgba(211,211,211,0.5)";
            h1.style.cursor = "pointer";
        })
    
        bingo.appendChild(h1);
    }
}

document.addEventListener('keydown',function(event){
    if(event.key === "Enter"){
    checking();
}
});

function generate(){
    
    randomIndex = Math.floor(Math.random() * hiragana.length);
    
    let currentHiragana = hiragana[randomIndex];
    
    expression = currentHiragana;

    document.getElementById('output').innerHTML = expression;
}


function checking() {
    const userInput = document.getElementById('user_input').value.toLowerCase();
    const currentSound = sound[randomIndex];

    let outcome = userInput === currentSound ? 'Correct!' : 'Close, keep trying.';
    
    document.getElementById('answer').innerHTML = outcome;

    // Access the corresponding h1 element using the randomIndex
    let correctHiraganaItem = document.querySelector(`.hiragana-item[data-index='${randomIndex}']`);
    
    // Change background color based on the outcome
    if (userInput === currentSound) {
        correctHiraganaItem.style.background = 'green';  // Set background to green if correct
        document.getElementById('user_input').value = '';
        generate();
    } else {
        correctHiraganaItem.style.background = 'red';  // Set background to red if incorrect
        document.getElementById('user_input').value = '';  // Clear input field
    }
}

