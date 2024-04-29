// game components
var audio;

function startGame() {
    var audio = new sound("media/image.mp3");
    audio.play();
}

function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "play");
    if(src == "media/image.mp3"){
        this.sound.setAttribute("loop", true);
    }
    this.sound.style.display = "play";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
}
// open the readme.txt file
document.getElementById("readme").addEventListener("click", function (e) {
    window.location.assign("ImgGame.txt")
});

// audio effects
var correct = new Audio();
correct.src = '/media/correct.wav';

var flip = new Audio();
flip.src = '/media/flipsound.wav';

var victory = new Audio();
victory.src = '.wav';