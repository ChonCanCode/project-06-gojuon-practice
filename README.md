**project-06-gojuon-practice**

***Version 1.5***
My attemp in trying to get localStorage to work:

```
// let checkedIndices = new Set(); 
let webStorage = localStorage.getItem("checkedCharacter") ? JSON.parse(localStorag.getItem("checkedCharacter")) : [];


function checking() {
    const userInput = document.getElementById('user_input').value.toLowerCase();
    const currentSound = sound[randomIndex];
    let outcome = userInput === currentSound ? 'Correct!' : 'Close, keep trying.';
    document.getElementById('answer').innerHTML = outcome;
    correctHiraganaItem = document.querySelector(`.hiragana-item[data-index='${randomIndex}']`);

    if (userInput === currentSound) {
        correctHiraganaItem.style.background = 'green';

        // checkedIndices.add(randomIndex); 
        localStorage.setItem("items",JSON.stringify(randomIndex));

        document.getElementById('user_input').value = '';  
        generate();  

    } else {
        correctHiraganaItem.style.background = 'red'; 
        document.getElementById('user_input').value = ''; 
    }
}

```

With the Help of chatGPT (NEED TO REVIEW and LEARN!!!)

```
let hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ゐ','ゑ','を','ん'];
let sound = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','si','su','se','so','ta','ti','tu','te','to','na','ni','nu','ne','no','ha','hi','hu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wi','we','wo','n'];
let randomIndex = -1;
let expression = ''
let hiraganaButton = document.getElementsByClassName("hiraganaButton")[0];
// let hiraganaItems = document.querySelectorAll('.hiragana-item');
let correctHiraganaItem;

// let webStorage = localStorage.getItem("checkedCharacter") ? JSON.parse(localStorag.getItem("checkedCharacter")) : [];

window.addEventListener('load', startUpFunction);
function startUpFunction() {
    addItem(); // Add all buttons first
    updateUIFromStorage(); // Update the UI based on stored progress
    generate(); // Start the quiz with a new character
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
    localStorage.removeItem("checkedCharacter"); // Only clear the specific key
    checkedIndices = new Set(); // Reset it to an empty Set
    document.querySelectorAll('.hiragana-item').forEach(item => {
        item.style.background = ''; // Reset all button colors
    });
}
```




***Version 1.4***
- Changed all the h2 elements into button elements so it will have the button effect enableing clicking function that switched to sound upon clicking. And if clicking againg switched back to hiragana.
- Added regenrating function if the character already matched as green at teh bingo session. Need to review code as follow:
```
let correctHiraganaItem;  // Declare globally to use inside generate()

;et checkedIndices = new Set();  // Set to store indices of green-marked characters

function generate() {
    // Continue generating a random index until we find one that hasn't been checked
    do {
        randomIndex = Math.floor(Math.random() * hiragana.length);
    } while (checkedIndices.has(randomIndex) && checkedIndices.size < hiragana.length);

    // If all characters have been marked, exit or do something else
    if (checkedIndices.size === hiragana.length) {
        document.getElementById('output').innerHTML = "All characters have been checked!";
        return;
    }

    // Get the new Hiragana character
    let currentHiragana = hiragana[randomIndex];
    expression = currentHiragana;
    document.getElementById('output').innerHTML = expression;
}

function checking() {
    const userInput = document.getElementById('user_input').value.toLowerCase();
    const currentSound = sound[randomIndex];

    let outcome = userInput === currentSound ? 'Correct!' : 'Close, keep trying.';
    document.getElementById('answer').innerHTML = outcome;

    // Access the corresponding button using randomIndex
    correctHiraganaItem = document.querySelector(`.hiragana-item[data-index='${randomIndex}']`);

    // Change background color based on the outcome
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
```




***Versison 1.3***
- Planning to add a function where up on clicking the character it will display the sound of the character with the following function.

```
    div.addEventListener("click", function () {
        if (h2_answer.style.display === "none") {
            h2_answer.style.display = "block";
        } else {
            h2_answer.style.display = "none";
        }
    });
```



***Version 1.2***
- Bug fixed added exter function below to filter out numerical value and space

```
        <input type="text" id="user_input" placeholder="Romaji sound" oninput="validateLetters(this)"><button onclick="checking()">Check</button><button onclick="generate()" class="reload"><i class="fa-solid fa-arrow-right"></i></button>
        <script>
            function validateLetters(input) {
                input.value = input.value.replace(/[^a-zA-Z]/g, ''); // Allow letters only (A-Z, a-z)
            }
```

- Created a container enabling hiragana to map out in the website up on loading. Instead of creating each letter one by one a function is created when the page is loaded it will run through the entire array and create a h1 element for each character.
- Each character is unqiue and able to interact individually.
- Created most of the function myself by need chatGPT to fix some syntax error

```
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

```

- Hard stuck in here need help mapout my logic, as I now I have the entire Array created in JS but need allocation as I want to access for future a big gap of knowledge and diffcult to chase it on the console. but each h1 is unqie also not showing in the HTML. 
- Type out my logic and chatGPT helped came with a solution it works but I need to revise and understand the logic to apply for future use.

- using Responsive Design Testing website http://mattkersley.com/responsive/
- I am able to fix the over size character under different devices. 


***Version 1.1***
- Bug, if space was entered in the input answer will always false
- Roadmap
    1. Create a scoped element .createElement("h2") to store the charater that was tested with result
    2. Storing the result accordingly with .insertAdjacentElement("beforeend", h2)
    3. Make the character already tested will not be repeated in a singe sequence
    4. **diffcult** Create a table match with the natual gojuon template and each character that was tested will be highlighted from "style display: hidden" > " active". 



***Version 1.0***
- The basic functional JS:
    1. Able to randomise different character with Math.random()
    2. Able to record the random number and enable future usage
    3. Matching the same random number gereanted with a character sound
    4. A checking function and repeatable practice
