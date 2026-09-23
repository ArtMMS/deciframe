const answerButton = document.getElementById("answerButton");

const modalOverlay = document.getElementById("modalOverlay");

const closeModal = document.getElementById("closeModal");

const confirmButton = document.getElementById("confirmButton");

const answerInput = document.getElementById("answerInput");

const feedback = document.getElementById("feedback");


/*
    =========================
    CONFIGURAÇÃO DA FASE (PERGUNTA FINAL)
    =========================
*/

const correctAnswer = "soulja boy";

const nextPage = "fase5.html";

const successSound = new Audio("assets/success.mp3");


/*
    =========================
    CONFIGURAÇÃO DO CELULAR
    =========================
*/

const phoneKeys = document.querySelectorAll(".phone-key");

const phoneLine = document.getElementById("phoneLine");

const phoneWrapper = document.getElementById("phoneWrapper");

const targetPhoneNumber = "6789998212";

const phoneVideoUrl = "https://youtu.be/Rq9DeYyP2fg?list=RDRq9DeYyP2fg&t=57";

const dialSounds = [
    new Audio("assets/fase4/sounds/discar1.mp3"),
    new Audio("assets/fase4/sounds/discar2.mp3"),
    new Audio("assets/fase4/sounds/discar3.mp3")
];

const busySound = new Audio("assets/fase4/sounds/busycall.mp3");

let dialSoundIndex = 0;

let enteredDigits = "";

let phoneLocked = false;


/*
    =========================
    ATUALIZAR LINHA DO CELULAR
    =========================
*/

function updatePhoneLine() {

    let display = "";

    for (let i = 0; i < 10; i++) {

        display += enteredDigits[i] || "_";

        if (i === 2 || i === 5) {
            display += "-";
        }

    }

    phoneLine.textContent = display;

}


/*
    =========================
    PRESSIONAR NÚMERO
    =========================
*/

function pressDigit(digit) {

    if (phoneLocked) {
        return;
    }


    dialSounds[dialSoundIndex].currentTime = 0;

    dialSounds[dialSoundIndex].play();

    dialSoundIndex = (dialSoundIndex + 1) % dialSounds.length;


    enteredDigits += digit;

    updatePhoneLine();


    if (enteredDigits.length === 10) {

        checkPhoneNumber();

    }

}


/*
    =========================
    VERIFICAR NÚMERO DISCADO
    =========================
*/

function checkPhoneNumber() {

    if (enteredDigits === targetPhoneNumber) {

        phoneLocked = true;

        showPhoneSuccess();

        window.open(phoneVideoUrl, "_blank");

    } else {

        busySound.currentTime = 0;

        busySound.play();

        enteredDigits = "";

        updatePhoneLine();

    }

}


/*
    =========================
    INDICADOR DE SUCESSO (TESTE)
    =========================
*/

function showPhoneSuccess() {

    const successMark = document.createElement("div");

    successMark.classList.add("phone-success");

    successMark.textContent = "✓";

    phoneWrapper.appendChild(successMark);


    phoneKeys.forEach((key) => {

        key.disabled = true;

    });

}


/*
    =========================
    EVENTOS DO CELULAR
    =========================
*/

phoneKeys.forEach((key) => {

    key.addEventListener("click", () => {

        pressDigit(key.dataset.digit);

    });

});


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


    if (answer.toLowerCase().includes(correctAnswer)) {

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