const timerHoursDisplay = document.querySelector(".timer-hours");
const timerMinutesDisplay = document.querySelector(".timer-minutes");
const timerSecondsDisplay = document.querySelector(".timer-seconds");
const startBtn = document.querySelector(".start-btn");
const foodItems = document.querySelector(".food-items");

const foodItemsObject = {
  gammon: {
    name: "gammon",
    h: 1,
    m: 32,
    s: 12,
  },

  veg: {
    name: "veg",
    h: 0,
    m: 45,
    s: 00,
  },

  potatoes: {
    name: "potatoes",
    h: 1,
    m: 12,
    s: 00,
  },
};

// to display each food item in a row
function displayFoodItems(foodItem) {
  const html = `
  <div class="timer-row">
        
  <div class="food-name">${foodItem.name}</div>
  <div class="food-timer">
    <p class="timer-hours timer-display">${foodItem.h}</p>
    <p class="timer-separator">:</p>
    <p class="timer-minutes timer-display">${foodItem.m}</p>
    <p class="timer-separator">:</p>
    <p class="timer-seconds timer-display">${foodItem.s}</p>
  </div>
  <div class="start-btn"><i class="fas fa-play"></i></div>
</div>
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
    let seconds =
      Number(e.previousElementSibling.firstElementChild.textContent) * 3600 +
      Number(
        e.previousElementSibling.firstElementChild.nextElementSibling
          .nextElementSibling.textContent
      ) *
        60 +
      Number(e.previousElementSibling.lastElementChild.textContent);

    setInterval(function () {
      seconds--;

      const newSeconds = seconds % 60;
      const newHours = Math.trunc(seconds / 3600);
      const newMinutes = Math.trunc(seconds / 60) % 60;
      e.previousElementSibling.lastElementChild.textContent =
        String(newSeconds);
      e.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.textContent =
        String(newMinutes);
      e.previousElementSibling.firstElementChild.textContent = String(newHours);
    }, 1000);
  });
});
