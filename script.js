const dino = document.getElementById('dino');
let isJumping = false;
let gravity = 0.9;
let position = 0;

function jump() {
    if (isJumping) return;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    position *= gravity;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 30;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const gameContainer = document.querySelector('.game-container');
    const cactus = document.createElement('div');
    let cactusPosition = 600;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    gameContainer.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftTimer);
            gameContainer.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftTimer);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        jump();
    }
});
