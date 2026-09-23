const output = document.getElementById("output");
const inputContainer = document.getElementById("inputContainer");
const input = document.getElementById("userInput");
const matrix = document.getElementById("matrix");

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

async function clearTerminal() {
    await wait(500);
    output.innerHTML = "";
}

async function startIntro() {
    await typeText("Olá!", 80);
    await wait(800);

    await typeText(
        "> Estamos procurando usuários altamente inteligentes.",
        35
    );

    await wait(800);

    await typeText(
        "> Você se considera capaz de realizar nosso teste?",
        35
    );

    await wait(500);

    inputContainer.classList.remove("hidden");
    input.focus();
}

async function startMatrix() {
    matrix.style.display = "block";

    const ctx = matrix.getContext("2d");

    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;

    const characters = "0123456789";
    const fontSize = 16;

    const columns = Math.floor(matrix.width / fontSize);

    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, matrix.width, matrix.height);

        ctx.fillStyle = "#00ff00";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const number = characters[
                Math.floor(Math.random() * characters.length)
            ];

            ctx.fillText(
                number,
                i * fontSize,
                drops[i] * fontSize
            );

            if (
                drops[i] * fontSize > matrix.height &&
                Math.random() > 0.975
            ) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    const interval = setInterval(draw, 33);

    await wait(5000);

    clearInterval(interval);

    window.location.href = "fase_teste.html";
}

async function positiveResponse() {
    inputContainer.classList.add("hidden");

    await clearTerminal();

    await typeText("> Ótimo, usuário!", 50);
    await wait(700);

    await typeText("> Bem-vindo ao jogo!", 50);

    await wait(1000);

    startMatrix();
}

async function negativeResponse() {
    inputContainer.classList.add("hidden");

    await clearTerminal();

    await typeText(
        "> Agradeço a honestidade, isso é uma virtude para poucos.",
        35
    );

    await wait(800);

    await typeText("> Adeus!", 50);

    await wait(500);

    const line = document.createElement("p");
    line.classList.add("red");
    line.textContent = "Admin desconectou";
    output.appendChild(line);
}

const positiveAnswers = [
    "sim",
    "positivo",
    "aham",
    "claro",
    "s",
    "si"
];

const negativeAnswers = [
    "não",
    "nao",
    "negativo",
    "n",
    "nope",
    "no",
    "nah"
];

input.addEventListener("keydown", async function(event) {
    if (event.key !== "Enter") {
        return;
    }

    const answer = input.value.trim().toLowerCase();

    if (answer === "") {
        return;
    }

    if (positiveAnswers.includes(answer)) {
        input.disabled = true;
        await positiveResponse();
    }

    else if (negativeAnswers.includes(answer)) {
        input.disabled = true;
        await negativeResponse();
    }

    // Respostas inválidas não fazem nada.
});

startIntro();