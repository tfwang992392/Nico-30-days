// 30 days of prompts with fixed dates and labels
const prompts = [
  { date: "2025-12-02", label: "2025/12/2 (Tuesday)", text: "Notice five things you usually ignore during your commute." },
  { date: "2025-12-03", label: "2025/12/3 (Wednesday)", text: "Touch three different textures with your eyes closed." },
  { date: "2025-12-04", label: "2025/12/4 (Thursday)", text: "Take a 1-minute video of the view from your current location." },
  { date: "2025-12-05", label: "2025/12/5 (Friday)", text: "Draw a quick sketch of your left hand." },
  { date: "2025-12-06", label: "2025/12/6 (Saturday)", text: "Count exactly 10 different shades of blue today." },
  { date: "2025-12-07", label: "2025/12/7 (Sunday)", text: "Take a shower in the dark." },
  { date: "2025-12-08", label: "2025/12/8 (Monday)", text: "Say out loud what you are doing, like a narrator." },
  { date: "2025-12-09", label: "2025/12/9 (Tuesday)", text: "Wear two different colored socks." },
  { date: "2025-12-10", label: "2025/12/10 (Wednesday)", text: "Send a photo of your shoes to a friend." },
  { date: "2025-12-11", label: "2025/12/11 (Thursday)", text: "Buy a pint of ice cream." },
  { date: "2025-12-12", label: "2025/12/12 (Friday)", text: "Go to McDonald's and try something you've never ordered before (A&W is allowed if needed)." },
  { date: "2025-12-13", label: "2025/12/13 (Saturday)", text: "Say “thank you” in other languages (not English) for the entire day." },
  { date: "2025-12-14", label: "2025/12/14 (Sunday)", text: "What is a common word you often misspell?" },
  { date: "2025-12-15", label: "2025/12/15 (Monday)", text: "What book changed your perspective on life?" },
  { date: "2025-12-16", label: "2025/12/16 (Tuesday)", text: "What is your go-to comfort meal, and why?" },
  { date: "2025-12-17", label: "2025/12/17 (Wednesday)", text: "What's the worst advice you've ever received?" },
  { date: "2025-12-18", label: "2025/12/18 (Thursday)", text: "What is one memory you wish you could revisit right now?" },
  { date: "2025-12-19", label: "2025/12/19 (Friday)", text: "What food would you trust to keep a secret?" },
  { date: "2025-12-20", label: "2025/12/20 (Saturday)", text: "Try to guess the profession of the next person you see." },
  { date: "2025-12-21", label: "2025/12/21 (Sunday)", text: "Rewrite your name in a style you’ve never used before." },
  { date: "2025-12-22", label: "2025/12/22 (Monday)", text: "Record your voice for 30 seconds and play it back." },
  { date: "2025-12-23", label: "2025/12/23 (Tuesday)", text: "Change one tiny thing about your routine today on purpose." },
  { date: "2025-12-24", label: "2025/12/24 (Wednesday)", text: "Whisper a secret to a plant, real or imaginary." },
  { date: "2025-12-25", label: "2025/12/25 (Thursday)", text: "Rewrite a real memory as if it were fiction." },
  { date: "2025-12-26", label: "2025/12/26 (Friday)", text: "Declare one part of your body “CEO of Today” and let it make a decision." },
  { date: "2025-12-27", label: "2025/12/27 (Saturday)", text: "Promote one inanimate object in your house to a higher social rank." },
  { date: "2025-12-28", label: "2025/12/28 (Sunday)", text: "Introduce yourself to the nearest object as if you’ve just landed on a new planet." },
  { date: "2025-12-29", label: "2025/12/29 (Monday)", text: "Identify the least important decision you made today and analyze it like a scientist." },
  { date: "2025-12-30", label: "2025/12/30 (Tuesday)", text: "If your mood today were a type of pasta, which shape would it be?" },
  { date: "2025-12-31", label: "2025/12/31 (Wednesday)", text: "What’s one thing you wish Terri would ask you more often?" }
];

const totalDays = prompts.length;
const startDateStr = prompts[0].date;
const endDateStr = prompts[totalDays - 1].date;

