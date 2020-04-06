(function main() {

    const card = document.querySelector('.card');
    const scoreHTML = document.querySelector('.pontos');
    const triesHTML = document.querySelector('.jogadas');
    const playAgain = document.querySelector('.playAgain');
    const btnPlayAgain = document.querySelector('.btn-play-again');
    const btnClose = document.querySelector('.btn-close');
    const login = document.querySelector('.login');
    const inputName = document.querySelector('#name');
    const btnName = document.querySelector('.btn-name');
    const namePlayerHTML = document.querySelector('.name-player');

    let name;
    let firstClick;
    let secondClick;
    let contScores = 0;
    let tries = 0;
    let inGame = false;

    function namePlayer() {
        btnName.addEventListener('click', (e) => {
            e.preventDefault();
            name = inputName.value;
            if(!name) return;
            namePlayerHTML.innerHTML = name;
            login.style.display = "none";
        });
    }

    namePlayer();

    const logo = "fab fa-js";
    const icons = [
       "fas fa-gem",
       "fas fa-bomb",
       "fas fa-bicycle",
       "fas fa-paw",
       "fas fa-anchor",
       "fab fa-earlybirds",
    ];

    startGame();

    function startGame() {

        playAgain.style.display = "none";

        let cardArray = [];
        [ firstClick, secondClick, inGame, contScores, tries ] = [ null, null, false, 0, 0];

        scores(contScores);
        tryGame(tries);

        icons.forEach(icon => {
            cardArray.push(`
                <div class="memory-card">
                    <div class="card-front">
                        <i class="${icon}"></i>
                    </div>
                    <div class="card-back">
                        <i class="${logo}"></i>
                    </div>
                </div>
            `);
            cardArray.push(`
                <div class="memory-card">
                    <div class="card-front">
                        <i class="${icon}"></i>
                    </div>
                    <div class="card-back">
                        <i class="${logo}"></i>
                    </div>
                </div>
            `);
        });

        cardArray = embaralhaArray(cardArray);

        function embaralhaArray(array) {
            let indiceArray = array.length;
            let indiceAleatorio;
            let valorAux;
            for(let i = 0; i < indiceArray; i++) {
                indiceAleatorio = Math.floor((Math.random() * indiceArray));
                
                valorAux = array[i];
                array[i] = array[indiceAleatorio];
                array[indiceAleatorio] = valorAux;
            }

            return array;
        }

        addCardsHTML();

        function addCardsHTML() {
            card.innerHTML = '';
            cardArray.forEach(cardArray => {
                card.innerHTML += cardArray;
            });
        }

        const memoryCards = document.querySelectorAll('.memory-card');

        memoryCards.forEach( memoryCard => memoryCard.addEventListener('click', flipCard));

    }

    function flipCard() {
        if(inGame) return;
        
        this.classList.add('flip');
        
        if(!firstClick){
            firstClick = this;
            return;
        }

        secondClick = this;

        let check = checkCard(firstClick, secondClick);

        if(check) {
            inGame = true;
            tries++;
            contScores++;
            tryGame(tries);
            scores(contScores);
            setTimeout(() => {
                [ firstClick, secondClick, inGame ] = [ null, null, false];
            }, 1000);
        } else {
            inGame = true;
            tries++;
            tryGame(tries);
            setTimeout(() => {
                firstClick.classList.remove('flip');
                secondClick.classList.remove('flip');
                [ firstClick, secondClick, inGame ] = [ null, null, false];
            }, 1000);

        }

    }

    function checkCard(firstClick, secondClick) {
        const cardSelectFirst = firstClick.children[0].children[0];
        const cardSelectSecond = secondClick.children[0].children[0];
        
        if(cardSelectFirst.classList.value === cardSelectSecond.classList.value){
            return true;
        } else {
            return false;
        }

    }

    function scores(contScores) {
        scoreHTML.innerHTML = contScores;
        checkWin(contScores);
    }

    function tryGame (tries){
        triesHTML.innerHTML = tries;
    }

    function checkWin(contScores) {
       if(contScores === icons.length){
            contScores = 0;
            setTimeout(()=> {
                playAgain.style.display = "flex";
                playAgain.style.alignItems = "center";
                playAgain.style.justifyContent = "center";
                playAgain.style.flexDirection = "column";
            }, 1000);
            btnPlayAgain.addEventListener('click', newGame);
            btnClose.addEventListener('click', closeGame);
       }
    }

    function newGame() {
        [ firstClick, secondClick, inGame, ] = [ null, null, false];
        startGame();
    }

    function closeGame() {
        newGame();
        login.style.display = "flex";
    }

} ());