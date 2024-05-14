import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;

startButton.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        console.log(selectedDate);

        startButton.removeAttribute('disabled');
    },
};

flatpickr('#datetime-picker', options);


flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
    console.log('Start button clicked');
    if (!selectedDate) {
        window.alert('Please choose a date first');
        return;
    }

    const now = new Date();

    if (selectedDate <= now) {
        window.alert('Please choose a date in the future');
        startButton.disabled = true;
    } else {
        startButton.disabled = false;
    }

    startTimer(selectedDate);
});

function startTimer(endTime) {
    startButton.disabled = true;
    function updateDisplay() {
        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        daysValue.textContent = String(days).padStart(2, '0');
        hoursValue.textContent = String(hours).padStart(2, '0');
        minutesValue.textContent = String(minutes).padStart(2, '0');
        secondsValue.textContent = String(seconds).padStart(2, '0');
    }

    updateDisplay();
    countdownInterval = setInterval(updateDisplay, 1000);
}
