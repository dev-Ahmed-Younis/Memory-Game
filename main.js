// اختيار العناصر
let start = document.querySelector(".start-game");
let startSpan = document.querySelector(".start-game span");
let infoNameSpan = document.querySelector(".info .name span");
let TimeLeftSpan= document.querySelector(".time span");
let scoreGot =document.querySelector(".score .got");
let scoreTotal =document.querySelector(".score .total");
let infoTriesSpan = document.querySelector(".info .tries span");
let memoryGameContanir = document.querySelector(".memory-game-contanir");
let gameBlock= Array.from( memoryGameContanir.children );
let sFil = document.getElementById("fil");
let sSuss = document.getElementById("succ");
let sFill = document.getElementById("fill");
let Win = document.getElementById("win");

// وقت اللعبه 
let devaltLivlSeconds = 60 ;
TimeLeftSpan.innerHTML = devaltLivlSeconds;
// اسكور اللعبه
scoreTotal.innerHTML = gameBlock.length /2

// الزرار الخاص بكتابه الاسم وبدايه اللعبه
startSpan.onclick = function(){
    let name = window.prompt("Whats Your Name");
    if(name == null || name == ""){
        infoNameSpan.innerHTML="Unknown" ;
    }else{
        infoNameSpan.innerHTML=name ;
    };
    start.remove()
    gameBlock.forEach((block)=>{
        
        flippStart(block)
        
    })
    startPlay()
};

//  function بتعرض الكروت كلها في بدايه اللعبه لمده محدده 
function flippStart(e){
    e.classList.add("is-flipped");
    setTimeout(()=>{
            e.classList.remove("is-flipped");
    },2000)
}
// function  مسؤوله عند انتهاء الوقت وشاشه النهايه
function startPlay() {
    TimeLeftSpan.innerHTML= devaltLivlSeconds;
    let start = setInterval(() => {
        TimeLeftSpan.innerHTML--;
        if(TimeLeftSpan.innerHTML === "0"){
            clearInterval(start);
            let div =document.createElement("div");
            div.className = "finsh";
            let span = document.createElement("span");
            let txt = document.createTextNode("Game Over");
            span.appendChild(txt)
            div.appendChild(span);
            let startAgain = document.createElement("span");
            startAgain.className = "start-again"
            let tx = document.createTextNode("Start Again");
            startAgain.appendChild(tx)
            div.appendChild(startAgain);
            document.body.appendChild(div);
            sFill.play()
            startAgain.onclick = function(){
                location.reload()
            }
        };
        if(scoreGot.innerHTML === scoreTotal.innerHTML){
                clearInterval(start);
        };
    }, 1000);
}

// توزيع للكورت بطريقه عشوئيه 
let duration = 1000 ;
let orderRange = [...Array(gameBlock.length).keys()];
shaffil(orderRange)
gameBlock.forEach((block , index)=>{
    block.style.order = orderRange[index]
    block.addEventListener("click", ()=>{
        flipping(block);
    })
});
function shaffil (array){
    let current = array.length,
        tamp,
        random;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        tamp = array[current];
        array[current] = array[random];
        array[random] = tamp
    }
    return array
};

//  بتعمل اظهار للكرت اللي بتضغط عليه 
function flipping(ele) {
    ele.classList.add("is-flipped");

    let filtring = gameBlock.filter(ele => ele.classList.contains("is-flipped"));

    if(filtring.length == 2 ){
        stopClick()
        matchBlock(filtring[0],filtring[1]);
    }

};
//  بتمنع الضغط علي اي كرت تاني 
function stopClick() {
    memoryGameContanir.classList.add("stop");
    setTimeout(()=>{
        memoryGameContanir.classList.remove("stop");
    },duration)
};
// بتشوف الكروت متطابقه ولا لا
function matchBlock(one , two ){
    if(one.dataset.cat === two.dataset.cat){
        scoreGot.innerHTML++;
        one.classList.remove("is-flipped");
        two.classList.remove("is-flipped");
        one.classList.add("match");
        two.classList.add("match");
        sSuss.play();
        if(scoreGot.innerHTML === scoreTotal.innerHTML){
            let div =document.createElement("div");
            div.className = "win";
            let span = document.createElement("span");
            let txt = document.createTextNode("You Win");
            span.appendChild(txt)
            div.appendChild(span);
            let startAgain = document.createElement("span");
            startAgain.className = "start-again"
            let tx = document.createTextNode("Start Again");
            startAgain.appendChild(tx)
            div.appendChild(startAgain);
            document.body.appendChild(div);
            Win.play()
            startAgain.onclick = function(){
                location.reload()
            }
        }
    }else{
        infoTriesSpan.innerHTML = parseInt(infoTriesSpan.innerHTML) + 1
        setTimeout(()=>{
        one.classList.remove("is-flipped");
        two.classList.remove("is-flipped");
    },duration)
        sFil.play();
    }
}