//set up the game
class MemoryGame {
    constructor(totalTime, cards) {
        this.cards = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.counter = document.getElementById('flips');
    }
// start the game
    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.inProgress = true;
        setTimeout(() => {
            this.shuffleCards(this.cards);
            this.countdown = this.startCountdown();
            this.inProgress = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.counter.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.loseGame();
        }, 1000);
    }
// if time runs out
    loseGame() {
        clearInterval(this.countdown);
        document.getElementById('game-over').classList.add('visible');
    }
// if all cards are matched
    victory() {
        clearInterval(this.countdown);
        document.getElementById('victory').classList.add('visible');
    }
    hideCards() {
        this.cards.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.counter.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
//check if card is a match
    checkForMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardsDontmatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
//card matches
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cards.length)
            this.victory();
    }
// card does not match
    cardsDontmatch(card1, card2) {
        this.inProgress = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.inProgress = false;
        }, 1000);
    }
    shuffleCards(cards) {
        for (var i = cards.length - 1; i > 0; i--) {
            var randIndex = Math.floor(Math.random() * (i + 1));
            cards[randIndex].style.order = i;
            cards[i].style.order = randIndex;
        }
    }
// flipcards
    getCardType(card) {
        return card.getElementsByClassName('character')[0].src;
    }
    canFlipCard(card) {
        return !this.inProgress && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}
//check if page is ready
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
//functioning of the game
function ready() {
    var overlays = Array.from(document.getElementsByClassName('overlay'));
    var cards = Array.from(document.getElementsByClassName('card'));
    var game = new MemoryGame(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
// open the readme.txt file
document.getElementById("readme").addEventListener("click", function (e) {
    window.location.assign("memory.txt")
});