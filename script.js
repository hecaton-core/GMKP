const kissButton = document.getElementById("kiss-button");
const loveMessage = document.getElementById("love-message");

const messages = [
    "Sending you a kiss from France! 💋",
    "I hope your day is as beautiful as your smile 🌸",
    "The falang man is thinking about you ❤️",
    "Breaking News!: you are dangerously adorable! 🥰",
    "One more kiss, just because you deserve it! 😘",
    "I wish I could wake up next to you... 💕",
    "You just stole another kiss from me! 💋",
    "OK, another one! 😘",
    "Stop it, you're gonna break this button... 💕",
    "Hello, Kiss Delivery Inc, here's your order : 💋",
    "Yong ngam la 🥰",
    "Khoi kid hod chao, tii hak 💕",
    "🍌",
    "If you click 999 more times, something special will happen 😘",
    "You're still doing it ?... 🥰 OK, continue 💋",
    "Come closer... a little bit more... yes... 💋",
    "If you touch me this much in real life, something similar may happen... 😘",
    "Of course you want more ! 💋",
    "Until you get a real one, here's a virtual kiss 💋",
    "This one, it's just because I want 💋"
];

let remainingMessages = [];

//Relatif à la lettre des 1000 clicks : compteur de clicks stocké
//dans localStorage pour ne pas perdre les clicks déjà effectués
let totalKisses = Number(localStorage.getItem("totalKisses")) || 0;

let letterUnlocked =
    localStorage.getItem("letterUnlocked") === "true";

const loveOverlay = document.getElementById("love-overlay");
const closeLetter = document.getElementById("close-letter");
const reopenLetter = document.getElementById("reopen-letter");

//Création d'emojis volants au click
function createFlyingHearts() {
    const emojis = ["❤️", "💕", "💋", "🌸", "😘"];

    const buttonRect = kissButton.getBoundingClientRect();

    for (let i = 0; i < 3; i++) {
        const heart = document.createElement("span");

        heart.classList.add("flying-heart");

        heart.textContent = emojis[
            Math.floor(Math.random() * emojis.length)
        ];

        const startX = buttonRect.left +
            Math.random() * buttonRect.width;

        const startY = buttonRect.top +
            buttonRect.height / 2;

        const moveX = Math.random() * 160 - 80;

        heart.style.left = startX + "px";
        heart.style.top = startY + "px";
        heart.style.setProperty("--move-x", moveX + "px");

        document.body.appendChild(heart);

        heart.addEventListener("animationend", function () {
            heart.remove();
        });
    }
}

//Relatif au cadeau de fin de cycle
const giftOverlay = document.getElementById("gift-overlay");
const openGift = document.getElementById("open-gift");
const closeGift = document.getElementById("close-gift");
const giftMessage = document.getElementById("gift-message");

function showGift() {
    giftMessage.classList.add("hidden");
    openGift.classList.remove("hidden");
    giftOverlay.classList.remove("hidden");
}

openGift.addEventListener("click", function () {
    giftMessage.classList.remove("hidden");
    openGift.classList.add("hidden");
});

closeGift.addEventListener("click", function () {
    giftOverlay.classList.add("hidden");
});

//Relatif à la lettre des 1000 clicks
function showLoveLetter() {
    loveOverlay.classList.remove("hidden");
}

function hideLoveLetter() {
    loveOverlay.classList.add("hidden");
}

closeLetter.addEventListener("click", hideLoveLetter);
reopenLetter.addEventListener("click", showLoveLetter);

//Si la lettre a été ouverte une fois, le bouton
//pour la relire reste disponible aux visites suivantes.
if (letterUnlocked) {
    reopenLetter.classList.remove("hidden");
}

//MainEvent / Evènement principal
//Génération au click d'un message parmis ceux disponibles :
//Ceux déjà générés 1 fois sortent du tableau jusqu'à la fin du cycle
kissButton.addEventListener("click", function () {

    if (remainingMessages.length === 0) {
        remainingMessages = [...messages];
    }

    const randomIndex = Math.floor(
        Math.random() * remainingMessages.length
    );

    const selectedMessage = remainingMessages.splice(randomIndex, 1)[0];

    loveMessage.textContent = selectedMessage;
    totalKisses++;
    localStorage.setItem("totalKisses", totalKisses);

    if (remainingMessages.length === 0 && totalKisses !== 1000) {
    showGift();
    }
    createFlyingHearts();

    if (totalKisses === 1000 && !letterUnlocked) {
        letterUnlocked = true;
        localStorage.setItem("letterUnlocked", "true");
        reopenLetter.classList.remove("hidden");
        showLoveLetter();
        }
});
