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

const correctAnswer = "piramide";

const nextPage = "fase2.html";

const successSound = new Audio("assets/success.mp3");


/*
    =========================
    NORMALIZAR TEXTO (remove acentos)
    =========================
*/

function normalize(text) {

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


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


    if (normalize(answer) === correctAnswer) {

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