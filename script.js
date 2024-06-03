const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
let isJumping = false;
let gravity = 0.9;

function jump() {
    if (isJumping) return;
    let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
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
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.style.right = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftTimer);
            cactus.remove();
        } else if (cactusPosition > 0 && cactusPosition < 60 && parseInt(dino.style.bottom) < 60) {
            clearInterval(leftTimer);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.right = cactusPosition + 'px';
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
