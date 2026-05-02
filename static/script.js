let chart;
let typingTimer;
let debounceTimer;
let historyData = [];

const textarea = document.getElementById("text");
const charCount = document.getElementById("charCount");
const typingStatus = document.getElementById("typingStatus");
const body = document.getElementById("body");

// ✍️ Typing + Real-time sentiment
textarea.addEventListener("input", () => {
    typingStatus.innerText = "✍️ Typing...";
    charCount.innerText = `${textarea.value.length} / 200`;

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        typingStatus.innerText = "";
    }, 800);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (textarea.value.trim()) {
            analyze(true);
        }
    }, 1000);
});

// 🎚️ Emoji slider
const slider = document.getElementById("moodSlider");
const emoji = document.getElementById("moodEmoji");

slider.addEventListener("input", () => {
    const emojis = ["😡", "😐", "😊"];
    emoji.innerText = emojis[slider.value];
});

// 🚀 Analyze
async function analyze(auto = false) {
    let text = textarea.value;

    if (!text.trim()) {
        if (!auto) alert("Please enter text!");
        return;
    }

    if (!auto) {
        document.getElementById("loader").classList.remove("hidden");
    }

    let res = await fetch("/analyze", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text, auto })
    });

    let data = await res.json();

    if (!auto) {
        document.getElementById("loader").classList.add("hidden");
    }

    let sentimentClass = "neutral";
    let bgClass = "bg-neutral";

    if (data.sentiment.includes("Positive")) {
        sentimentClass = "positive";
        bgClass = "bg-positive";
    }
    if (data.sentiment.includes("Negative")) {
        sentimentClass = "negative";
        bgClass = "bg-negative";
    }

    body.className = bgClass;

    document.getElementById("result").innerHTML = `
        <h2 class="${sentimentClass}">${data.sentiment}</h2>
        <p>Polarity: ${data.polarity}</p>
        <p>Subjectivity: ${data.subjectivity}</p>
    `;

    drawChart(data.vader);

    if (!auto) loadHistory();
}

// 📊 Chart
function drawChart(vader) {
    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("chart"), {
        type: "doughnut",
        data: {
            labels: ["Positive", "Neutral", "Negative"],
            datasets: [{
                data: [vader.pos, vader.neu, vader.neg]
            }]
        }
    });
}

// 📜 Load history
async function loadHistory() {
    let res = await fetch("/history");
    historyData = await res.json();

    renderHistory(historyData);
}

// 🧠 Render history
function renderHistory(data) {
    let html = "";

    data.slice().reverse().forEach(item => {
        html += `<p>${item.text} → ${item.sentiment}</p>`;
    });

    document.getElementById("history").innerHTML = html;
}

// 🔍 Filter history
function filterHistory() {
    let query = document.getElementById("searchInput").value.toLowerCase();

    let filtered = historyData.filter(item =>
        item.text.toLowerCase().includes(query) ||
        item.sentiment.toLowerCase().includes(query)
    );

    renderHistory(filtered);
}

// 🗑️ Clear DB history
async function clearHistory() {
    if (!confirm("Are you sure you want to clear all history?")) return;

    await fetch("/clear_history", { method: "POST" });

    historyData = [];
    document.getElementById("history").innerHTML = "<p>History cleared!</p>";
}

// 🧹 Clear UI
function clearAll() {
    textarea.value = "";
    charCount.innerText = "0 / 200";
    typingStatus.innerText = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("history").innerHTML = "";

    body.className = "";

    if (chart) chart.destroy();
}