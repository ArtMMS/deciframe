const answerButton = document.getElementById("answerButton");

const modalOverlay = document.getElementById("modalOverlay");

const closeModal = document.getElementById("closeModal");

const confirmButton = document.getElementById("confirmButton");

const answerInput = document.getElementById("answerInput");

const feedback = document.getElementById("feedback");


/*
    =========================
    CONFIGURAÇÃO DA FASE
    =========================
*/

const correctAnswer = "01324";

const nextPage = "fase6.html";

const successSound = new Audio("assets/success.mp3");


/*
    =========================
    ESPALHAR TEXTOS ALEATORIAMENTE
    =========================
*/

const scatterZones = [
    { top: [6, 20],  left: [4, 26] },
    { top: [6, 20],  left: [68, 92] },
    { top: [30, 40], left: [3, 14] },
    { top: [30, 40], left: [84, 96] },
    { top: [70, 85], left: [4, 26] },
    { top: [70, 85], left: [68, 92] }
];

function randomInRange(min, max) {

    return Math.random() * (max - min) + min;

}


function scatterElement(el) {

    const zone = scatterZones[Math.floor(Math.random() * scatterZones.length)];

    const top = randomInRange(zone.top[0], zone.top[1]);

    const left = randomInRange(zone.left[0], zone.left[1]);

    el.style.top = top + "%";

    el.style.left = left + "%";

}


document.querySelectorAll(".scattered-text").forEach(scatterElement);


/*
    =========================
    ABRIR MODAL
    =========================
*/

function openModal() {

    modalOverlay.classList.remove("hidden");

    answerInput.focus();

}


/*
    =========================
    FECHAR MODAL
    =========================
*/

function closePuzzleModal() {

    modalOverlay.classList.add("hidden");

    answerInput.value = "";

    feedback.textContent = "";

}


/*
    =========================
    RESPOSTA CORRETA
    =========================
*/

function correct() {

    closePuzzleModal();

    setTimeout(() => {

        const overlay = document.createElement("div");

        overlay.classList.add("correct-overlay");

        document.body.appendChild(overlay);


        const message = document.createElement("div");

        message.classList.add("correct-message");

        message.textContent = "CERTA RESPOSTA";

        document.body.appendChild(message);


        successSound.currentTime = 0;

        successSound.play();


        setTimeout(() => {

            window.location.href = nextPage;

        }, 5000);

    }, 300);

}


/*
    =========================
    VERIFICAR RESPOSTA
    =========================
*/

function checkAnswer() {

    const answer = answerInput.value.trim();

    if (answer === "") {
        return;
    }


    if (answer === correctAnswer) {

        correct();

    } else {

        feedback.textContent = "eRRRRRRouuuuuu!";

    }

}


/*
    =========================
    EVENTOS
    =========================
*/

answerButton.addEventListener("click", openModal);

closeModal.addEventListener("click", closePuzzleModal);

confirmButton.addEventListener("click", checkAnswer);


/*
    Enter confirma a resposta.
*/

answerInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkAnswer();
    }

});


/*
    Fechar clicando fora da modal.
*/

modalOverlay.addEventListener("click", function(event) {

    if (event.target === modalOverlay) {
        closePuzzleModal();
    }

});