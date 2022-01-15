const timerHoursDisplay = document.querySelector(".timer-hours");
const timerMinutesDisplay = document.querySelector(".timer-minutes");
const timerSecondsDisplay = document.querySelector(".timer-seconds");
const startBtn = document.querySelector(".start-btn");
const foodItems = document.querySelector(".food-items");

const form = document.querySelector(".form");
let foodItemsObject = {};

// to capture the input from user
// and store it in the foodItemsObject

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputFoodName = document.querySelector("#foodname").value;

  const inputHours = document.querySelector("#hours").value;
  const inputMinutes = document.querySelector("#minutes").value;
  const inputSeconds = document.querySelector("#seconds").value;

  foodItemsObject[inputFoodName] = {
    name: `${inputFoodName}` || "❓❓❓",
    h: inputHours || 0,
    m: inputMinutes || 0,
    s: inputSeconds || 0,
  };

  displayFoodItems(foodItemsObject[inputFoodName]);
  form.reset();
  const startTimerButtons = document.querySelectorAll(".start-btn");
  console.log(startTimerButtons);
  startTimerButtons.forEach(function (e) {
    // console.log(element.parentNode.firstElementChild.textContent);
    e.addEventListener("click", function () {
      timerFunction(e);
    });
  });
});
// end of input capture functionality

// to display each food item in a row
function displayFoodItems(foodItem) {
  const hours = (`0` + `${String(foodItem.h)}`).slice(-2);
  const minutes = (`0` + `${String(foodItem.m)}`).slice(-2);
  const secs = (`0` + `${String(foodItem.s)}`).slice(-2);

  // create the HTML for each item row
  const html = `
  <div class="timer-row">
        
  <div class="food-name">${foodItem.name}</div>
  <div class="food-timer">
    <p class="timer-hours timer-display">${hours}</p>
    <p class="timer-separator">&nbsp;&nbsp;:&nbsp;</p>
    <p class="timer-minutes timer-display">${minutes}</p>
    <p class="timer-separator">&nbsp;&nbsp;:&nbsp;</p>
    <p class="timer-seconds timer-display">${secs}</p>
  </div>
  <div class="start-btn"><i class="fas fa-play"></i></div>
  
</div>
<div class="progress-bar progress-bar-striped bg-info"> <p class="ready-message hidden">Ready!</p> </div>
    `;

  // insert the HTML into the app window
  foodItems.insertAdjacentHTML("beforeend", html);
}
// end of input display functionality

// timer functionality

const readyMessage = document.querySelector(".ready-message");

function timerFunction(e) {
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
  e.parentElement.nextElementSibling.style.transition = `ease-in-out ${seconds}s`;

  setInterval(function () {
    if (seconds === 0) {
      clearInterval();
      e.parentElement.classList.add("food-ready");
      e.parentElement.nextElementSibling.firstElementChild.classList.remove(
        "hidden"
      );
      // setTimeout(function () {
      //   e.parentElement.firstElementChild.style.transform = "rotate(360deg)";
      //   e.parentElement.firstElementChild.style.transition = "all 0.9s";
      // }, 1000);
    } else {
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
    }
  }, 1000);
}
