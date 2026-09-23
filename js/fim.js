const body = document.body;

const cakeRain = document.getElementById("cakeRain");

const bgAudio = document.getElementById("bgAudio");


/*
    =========================
    FADE DE BRANCO PARA PRETO
    =========================
*/

window.addEventListener("load", () => {

    requestAnimationFrame(() => {

        body.classList.add("faded");

    });

});


/*
    =========================
    CHUVA DE BOLO (INFINITA)
    =========================
*/

const dropCount = 30;

function createDrop() {

    const drop = document.createElement("img");

    drop.src = "assets/chuva_bolo.gif";

    drop.classList.add("cake-drop");


    const size = Math.random() * 30 + 30;

    drop.style.width = size + "px";

    drop.style.left = Math.random() * 100 + "%";


    const duration = Math.random() * 5 + 4;

    drop.style.animationDuration = duration + "s";

    drop.style.animationDelay = (-Math.random() * duration) + "s";


    cakeRain.appendChild(drop);

}


for (let i = 0; i < dropCount; i++) {

    createDrop();

}


/*
    =========================
    ÁUDIO EM LOOP
    =========================
*/

function tryPlayAudio() {

    bgAudio.play().catch(() => {

        // navegador bloqueou o autoplay, tenta de novo na primeira interação.

    });

}


tryPlayAudio();


document.addEventListener("click", tryPlayAudio, { once: true });

document.addEventListener("keydown", tryPlayAudio, { once: true });