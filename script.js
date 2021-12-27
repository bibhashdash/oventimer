const timerHoursDisplay = document.querySelector(".timer-hours");
const timerMinutesDisplay = document.querySelector(".timer-minutes");
const timerSecondsDisplay = document.querySelector(".timer-seconds");
const startBtn = document.querySelector(".start-btn");
const foodItems = document.querySelector(".food-items");

const foodItemsObject = {
  gammon: {
    name: "gammon",
    h: 0,
    m: 1,
    s: 12,
  },

  veg: {
    name: "veg",
    h: 0,
    m: 02,
    s: 00,
  },

  potatoes: {
    name: "potatoes",
    h: 12,
    m: 0,
    s: 30,
  },
};

// to display each food item in a row
function displayFoodItems(foodItem) {
  const hours = (`0` + `${String(foodItem.h)}`).slice(-2);
  const minutes = (`0` + `${String(foodItem.m)}`).slice(-2);
  const secs = (`0` + `${String(foodItem.s)}`).slice(-2);
  const html = `
  <div class="timer-row">
        
  <div class="food-name">${foodItem.name}</div>
  <div class="food-timer">
    <p class="timer-hours timer-display">${hours}&nbsp;&nbsp;</p>
    <p class="timer-separator">:&nbsp;</p>
    <p class="timer-minutes timer-display">${minutes}&nbsp;&nbsp;</p>
    <p class="timer-separator">:&nbsp;</p>
    <p class="timer-seconds timer-display">${secs}</p>
  </div>
  <div class="start-btn"><i class="fas fa-play"></i></div>
  
</div>
<div class="progress-bar"></div>
    `;

  foodItems.insertAdjacentHTML("beforeend", html);
  foodItem.startTimerBtn = document.querySelector(".start-btn");
}

displayFoodItems(foodItemsObject.gammon);
displayFoodItems(foodItemsObject.veg);
displayFoodItems(foodItemsObject.potatoes);

const startTimerButtons = document.querySelectorAll(".start-btn");

startTimerButtons.forEach(function (e) {
  e.addEventListener("click", function () {
    e.classList.add("hidden");
    let seconds =
      Number(e.previousElementSibling.firstElementChild.textContent) * 3600 +
      Number(
        e.previousElementSibling.firstElementChild.nextElementSibling
          .nextElementSibling.textContent
      ) *
        60 +
      Number(e.previousElementSibling.lastElementChild.textContent);
    e.parentElement.nextElementSibling.style.width = "100%";
    e.parentElement.nextElementSibling.style.transition = `all ${seconds}s`;
    setInterval(function () {
      seconds--;

      const newSeconds = seconds % 60;
      const newHours = Math.trunc(seconds / 3600);
      const newMinutes = Math.trunc(seconds / 60) % 60;
      e.previousElementSibling.lastElementChild.textContent = (
        0 + `${String(newSeconds)}`
      ).slice(-2);
      e.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.textContent =
        (0 + `${String(newMinutes)}`).slice(-2);
      e.previousElementSibling.firstElementChild.textContent = (
        0 + `${String(newHours)}`
      ).slice(-2);
    }, 1000);
  });
});