const dateLabelEl = document.getElementById("dateLabel");
const dayLabelEl = document.getElementById("dayLabel");
const promptTextEl = document.getElementById("promptText");
const currentDayNumberEl = document.getElementById("currentDayNumber");
const completedCountEl = document.getElementById("completedCount");
const totalCountEl = document.getElementById("totalCount");
const progressBarEl = document.getElementById("progressBar");
const progressPercentEl = document.getElementById("progressPercent");
const streakValueEl = document.getElementById("streakValue");
const daysLeftValueEl = document.getElementById("daysLeftValue");
const missedDaysValueEl = document.getElementById("missedDaysValue");
const journeyGridEl = document.getElementById("journeyGrid");

const prevBtn = document.getElementById("prevBtn");
const todayBtn = document.getElementById("todayBtn");
const nextBtn = document.getElementById("nextBtn");

totalCountEl.textContent = totalDays.toString();

let currentIndex = getTodayIndex();

// --- date helpers ---

function parseDate(str) {
  // str: "YYYY-MM-DD"
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function diffDays(a, b) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) -
               Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  return Math.floor(diff / msPerDay);
}

// figure out today's index based on real date
function getTodayIndex() {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const first = startDateStr;
  const last = endDateStr;

  if (todayStr <= first) return 0;
  if (todayStr >= last) return totalDays - 1;

  const idx = prompts.findIndex(p => p.date === todayStr);
  return idx === -1 ? 0 : idx;
}

// compute stats: completed, days left, streak, missed
function computeStats() {
  const today = new Date();
  const start = parseDate(startDateStr);
  const end = parseDate(endDateStr);

  let daysElapsed = 0;
  if (today < start) {
    daysElapsed = 0;
  } else if (today > end) {
    daysElapsed = totalDays;
  } else {
    daysElapsed = diffDays(start, today) + 1;
  }

  const completed = Math.min(daysElapsed, totalDays);
  const daysLeft = Math.max(totalDays - completed, 0);

  // very simple logic: if daysElapsed > completed → we say those are missed
  const missed = Math.max(daysElapsed - completed, 0);

  // streak: if missed days > 0 → 0, else = completed
  const streak = missed > 0 ? 0 : completed;

  return { completed, daysLeft, missed, streak };
}

// render main view
function render() {
  const item = prompts[currentIndex];
  const stats = computeStats();

  // today's card
  dateLabelEl.textContent = item.label;
  promptTextEl.textContent = item.text;
  currentDayNumberEl.textContent = (currentIndex + 1).toString();

  // summary / stats
  completedCountEl.textContent = stats.completed.toString();
  daysLeftValueEl.textContent = stats.daysLeft.toString();
  missedDaysValueEl.textContent = stats.missed.toString();
  streakValueEl.textContent = stats.streak.toString();

  const progress = totalDays === 0 ? 0 : (stats.completed / totalDays) * 100;
  progressBarEl.style.width = `${progress}%`;
  progressPercentEl.textContent = `${Math.round(progress)}%`;

  // journey grid state
  updateGrid();
}

// build journey grid once
function buildGrid() {
  journeyGridEl.innerHTML = "";
  for (let i = 0; i < totalDays; i++) {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "day-cell";
    cell.dataset.index = String(i);

    const inner = document.createElement("div");
    inner.className = "day-cell-inner";

    const num = document.createElement("div");
    num.className = "day-number";
    num.textContent = String(i + 1);

    const label = document.createElement("div");
    label.className = "day-label-mini";
    label.textContent = "Day";

    inner.appendChild(num);
    inner.appendChild(label);
    cell.appendChild(inner);

    cell.addEventListener("click", () => {
      const todayIdx = getTodayIndex();
      if (i <= todayIdx) {
        currentIndex = i;
        render();
      }
    });

    journeyGridEl.appendChild(cell);
  }
}

// update grid styling based on today & currentIndex
function updateGrid() {
  const todayIdx = getTodayIndex();
  const cells = journeyGridEl.querySelectorAll(".day-cell");

  cells.forEach((cell, idx) => {
    cell.classList.remove("day-cell--past", "day-cell--today", "day-cell--locked");

    if (idx === currentIndex) {
      cell.classList.add("day-cell--today");
    } else if (idx <= todayIdx) {
      cell.classList.add("day-cell--past");
    } else {
      cell.classList.add("day-cell--locked");
    }
  });
}

// button handlers
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    render();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalDays - 1) {
    currentIndex += 1;
    render();
  }
});

todayBtn.addEventListener("click", () => {
  currentIndex = getTodayIndex();
  render();
});

// init
buildGrid();
render();
