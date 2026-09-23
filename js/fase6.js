const output = document.getElementById("output");

const gift = document.getElementById("gift");

const nextPage = "fim.html";


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function typeText(text, speed = 40) {

    const line = document.createElement("p");

    output.appendChild(line);

    for (let i = 0; i < text.length; i++) {

        line.textContent += text[i];

        await wait(speed);

    }

}


/*
    =========================
    SEQUÊNCIA DE DESPEDIDA
    =========================
*/

async function startFarewell() {

    await typeText("Meus parabéns, usuário.", 50);

    await wait(700);

    await typeText("Nunca na história alguém chegou tão longe nesse teste quanto você.", 35);

    await wait(700);

    await typeText("Pegue isso e aproveite, você merece!", 50);

    await wait(1000);

    dropGift();

}


/*
    =========================
    PRESENTE CAINDO
    =========================
*/

function dropGift() {

    gift.classList.remove("hidden");

    // força o navegador a registrar o estado inicial (top: -250px)
    // antes de aplicar a classe que muda para o estado final,
    // garantindo que a transição realmente seja animada.
    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            gift.classList.add("drop");

        });

    });


    // libera o clique após a queda terminar (mesma duração da transição CSS).
    setTimeout(() => {

        gift.classList.add("landed");

    }, 1800);

}


/*
    =========================
    CLIQUE NO PRESENTE
    =========================
*/

gift.addEventListener("click", () => {

    if (!gift.classList.contains("landed")) {
        return;
    }

    triggerExplosion();

});


function triggerExplosion() {

    gift.style.display = "none";

    const explosion = document.createElement("div");

    explosion.classList.add("explosion");

    document.body.appendChild(explosion);


    setTimeout(() => {

        window.location.href = nextPage;

    }, 1200);

}


startFarewell();