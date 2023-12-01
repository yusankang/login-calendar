// Open / close modals
const openModalBtn = document.querySelectorAll("[data-modal-target");

openModalBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    if (!modal.classList.contains("active")) {
      openModal(modal, button);
    } else {
      closeModal(modal, button);
    }
  });
});

function openModal(modal, button) {
  const openedModal = document.querySelector(".customModal.active");
  const activeButton = document.querySelector(".btn.active");
  closeModal(openedModal, activeButton);
  if (modal === null) return;
  modal.classList.add("active");
  if (button === null) return;
  button.classList.add("active");
}

function closeModal(modal, button) {
  if (modal === null) return;
  modal.classList.remove("active");
  if (button === null) return;
  button.classList.remove("active");
}

// Calendar
// default dates
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let weekday = date.getDay();

let toggleMonth = month;
let toggleYear = year;

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const daysElement = document.querySelector(".days");
const monthElement = document.querySelector(".selected-month");
monthElement.textContent = `${toggleYear}年${toggleMonth + 1}月`;

//show selected date
function showDate(day, month, year) {
  const selectedDate = document.querySelector("#calendarBtn");
  selectedDate.textContent = `${year}年${month + 1}月${day}日`;
}

function updateSelectedDate(e) {
  day = +e.target.textContent;
  month = toggleMonth;
  year = toggleYear;
  showDate(day, month, year);
}

// create calendar days
function createDates() {
  showDate(day, month, year);
  daysElement.innerHTML = "";
  const firstDayOfMonth = new Date(toggleYear, toggleMonth, 1);
  const daysInMonth = new Date(toggleYear, toggleMonth + 1, 0).getDate();
  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const emptyDays = weekdays.indexOf(dateString.split(", ")[0]);

  for (i = 1; i <= emptyDays + daysInMonth; i++) {
    const calendarDay = document.createElement("div");
    if (i > emptyDays) {
      calendarDay.textContent = i - emptyDays;
      calendarDay.classList.add("day");
      calendarDay.addEventListener("click", updateSelectedDate);
    } else {
      calendarDay.classList.add("empty");
    }
    daysElement.appendChild(calendarDay);
  }
}
createDates();

// toggle month
const nextMonthBtn = document.querySelector(".next-month");
const prevMonthBtn = document.querySelector(".prev-month");

function checkDisableToggle() {
  if (toggleMonth === date.getMonth() && toggleYear === date.getFullYear()) {
    prevMonthBtn.disabled = true;
  } else {
    prevMonthBtn.disabled = false;
  }
}
checkDisableToggle();

nextMonthBtn.addEventListener("click", () => {
  toggleMonth++;
  if (toggleMonth > 11) {
    toggleMonth = 0;
    toggleYear++;
  }
  monthElement.textContent = `${toggleYear}年${toggleMonth + 1}月`;
  createDates();
  checkDisableToggle();
});

prevMonthBtn.addEventListener("click", () => {
  toggleMonth--;
  if (toggleMonth < 0) {
    toggleMonth = 11;
    toggleYear--;
  }
  monthElement.textContent = `${toggleYear}年${toggleMonth + 1}月`;
  createDates();
  checkDisableToggle();
});

// form validation
(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
