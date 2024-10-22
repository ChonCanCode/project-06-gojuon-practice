**project-06-gojuon-practice**

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
