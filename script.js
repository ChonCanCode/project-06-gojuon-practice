window.addEventListener('load',generate);

let hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ゐ','ゑ','を','ん'];

let sound = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','si','su','se','so','ta','ti','tu','te','to','na','ni','nu','ne','no','ha','hi','hu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wi','we','wo','n'];

let randomIndex = -1;

let expression = ''

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


function checking(){

    const userInput = document.getElementById('user_input').value.toLowerCase();

    const currentSound = sound[randomIndex];

    let outcome = userInput == currentSound ? 'Correct!' : `Nice try, it is "${currentSound}"`

    document.getElementById('answer').innerHTML = outcome;

    if (outcome === 'You dumb dumb?') {
        document.getElementById('user_input').value = '';
        ''
    }
}


