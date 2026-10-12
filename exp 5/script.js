"use strict";

const byId = (id) => document.getElementById(id);

// DOM selection by ID and a click event.
byId("change-message").addEventListener("click", () => {
    byId("dom-message").textContent = "The DOM updated this message in place. ✨";
});

let clicks = 0;
byId("click-card").addEventListener("click", () => {
    clicks += 1;
    byId("click-count").textContent = clicks;
});

byId("key-input").addEventListener("keyup", (event) => {
    byId("key-output").textContent = event.key === " " ? "Space" : event.key;
});

document.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
        byId("event-notice").textContent = `Click event received: ${event.target.closest("button").textContent.trim()}`;
    }
});

// String split and array length: find shortest and longest words.
byId("word-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const words = byId("sentence").value.trim().match(/[\p{L}\p{N}'’-]+/gu) || [];
    if (!words.length) return;
    const shortest = words.reduce((a, b) => b.length < a.length ? b : a);
    const longest = words.reduce((a, b) => b.length > a.length ? b : a);
    byId("shortest").textContent = shortest;
    byId("longest").textContent = longest;
});

// BMI calculator: kg / m², with the handout's body type bands.
byId("bmi-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const weight = Number(byId("weight").value);
    const height = Number(byId("height").value);
    if (!(weight > 0 && height > 0)) return;
    const bmi = weight / (height * height);
    byId("score").textContent = bmi.toFixed(2);
    byId("type").textContent = bmi < 18 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
});

// Create an equal-chance apple or orange in every garden cell.
byId("garden-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const rows = Math.min(8, Math.max(1, Number(byId("rows").value)));
    const columns = Math.min(8, Math.max(1, Number(byId("columns").value)));
    const garden = byId("garden");
    garden.replaceChildren();
    garden.style.setProperty("--columns", columns);
    for (let i = 0; i < rows * columns; i += 1) {
        const fruit = Math.random() < 0.5 ? "apple" : "orange";
        const image = document.createElement("img");
        image.src = `${fruit}.svg`;
        image.alt = fruit[0].toUpperCase() + fruit.slice(1);
        garden.append(image);
    }
});

// Convert with the specified rates: 1 INR = 0.015 USD; 1 USD = 67.12 INR.
byId("currency-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = Number(byId("amount").value);
    const from = byId("from").value;
    const to = byId("to").value;
    let converted = amount;
    if (from !== to) converted = from === "INR" ? amount * 0.015 : amount * 67.12;
    const formatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: to, maximumFractionDigits: 2 });
    byId("answer").textContent = formatter.format(converted);
});

// Attach the coin flip handler unobtrusively and keep running totals.
let heads = 0;
let tails = 0;
byId("flip").addEventListener("click", () => {
    const isHeads = Math.random() < 0.5;
    if (isHeads) heads += 1;
    else tails += 1;
    byId("coin-image").src = isHeads ? "heads.svg" : "tails.svg";
    byId("coin-image").alt = isHeads ? "Coin showing heads" : "Coin showing tails";
    byId("num_heads").textContent = heads;
    byId("num_tails").textContent = tails;
});

// Cake order: add 9% tax, then apply the selected tip to the taxed total.
byId("cake-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const subtotal = Number(byId("half-cakes").value) * 100
        + Number(byId("one-cake").value) * 200
        + Number(byId("two-cakes").value) * 400;
    const tipRate = Number(document.querySelector('input[name="tip"]:checked').value) / 100;
    const total = subtotal * 1.09 * (1 + tipRate);
    byId("price").textContent = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(total);
});
