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

const dateLabelEl = document.getElementById("dateLabel");
const dayLabelEl = document.getElementById("dayLabel");
const promptTextEl = document.getElementById("promptText");

const prevBtn = document.getElementById("prevBtn");
const todayBtn = document.getElementById("todayBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = getTodayIndex();

function getTodayIndex() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  const todayStr = `${y}-${m}-${d}`;

  const firstDate = prompts[0].date;
  const lastDate = prompts[prompts.length - 1].date;

  if (todayStr <= firstDate) return 0;
  if (todayStr >= lastDate) return prompts.length - 1;

  const idx = prompts.findIndex((p) => p.date === todayStr);
  return idx === -1 ? 0 : idx;
}

function render() {
  const item = prompts[currentIndex];
  dateLabelEl.textContent = item.label;
  dayLabelEl.textContent = `Day ${currentIndex + 1} of ${prompts.length}`;
  promptTextEl.textContent = item.text;
}

// Button handlers
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    render();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < prompts.length - 1) {
    currentIndex += 1;
    render();
  }
});

todayBtn.addEventListener("click", () => {
  currentIndex = getTodayIndex();
  render();
});

// Initial render
render();
