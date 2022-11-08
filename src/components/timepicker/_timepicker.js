import { ticketForm } from '../../js/classes/ticket-form.js';

const options = {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H : i",
  minTime: "9:00",
  maxTime: "18:00",
  defaultDate: 'now',
  time_24hr: true,
  minuteIncrement: 30,
  disableMobile: true,
  onValueUpdate(selectedDates, dateString, instance) {
    instance.input.querySelector('input').value = dateString;

    instance.element.classList.remove('invalid');

    ticketForm.setTicketTime(selectedDates);
    ticketForm.displayTimeOverview(dateString);
  }
};

const timepickerEl = document.querySelector('.timepicker');

export const timepicker = flatpickr(timepickerEl, options);

timepickerEl.addEventListener('click', timepicker.open);