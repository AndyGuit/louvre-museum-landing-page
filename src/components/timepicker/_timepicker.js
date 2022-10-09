const options = {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H : i",
  minTime: "9:00",
  maxTime: "18:00",
  defaultDate: 'now',
  time_24hr: true,
  minuteIncrement: 30,
  onValueUpdate(selectedDates, dateString, instance) {
    instance.input.querySelector('input').value = dateString;

    // TODO
    // send dateString to ticket form
  }
};

const timepickerEl = document.querySelector('.timepicker');

export const timepicker = flatpickr(timepickerEl, options);

timepickerEl.addEventListener('click', timepicker.open);